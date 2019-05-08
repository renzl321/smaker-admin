import Vue from 'vue'
import dynamicquery from './dynamicquery/index.js'
const components = [
  dynamicquery
]

function install(Vue) {
  components.map(component => {
    Vue.component(component.name, component)
  })
}

install(Vue)

export default install
