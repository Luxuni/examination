// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import CreateExamView from './vs/selectText';

function getWebviewContent(
  srcUri: string | vscode.Uri,
  vendorsUri: string | vscode.Uri,
  nonce: string = '',
) {
  return `<!doctype html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>webview-react</title>
    <script defer="defer" src="${vendorsUri}"></script>
    <script nonce="${nonce}" defer="defer" src="${srcUri}"></script>
    <script>
      window.addEventListener('DOMContentLoaded', () => {
        console.log(window.__vscode__);
        window.__vscode__.postMessage({ 
          command: 'already',
          text: 'working...' 
        });
      })
    </script>
  </head>
  <body>
    <div id="root"></div>
  </body>
  </html>`;
}

async function fetchOptions() {
  const res = await fetch(
    'https://ideaplugin.lonsun.cn/codereview/codeReview/getUserList',
  );
  const data: { userId: number; name: string }[] = await res.json();
  return data ?? [];
}
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "examination" is now active!');
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    'examination.myCommand',
    async () => {
      const options = await fetchOptions(); // 获取选项的网络请求
      const quickPick = vscode.window.createQuickPick();
      quickPick.items = options.map((option) => ({
        label: option.name,
        userId: option.userId,
      }));
      quickPick.onDidChangeSelection((selection) => {
        if (selection[0]) {
          vscode.workspace
            .getConfiguration('examination')
            .update('message', selection[0], vscode.ConfigurationTarget.Global);
          quickPick.hide(); // 关闭快速选择列表
        }
      });
      quickPick.show();
    },
  );

  const { selectText } = CreateExamView(context, getWebviewContent);

  context.subscriptions.push(disposable, selectText);
}

// This method is called when your extension is deactivated
export function deactivate() {}
