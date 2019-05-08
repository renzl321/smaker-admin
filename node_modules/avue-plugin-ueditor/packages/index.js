import Ueditor from './ueditor/index.js';
import Vue from 'vue';
const components = [
    Ueditor
];

function install(Vue) {
    components.map(component => {
        Vue.component(component.name, component);
    });
}

if (window.Vue) {
    install(window.Vue);
} else {
    install(Vue);
}

export default install;