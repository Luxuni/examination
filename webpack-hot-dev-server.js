/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/* globals __webpack_hash__ */

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

// if (true) {
//   /** @type {undefined|string} */
//   var lastHash;
//   var upToDate = function upToDate() {
//     return /** @type {string} */ (lastHash).indexOf(__webpack_hash__) >= 0;
//   };
//   var log = require('webpack/hot/log');
//   var check = function check() {
//     module.hot
//       .check(true)
//       .then(function (updatedModules) {
//         if (!updatedModules) {
//           log(
//             'warning',
//             '[HMR] Cannot find update. ' +
//               (typeof window !== 'undefined'
//                 ? 'Need to do a full reload!'
//                 : 'Please reload manually!'),
//           );
//           log(
//             'warning',
//             '[HMR] (Probably because of restarting the webpack-dev-server)',
//           );
//           if (typeof window !== 'undefined') {
//             window.__reload__();
//           }
//           return;
//         }

//         if (!upToDate()) {
//           check();
//         }

//         require('webpack/hot/log-apply-result')(updatedModules, updatedModules);

//         if (upToDate()) {
//           log('info', '[HMR] App is up to date.');
//         }
//       })
//       .catch(function (err) {
//         var status = module.hot.status();
//         if (['abort', 'fail'].indexOf(status) >= 0) {
//           log(
//             'warning',
//             '[HMR] Cannot apply update. ' +
//               (typeof window !== 'undefined'
//                 ? 'Need to do a full reload!'
//                 : 'Please reload manually!'),
//           );
//           log('warning', '[HMR] ' + log.formatError(err));
//           if (typeof window !== 'undefined') {
//             window.__reload__();
//           }
//         } else {
//           log('warning', '[HMR] Update failed: ' + log.formatError(err));
//         }
//       });
//   };
//   var hotEmitter = require('webpack/hot/emitter');
//   hotEmitter.on('webpackHotUpdate', function (currentHash) {
//     lastHash = currentHash;
//     if (!upToDate() && module.hot.status() === 'idle') {
//       log('info', '[HMR] Checking for updates on the server...');
//       check();
//     }
//   });
//   log('info', '[HMR] Waiting for update signal from WDS...');
// } else {
//   throw new Error('[HMR] Hot Module Replacement is disabled.');
// }