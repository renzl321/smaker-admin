<template>
  <quill-editor :style="{height:`${minRows*40+100}px`,maxHeight:`${maxRows*40+100}px`}"
                v-model="text"
                class="avue-crud-ueditor"
                @change="handleChange"
                @click.native="handleClick"
                ref="myQuillEditor"
                :options="options">
  </quill-editor>
</template>
<script>
import quillEditor from 'vue-quill-editor/src/editor';
export default {
  name: 'AvueUeditor',
  components: {
    quillEditor
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    },
    height: {
      default: ''
    },
    minRows: {
      type: Number,
      default: 5
    },
    maxRows: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      text: undefined,
      options: {
        placeholder: '请输入内容',
        readonly: false,
      }
    }
  },
  watch: {
    value () {
      this.text = this.value;
    }
  },
  created () {
    this.init();
  },
  methods: {
    init () {
      this.text = this.value;
      this.options.placeholder = this.placeholder ? this.placeholder : '请输入内容';
      this.options.readonly = this.readonly
    },
    handleClick () {
      if (typeof this.click === 'function') this.click({ value: this.text, column: this.column });
    },
    handleChange (value) {
      if (typeof this.change === 'function') this.change({ value: value.html, column: this.column });
      this.$emit('input', value.html);
      this.$emit('change', value.html);
    }

  }
}
</script>
<style lang="scss">
@import '../../theme-chack/src/index.scss';
</style>
