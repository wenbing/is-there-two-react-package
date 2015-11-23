var path = require('path');

function isThereTwoReactPackage(b, opts) {

  function addHooks() {
    var reacts = [];
    b.pipeline.on('file', function(file, id) {
      if (file.indexOf('node_modules/react/react.js') !== -1) {
        reacts.push(file)
      }
      if (reacts.length > 1) {
        b.pipeline.emit('error', new Error('发现两个 react package: \n' + reacts.map(function(item, index) {
          return index + ': ' + path.dirname(item);
        }).join('\n')))
      }
    });
  }

  b.on('reset', addHooks)
  addHooks();

  return b;
}

module.exports = isThereTwoReactPackage;
