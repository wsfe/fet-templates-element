const path = require('path')
const packageJson = require('./package.json')
const buildConfig = require('./config')
const argv = require('minimist')(process.argv.slice(2))

const getDomain = function () {
  const server = argv.server || process.env.npm_config_server
  const servers = packageJson.servers ? packageJson.servers : require('./fet.config').servers
  const domain = server ? servers[server]['domain'] : ''
  return domain
}

function resolve (dir) {
  return path.join(__dirname, dir)
}

function getPublicPath () {
  if (process.env.NODE_ENV === 'joint' || process.env.NODE_ENV === 'production') {
    return `${getDomain()}/${packageJson.name}/prd/`
  } else if (process.env.NODE_ENV === 'test') {
    return `/${packageJson.name}/prd/`
  } else {
    return `//localhost:${argv.port || 8080}/${packageJson.name}/prd/`
  }
}

function getEnv (env) {
  if (['development', 'joint', 'production', 'test'].indexOf(env) > -1) {
    return env
  }
  return 'development'
}

module.exports = {
  publicPath: '/',
  outputDir: process.env.NODE_ENV === 'joint' ? resolve('dev') : resolve('prd'),
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  configureWebpack (config) {
    buildConfig[getEnv(process.env.NODE_ENV)].configureWebpack(config)
  },
  chainWebpack (config) {
    config.externals({
      lodash : '_',
      vue: 'Vue',
      'element-ui': "ELEMENT"
    })

    /* 设置 resolve.alias */
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('api', resolve('src/api'))
      .set('assets', resolve('src/assets'))
      .set('mixins', resolve('src/mixins'))
    buildConfig[getEnv(process.env.NODE_ENV)].chainWebpack(config)
  }
}
