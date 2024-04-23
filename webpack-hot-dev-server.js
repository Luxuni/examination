if (!window.__vscode__) {
  window.__vscode__ = acquireVsCodeApi();
  window.__reload__ = function () {
    console.log('post message to vscode to reload!');
    window.__vscode__.postMessage({
      command: 'reload',
      text: 'from web view',
    });
  };
}