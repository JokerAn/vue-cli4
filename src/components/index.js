import Vue from 'vue'
/**
 * 首字母大写
 * */

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 对符合‘xx/xx.vue’组件格式的组件取组件名
 */

function validateFileName(str) {
  return /^\S+\.vue$/.test(str) && str.replace(/^\S+\/(\w+)\.vue$/, (rs, $1) => capitalizeFirstLetter($1))
}

const requireComponent = require.context('./', true, /\.vue$/)
// 找到组件文件下.vue 命名的文件，如果文件问index，那么取组件中的name作为注册组件的名

requireComponent.keys().forEach(filePath => {
  const componentConfig = requireComponent(filePath)
  const fileName = validateFileName(filePath)
  const componentName = fileName.toLowerCase() === 'index' ?
    capitalizeFirstLetter(componentConfig.default.name) :
    fileName

  Vue.component(componentName, componentConfig.default || componentConfig)
})