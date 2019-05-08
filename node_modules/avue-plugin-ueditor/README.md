# avue-plugin-ueditor

## avue 富文本编辑器

## npm
[avue-plugin-ueditor](https://www.npmjs.com/package/avue-plugin-ueditor)

## git
[avue-plugin-ueditor](https://gitee.com/smallweigit/avue-plugin-ueditor)

## demo
<p align="center">
  <img width="600" src="https://gitee.com/smallweigit/avue-plugin-ueditor/raw/master/packages/demo/demo.png">
</p>

## use
```
1.安装
npm install avue-plugin-ueditor --save

2.导入
import AvueUeditor from 'avue-plugin-ueditor'
Vue.use(AvueUeditor);

3.使用
...
column:[
  ...
    {
      label:'test',
      prop:'test',
      component: "AvueUeditor"
    }
  ...
]
或者直接
<avue-ueditor v-model="text" ></avue-ueditor>
...
```

