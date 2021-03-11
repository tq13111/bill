const path = require('path')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/muji-bill/'
    : '/',
  lintOnSave: false,
  'chainWebpack': config => {
    const dir = path.resolve(__dirname, 'src/assets/icons')
    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)
      .include.add(dir).end() // 包含 icons 目录
      .use('svg-sprite-loader').loader('svg-sprite-loader').options({extract: false}).end()
      .use('svgo-loader').loader('svgo-loader')
      .tap(options => ({...options, plugins: []})).end()  //{removeAttrs: {attrs: 'fill'}} 去除颜色
    config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{plainSprite: true}])
    config.module.rule('svg').exclude.add(dir) // 其他 svg loader 排除 icons 目录
    config          //配置 title
      .plugin('html')
      .tap(args => {
        args[0].title = 'Muji 记账'
        return args
      })
  },
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  }
}
