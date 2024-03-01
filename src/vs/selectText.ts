import * as vscode from 'vscode';
import path from 'node:path';

const CreateExamView = (
  context: vscode.ExtensionContext,
  getWebviewContent: (srcUrl: string, nonce?: string) => string,
) => {
  let panel: vscode.WebviewPanel | undefined;
  let selectText = vscode.commands.registerCommand(
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
        panel.onDidDispose(() => {
          panel = undefined;
        });
        const isProduction =
          context.extensionMode === vscode.ExtensionMode.Production;
        let srcUrl = '';
        if (isProduction) {
          const filePath = vscode.Uri.file(
            path.join(context.extensionPath, 'dist', 'static/js/main.js'),
          );
          srcUrl = panel.webview.asWebviewUri(filePath).toString();
        } else {
          srcUrl = 'http://localhost:3000/static/js/main.js';
        }
        panel.webview.html = getWebviewContent(srcUrl);
        panel!.webview.postMessage({ text });
        // 接收来自webview的消息
        panel.webview.onDidReceiveMessage(
          (message) => {
            switch (message.command) {
              case 'reload':
                const nonce = new Date().getTime() + '';
                panel!.webview.html = getWebviewContent(srcUrl, nonce);
                panel!.webview.postMessage({ text });
                vscode.window.showInformationMessage(message.text);
                return;
              case 'already':
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
