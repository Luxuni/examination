import * as vscode from 'vscode';
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

export { getWebviewContent };
