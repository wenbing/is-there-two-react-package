function isThereTwoReactPackage(b, opts) {

  function addHooks() {
    var reacts = [];
    b.pipeline.on('package', function(pkg) {
      if (pkg.name === 'react') {
        reacts.push(pkg)
      }
      if (reacts.length > 1) {
        b.pipeline.emit('error', new Error('发现两个 react package: \n' + reacts.map(function(item, index) {
          return index + ': ' + item.__dirname;
        }).join('\n')))
      }
    });
  }

  b.on('reset', addHooks)
  addHooks();

  return b;
}

module.exports = isThereTwoReactPackage;
