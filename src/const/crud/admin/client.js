

const DIC = {
  vaild: [{
    label: '否',
    value: 'false'
  }, {
    label: '是',
    value: 'true'
  }]
}
export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  editBtn: false,
  delBtn: false,
  viewBtn: true,
  column: [{
    width: 150,
    label: '编号',
    prop: 'clientId',
    align: 'center',
    sortable: true,
    rules: [{
      required: true,
      message: '请输入clientId',
      trigger: 'blur'
    }]
  }, {
    label: '密钥',
    prop: 'clientSecret',
    align: 'center',
    sortable: true,
    overHidden: true,
    width: 120,
    rules: [{
      required: true,
      message: '请输入clientSecret',
      trigger: 'blur'
    }]
  }, {
    label: '域',
    prop: 'scope',
    align: 'center',
    rules: [{
      required: true,
      message: '请输入scope',
      trigger: 'blur'
    }]
  }, {
    label: '授权模式',
    prop: 'authorizedGrantTypes',
    align: 'center',
    overHidden: true,
    rules: [{
      required: true,
      message: '请输入授权模式',
      trigger: 'blur'
    }]
  }, {
    label: '回调地址',
    prop: 'webServerRedirectUri',
    align: 'center',
    hide: true
  }, {
    label: '权限',
    prop: 'authorities',
    align: 'center',
    hide: true
  }, {
    label: '自动放行',
    prop: 'autoapprove',
    align: 'center',
    type: 'radio',
    dicData: DIC.vaild,
    rules: [{
      required: true,
      message: '请选择是否放行',
      trigger: 'blur'
    }]
  }, {
    label: '令牌时效',
    prop: 'accessTokenValidity',
    align: 'center',
  }, {
    label: '刷新时效',
    prop: 'refreshTokenValidity',
    align: 'center',
  }, {
    label: '扩展信息',
    prop: 'additionalInformation',
    align: 'center',
    hide: true
  }, {
    label: '资源ID',
    prop: 'resourceIds',
    align: 'center',
    hide: true
  }]
}
