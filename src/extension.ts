// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import path from 'node:path';

function getWebviewContent(srcUri: string, nonce: string = '') {
  return `<!doctype html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>webview-react</title>
    <script nonce="${nonce}" defer="defer" src="${srcUri}"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
  </html>`;
}
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "examination" is now active!');
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
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
        panel.webview.postMessage({ text });
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
            }
          },
          undefined,
          context.subscriptions,
        );
      }
    },
  );

  context.subscriptions.push(selectText);
}

// This method is called when your extension is deactivated
export function deactivate() {}
