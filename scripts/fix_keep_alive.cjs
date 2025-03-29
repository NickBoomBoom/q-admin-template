var fs = require('fs')
var path = require('path')

var vue_bundler_file = path.resolve(
  __dirname,
  '../node_modules/.pnpm/@vue+runtime-core@3.5.13/node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js'
)

fs.readFile(vue_bundler_file, 'utf8', function (err, data) {
  if (err) console.error(err)
  let orginal_str = `    if (!!(process.env.NODE_ENV !== "production") || __VUE_PROD_DEVTOOLS__) {
      instance.__v_cache = cache;
    }`
  let target_str = `   // if (!!(process.env.NODE_ENV !== "production") || __VUE_PROD_DEVTOOLS__) {
      instance.__v_cache = cache;
    //}`
  var result = data.replace(orginal_str, target_str)
  fs.writeFile(vue_bundler_file, result, 'utf8', function (err) {
    if (err) return console.error(err)
  })
})
