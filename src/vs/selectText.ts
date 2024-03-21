import path from 'node:path';
import * as vscode from 'vscode';

const CreateExamView = (
  context: vscode.ExtensionContext,
  getWebviewContent: (
    srcUrl: string | vscode.Uri,
    vendorsUri: string | vscode.Uri,
    nonce?: string,
  ) => string,
) => {
  let panel: vscode.WebviewPanel | undefined;
  const selectText = vscode.commands.registerCommand(
    'examination.selectText',
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const selection = editor.selection;
        const text = editor.document.getText(selection);
        if (!panel) {
          panel = vscode.window.createWebviewPanel(
            'examinationView',
            'Examination View',
            vscode.ViewColumn.Two,
            {
              retainContextWhenHidden: true,
              enableScripts: true,
            },
          );
        }
        // 监听panel的关闭事件
        panel.onDidDispose(
          () => {
            panel = undefined;
            vscode.window.showInformationMessage('关闭');
          },
          null,
          context.subscriptions,
        );
        const isProduction =
          context.extensionMode === vscode.ExtensionMode.Production;
        let srcUrl: string | vscode.Uri = '';
        let vendorsUri: string | vscode.Uri = '';
        if (isProduction) {
          const filePath = vscode.Uri.file(
            path.join(context.extensionPath, 'dist', 'static/js/main.js'),
          );
          srcUrl = panel.webview.asWebviewUri(filePath).toString();
          const vendorsPath = vscode.Uri.file(
            path.join(context.extensionPath, 'dist', 'static/js/vendors.js'),
          );
          vendorsUri = panel.webview.asWebviewUri(vendorsPath).toString();
        } else {
          srcUrl = 'http://localhost:4000/static/js/main.js';
          vendorsUri = 'http://localhost:4000/static/js/vendors.js';
        }
        const config = vscode.workspace.getConfiguration('examination');
        const userMessage = config.get('message');
        panel.webview.html = getWebviewContent(srcUrl, vendorsUri);
        panel.webview.onDidReceiveMessage(
          (message) => {
            switch (message.command) {
              case 'reload':
                const nonce = new Date().getTime() + '';
                panel!.webview.html = getWebviewContent(
                  srcUrl,
                  vendorsUri,
                  nonce,
                );
                panel!.webview.postMessage({ text });
                vscode.window.showInformationMessage(message.text);
                return;
              case 'already':
                panel!.webview.postMessage({ userMessage });
                panel!.webview.postMessage({ text });
                vscode.window.showInformationMessage(message.text);
                return;
            }
          },
          undefined,
          context.subscriptions,
        );
      }
    },
  );
  return { selectText, panel };
};

export default CreateExamView;
