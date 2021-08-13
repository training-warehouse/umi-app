import {fetch} from "dva";
import {notification} from "antd";
import {router} from "umi";

const codeMessage = {
  200: '服务器成功返回请求数据',
  201: '新建或者修改数据成功',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功',
  400: '发出的请求有误，服务器没有进行新建或者修改数据的操作',
  401: '用户没有权限',
  403: '用户得到授权，但是访问是禁止的',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
  406: '请求的格式不可得',
  410: '请求的资源被永久删除，且不会载得到',
  422: '当创建一个对象时，发生一个验证错误',
  500: '服务器发生错误，请检查服务器',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时',
}


export default async function request(url,options) {
  return await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(checkStatus)
    .catch(checkErrorStatus)
}

function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res.json()
  }

  // 提醒错误
  const errortext = codeMessage[res.status] || res.statusText
  notification.error({
    message: `请求错误 ${res.status} ${res.url}`,
    description: errortext
  })

  // 抛出异常
  const error = new Error(errortext)
  error.name = res.status.toString()
  error.response = res
  throw error
}

function checkErrorStatus(err) {
  if (err && err.response) {
    const {status} = err.response
    if (status === 403) {
      router.push("/exception/403")
    }

    if (status <= 504 && status >= 500) {
      router.push('/exception/500')
    }

    if (status >= 404 && status <= 422) {
      router.push('/exception/404')
    }
  }
}
