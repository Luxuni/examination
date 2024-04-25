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
  let editor: vscode.TextEditor;
  let panel: vscode.WebviewPanel | undefined;
  const selectText = vscode.commands.registerCommand(
    'examination.selectText',
    () => {
      editor = vscode.window.activeTextEditor as vscode.TextEditor;
      if (editor) {
        const selection = editor.selection;
        const text = editor.document.getText(selection);
        if (!panel) {
          panel = vscode.window.createWebviewPanel(
            'examinationView',
            '代码标注',
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
        if (panel.webview.html === '') {
          panel!.webview.html = getWebviewContent(srcUrl, vendorsUri);
        }

        // 获取选中的选区和文件路径
        const { start, end } = editor.selection;
        let { fileName } = editor.document;
        if (vscode.workspace.workspaceFolders) {
          fileName = fileName.replace(
            vscode.workspace.workspaceFolders[0].uri.fsPath,
            '',
          );
        }
        //const range = `${fileName};,${start.line}-${start.character};,${end.line}-${end.character}`;
        const range = {
          moduleName: path.dirname(fileName)?.split('\\')?.reverse()[0],
          fileName: path.basename(fileName),
          filePath: fileName,
          startLine: start.line,
          startCharacter: start.character,
          endLine: end.line,
          endCharacter: end.character,
        };

        panel!.webview.postMessage({ text: text, range: range });
        panel.webview.onDidReceiveMessage(
          async (message) => {
            switch (message.command) {
              case 'reload': {
                const nonce = new Date().getTime() + '';
                panel!.webview.html = getWebviewContent(
                  srcUrl,
                  vendorsUri,
                  nonce,
                );
                panel!.webview.postMessage({ userMessage });
                panel!.webview.postMessage({ text, range });
                vscode.window.showInformationMessage(message.text);
                return;
              }
              case 'already':
                panel!.webview.postMessage({ userMessage });
                panel!.webview.postMessage({ text, range });
                vscode.window.showInformationMessage(message.text);
                return;
              case 'position': {
                const strArray = message.text.split(';,');
                let filePath = strArray[0];
                if (vscode.workspace.workspaceFolders) {
                  filePath =
                    vscode.workspace.workspaceFolders[0].uri.fsPath + filePath;
                }
                const doc = await vscode.workspace.openTextDocument(
                  vscode.Uri.parse('file:' + filePath),
                );
                await vscode.window.showTextDocument(doc, { preview: false });
                const startChar = strArray[1].split('-');
                const endChar = strArray[2].split('-');
                const start = new vscode.Position(
                  Number(startChar[0]),
                  Number(startChar[1]),
                );
                const end = new vscode.Position(
                  Number(endChar[0]),
                  Number(endChar[1]),
                );
                if (vscode.window.activeTextEditor) {
                  editor = vscode.window.activeTextEditor;
                  editor.revealRange(new vscode.Range(start, end));
                }
                const hightlightCodes = (
                  startPos?: vscode.Position,
                  endPos?: vscode.Position,
                ) => {
                  const codeDecorationType =
                    vscode.window.createTextEditorDecorationType({
                      backgroundColor: { id: 'examination.codeBackground' },
                    });
                  let startPosCopy = startPos;
                  let endPosCopy = endPos;
                  if (!startPosCopy || !endPosCopy) {
                    const selection = editor.selection;
                    startPosCopy = selection.start;
                    endPosCopy = selection.end;
                  }
                  const decoration = {
                    range: new vscode.Range(startPosCopy, endPosCopy),
                    hoverMessage: '此处添加了标注',
                  };
                  editor?.setDecorations(codeDecorationType, [decoration]);
                };
                hightlightCodes(start, end);
                vscode.commands.getCommands().then(async (res) => {
                  if (res.includes('gitlens.openWorkingFile')) {
                    vscode.commands.executeCommand(
                      'gitlens.openWorkingFile',
                      vscode.Uri.parse('file:' + filePath),
                    );
                  } else {
                    vscode.window.showInformationMessage(
                      '请先安装gitlens插件!',
                    );
                  }
                });
                return;
              }
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
