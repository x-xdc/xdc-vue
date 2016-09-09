var cssLoader = require('./css-loader')
var toString = Object.prototype.toString
var isFunction = function (val) {
  return toString.call(val) === '[object Function]'
}

/**
 * @param  {object} xdc - provide add, remove, config, _userConfig method
 * @param  {object} [options]
 */
module.exports = function (xdc) {
  var SOURCE_MAP = xdc.config.devtool

  xdc.config.vue = xdc.config.vue || {}

  // add loader
  xdc.add('loader.vue', {
    test: /\.vue$/,
    loaders: ['vue-loader']
  })

  // add extension
  xdc.config.resolve.extensions.push('.vue')

  var plugins = xdc.config.postcss

  if (Array.isArray(plugins)) {
    xdc.config.vue.postcss = function (webpack) {
      return plugins.map(plugin => isFunction(plugin) ? plugin(webpack) : plugin)
    }
  } else if (plugins) {
    xdc.config.vue.postcss = plugins
  }

  // add vue config
  xdc.config.vue.loaders = cssLoader({
    sourceMap: SOURCE_MAP ? '#source-map' : false,
    extract: !!xdc.config.extractCSS
  })
}
