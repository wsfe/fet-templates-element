module.exports = {
  presets: [
    '@vue/app',
    '@babel/preset-env'
  ],
  // plugins: [['import', { 'libraryName': 'iview', 'libraryDirectory': 'src/components' }, 'iview'], ['import', { 'libraryName': 'lodash', 'libraryDirectory': '', 'camel2DashComponentName': false }, 'lodash']]
  // plugins: ['lodash', ['import', { 'libraryName': 'iview', 'libraryDirectory': 'src/components' }, 'iview']]
  // plugins: ['lodash', ['import', { 'libraryName': 'ant-design-vue', 'libraryDirectory': 'es', 'style': 'css' }]] // 打包起来icon还是很大，可以先参照https://github.com/HeskeyBaozi/reduce-antd-icons-bundle-demo这个解决方案来减小包体积， 参考:https://github.com/ant-design/ant-design/issues/12011#issuecomment-420038579
}
