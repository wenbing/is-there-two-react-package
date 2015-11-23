var tape = require('tape')
var browserify = require('browserify')
var isThereTwoReactPackage = require('../')

tape('isThereTwoReactPackage is working', function(t) {
  var b = browserify()
  b.plugin(isThereTwoReactPackage)
  b.require(require.resolve('../node_modules/react'))
  b.require(require.resolve('./a'))
  var out = b.bundle()
  out.on('end', function() {
    t.end()
  })
  out.resume()
})

