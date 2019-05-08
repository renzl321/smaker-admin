import Ueditor from './src/main.vue';

Ueditor.install = function(Vue) {
    Vue.component(Ueditor.name, Ueditor);
};

export default Ueditor;