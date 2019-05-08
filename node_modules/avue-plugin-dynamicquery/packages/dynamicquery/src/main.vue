<template>
  <div>
    <el-input
      v-model="labelShow"
      :readonly="readonly"
      :autosize="{ minRows: minRows, maxRows: maxRows}"
      :disabled="disabled"
      :clearable="disabled?false:clearable"
      :placeholder="placeholder?placeholder:'请选择'"
      @change="handleChange"
      @click.native="disabled?'':open()">
      <el-button slot="append" icon="el-icon-search" />
    </el-input>
    <el-dialog :visible.sync="box" title="请选择" append-to-body width="50%" >
      <el-input v-model="filterText" style="margin-bottom:15px;" placeholder="输入关键字进行过滤" size="small"/>
      <div class="avue-dialog">
        <el-row :gutter="1">
          <el-col :span="16">
            <el-table
              ref="queryTable"
              :data="list"
              :highlight-current-row="true"
              :stripe="false"
              :border="true"
              height="250"
              size="mini"
              empty-text="暂无数据"
              @current-change="currentRowChange"
              @row-click="rowClick"
              @selection-change="selectionChange"
              @sort-change="sortChange">
              <!-- 暂无数据提醒 -->
              <template slot="empty">
                <slot v-if="$slots.empty" name="empty" />
                <span v-else style="cursor:pointer">暂无数据</span>
              </template>
              <el-table-column v-if="multiple" type="selection" width="50" fixed="left" align="center" />
              <!-- 循环列 -->
              <el-table-column
                v-for="(column,index) in columnOption"
                v-if="!column.hide"
                :prop="column.prop"
                :key="index"
                :min-width="60"
                :fixed="column.fixed"
                :sortable="true"
                :label="column.label"
                :width="column.width"
                align="center"
                header-align="center" >
                <template slot-scope="scope">
                  <template>
                    <span v-html="formatter(scope.row,column)"/>
                  </template>
              </template></el-table-column>
            </el-table>
            <div v-if="tableOption.page && listLen">
              <el-pagination
                :current-page.sync="pageOption.currentPage"
                :page-size="15"
                :background="true"
                :total="pageOption.total"
                small
                layout="total, prev, pager, next"
                @current-change="currentChange" />
            </div>
          </el-col>
          <el-col :span="8">
            <el-card shadow="never" size="mini" class="selectdata" >
              <div slot="header" class="clearfix">
                <span>已选择项</span>
              </div>
              <div v-for="item in tableSelect" :key="item.value" class="selectitem" @click="itemClick">
                {{ item.label }}
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="close">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { deepClone } from '../util.js'
import dayjs from 'dayjs'
export default {
  name: 'AvueDynamicquery',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    readonly: {
      type: Boolean,
      default: false
    },
    minRows: {
      type: Number,
      default: 3
    },
    maxRows: {
      type: Number,
      default: 4
    },
    value: {
      type: [String, Array, Number],
      default: ''
    },
    dic: {
      type: Array,
      required: true,
      default: () => {
        return []
      }
    },
    name: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请选择...'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      required: true,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      defaultParam: ['$index'],
      list: [],
      columnIndex: [],
      columnList: [],
      tableOption: {},
      tableIndex: -1,
      tableSelect: [],
      columnOption: [],
      filterText: '',
      box: false,
      labelText: this.multiple ? [] : '',
      props: {},
      pageOption: {}
    }
  },
  computed: {
    labelShow() {
      return this.multiple ? this.labelText.join(',').toString() : this.labelText
    },
    listLen() {
      return this.list.length !== 0
    }
  },
  watch: {
    value() {
      // this.init()
    },
    filterText(val) {
      // this.searchChange(val)
      if (typeof this.searchChange === 'function') this.searchChange(val)
    },
    dic() {
      this.dataInit()
    }
  },
  created() {
    this.text = this.value
    this.tableOption = deepClone(this.options)
    // 初始化数据
    this.dataInit()
    this.columnOption = this.tableOption.column || []
    this.props = this.tableOption.props || { label: 'label', value: 'value' }
    this.pageOption = { total: this.list.length, currentPage: 1 }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (this.multiple) {
        this.labelText = ['获取中...']
      } else {
        this.labelText = '获取中...'
      }
      const check = setInterval(() => {
        if (this.list.length > 0) {
          this.tableSelect = []
          if (this.multiple) {
            this.labelText = []
            if (this.text) {
              this.text.forEach(ele => {
                this.findLabel(this.list, ele, this.props)
              })
            }
          } else {
            this.labelText = ''
            this.findLabel(this.list, this.text, this.props)
          }
          clearInterval(check)
        } else {
          this.labelText = ''
        }
      }, 100)
    },
    findLabel(data, value, props) {
      const labelKey = props.label
      const valueKey = props.value
      data.forEach(ele => {
        const label = ele[labelKey]
        if (ele[valueKey].toString() === value.toString()) {
          this.multiple ? this.labelText.push(label) : this.labelText = label
          this.tableSelect.push({ label: label, value: value })
        }
      })
    },
    dataInit() {
      this.list = [].concat(this.dic)
      // 初始化序号
      this.list.forEach((ele, index) => {
        ele.$index = index
      })
    },
    // 格式化行
    formatter(row, column) {
      let result = row[column.prop || column.value]
      const type = column.type
      if (result === 'null' || result == null || result === 'undefined' || result === undefined || result === '') result = ''
      if (type) {
        // 日期处理
        if (['date', 'time', 'datetime'].includes(type) && column.format) {
          const format = column.format
            .replace('dd', 'DD')
            .replace('yyyy', 'YYYY')
          result = dayjs(result).format(format)
        }
        // 密码处理
        if (['password'].includes(type)) {
          return this.getPasswordChar(result.toString().length, '*')
        }
      }
      return result
    },
    // 页码回调
    currentChange(val) {
      this.$emit('current-change', val)
    },
    // 清除选择
    selectClear() {
      this.$refs.queryTable.clearSelection()
    },
    // 选择回调
    selectionChange(rows) {
      this.tableSelect = []
      rows.forEach((r, i) => {
        this.tableSelect.push({ label: r[this.props.label], value: r[this.props.value] })
      })
      this.handleChange()
    },
    // 排序回调
    sortChange(val) {
      this.$emit('sort-change', val)
    },
    // 搜索回调
    searchChange(val) {
      // this.$emit('search-change', val)
      if (typeof this.tableOption.searchChange === 'function') {
        this.dic = this.tableOption.searchChange(val)
      }
    },
    // 行单击
    rowClick(row, event, column) {
      if (!this.multiple) {
        this.tableSelect = []
        const label = row[this.props.label]
        const value = row[this.props.value]
        this.tableSelect.push({ label: label, value: value })
        this.close()
      }
    },
    // 设置单选
    currentRowChange(currentRow, oldCurrentRow) {
      this.$emit('current-row-change', currentRow, oldCurrentRow)
    },
    // 打开查询框
    open() {
      this.box = true
      const _this = this
      const valueKey = _this.props.value
      const check = setInterval(() => {
        this.tableSelect.forEach(ele => {
          const row = this.list.find(item => item[valueKey] === ele.value)
          if (_this.multiple) {
            this.$refs.queryTable.toggleRowSelection(row, true)
          } else {
            this.$refs.queryTable.setCurrentRow(row, true)
          }
        })
        clearInterval(check)
      }, 100)
    },
    handleChange() {
      if (this.multiple) {
        this.labelText = []
        this.text = []
        this.tableSelect.forEach(ele => {
          this.labelText.push(ele.label)
          this.text.push(ele.value)
        })
      } else {
        if (this.tableSelect.length > 0) {
          this.labelText = this.tableSelect[0].label
          this.text = this.tableSelect[0].value
        } else {
          this.labelText = ''
          this.text = ''
        }
      }
      if (typeof this.change === 'function') {
        this.change({ value: this.text })
      }
      this.$emit('input', this.labelText)
      this.$emit('change', this.text)
    },
    close() {
      const callback = () => {
        this.box = false
      }
      this.handleChange()
      callback()
    },
    itemClick(event) {
      // 移除数组
      const label = event.target.outerText
      const currItem = this.tableSelect.find(item => item.label === label)
      this.tableSelect.splice(currItem)
      // 移除表格选中
      const row = this.list.find(item => item[this.props.value] === currItem.value)
      this.multiple ? this.$refs.queryTable.toggleRowSelection(row, false) : this.$refs.queryTable.setCurrentRow()
      this.handleChange()
    }
  }
}
</script>
<style>
.avue-dialog {
    max-height: 500px;
    overflow: hidden;
    overflow-y: auto;
}
.selectdata{
  height: 249px;
}
.selectdata .el-card__body {
    min-height: 180px;
    max-height: 180px;
    padding:10px;
    overflow-y:auto
}
.selectdata .el-card__header{
  padding:14px
}
.selectdata .selectitem{
    font-size: 14px;
    margin-bottom: 3px;
    background-color: #ecf5ff;
    padding:2px;
    border:1px solid #ebeef5;
    height: 20px;
}
.selectdata .selectitem:hover{
    font-size: 14px;
    margin-bottom: 3px;
    background-color: #8FC4FB;
    padding:2px;
    border:1px solid #ebeef5;
    cursor: pointer;
}
 .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

</style>
