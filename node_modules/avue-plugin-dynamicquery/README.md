
# avue-plugin-dynamicquery

## avue 表格查询框

## npm
[avue-plugin-dynamicquery](https://www.npmjs.com/package/avue-plugin-dynamicquery)

## git
[avue-plugin-dynamicquery](https://gitee.com/yuchuanli/avue-plugin-dynamicquery)

## demo
<p align="center">
  <img width="600" src="https://gitee.com/yuchuanli/avue-plugin-dynamicquery/raw/master/packages/demo/demo.png">
</p>

## use
```
1.安装
npm install avue-plugin-dynamicquery --save

2.导入
import 'avue-plugin-dynamicquery'

3.使用
...
column:[
  ...
    {
      label: 'test',
      prop: 'test',
      component: 'AvueDynamicquery',
    }
  ...
]
或者直接
 <avue-dynamicquery 
      :placeholder="placeholder"
      :multiple="true"
      :dic="data"
      :options="option"
      :value="value"/>
...
```



