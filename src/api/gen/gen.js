

import request from '@/router/axios'

export function fetchList (query) {
  return request({
    url: '/gen/generator/page',
    method: 'get',
    params: query
  })
}

export function handleDown (table) {
  return request({
    url: '/gen/generator/code',
    method: 'post',
    data: table,
    responseType: 'arraybuffer'
  }).then((response) => { // 处理返回的文件流
    let blob = new Blob([response.data], { type: 'application/zip' })
    let filename = table.tableName + '.zip'
    let link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = filename
    document.body.appendChild(link)
    link.click()
    window.setTimeout(function () {
      URL.revokeObjectURL(blob)
      document.body.removeChild(link)
    }, 0)
  })
}
