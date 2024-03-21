// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { getWebviewContent } from './vs/html';
import CreateExamView from './vs/selectText';
import { myCommand } from './vs/services';

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
      const options = await myCommand(); // 获取选项的网络请求
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
