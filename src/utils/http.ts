import Axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type CustomParamsSerializer,
  type AxiosError,
  type AxiosResponse
} from 'axios'
import { stringify } from 'qs'
import NProgress from 'nprogress'
import { ElMessage } from 'element-plus'

const BASE_URL = import.meta.env.VITE_ROOT_API

// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
const defaultConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  // 数组格式参数序列化（https://github.com/axios/axios/issues/5142）
  paramsSerializer: {
    serialize: stringify as unknown as CustomParamsSerializer
  }
}

class Http {
  constructor() {
    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }

  /** 保存当前`Axios`实例对象 */
  private static axiosInstance: AxiosInstance = Axios.create(defaultConfig)

  /** 请求拦截 */
  private httpInterceptorsRequest(): void {
    Http.axiosInstance.interceptors.request.use(
      async (config: AxiosRequestConfig): Promise<any> => {
        // 开启进度条动画
        NProgress.start()

        /** 请求白名单，放置一些不需要`token`的接口（通过设置请求白名单，防止`token`过期后再请求造成的死循环问题） */
        const whiteList = ['/auth/users/detail']

        return whiteList.some((url) => config?.url?.startsWith(url))
          ? config
          : new Promise((resolve) => {
              // TODO: 暂未接入
              config.headers = config.headers || {}
              config.headers['token'] = 'test'
              resolve(config)
            })
      },
      (error: AxiosError) => {
        this.handleMsg(error)
        return Promise.reject(error)
      }
    )
  }

  /** 响应拦截 */
  private httpInterceptorsResponse(): void {
    const instance = Http.axiosInstance
    instance.interceptors.response.use(
      (response: AxiosResponse) => {
        NProgress.done()
        const $config = response.config
        const { data } = response
        let result: any = null
        if (typeof data.err === 'number') {
          if (data.err > 0) {
            if ([401].includes(data.err)) {
              alert('重新登录')
              return
            }
            const errMsg = `${data.err}: ${data.errMsg}`
            this.handleMsg(errMsg)
            return Promise.reject(errMsg)
          } else {
            result = data.data
          }
        } else {
          result = data
        }

        return result
      },
      (error: AxiosError) => {
        const $error = error
        NProgress.done()
        this.handleMsg($error)
        return Promise.reject($error)
      }
    )
  }

  public handleMsg(error: any) {
    ElMessage({
      message: error,
      type: 'error'
    })
  }

  public clearNullParam(obj: any) {
    const res: any = {}

    Object.keys(obj).forEach((key) => {
      const item = obj[key]
      if (typeof item === 'string' && (item === null || item === undefined || item === '')) {
      } else {
        res[key] = item
      }
    })
    return res
  }
  /** 通用请求工具函数 */
  public request<T>(
    method: 'post' | 'get' | 'patch' | 'delete' | 'put',
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: AxiosRequestConfig
  ): Promise<T> {
    if (['get', 'delete'].includes(method) && param?.params) {
      param.params = this.clearNullParam(param.params)
    }
    const config = {
      method,
      url,
      ...param,
      ...axiosConfig
    } as AxiosRequestConfig

    // 单独处理自定义请求/响应回调
    return new Promise((resolve, reject) => {
      Http.axiosInstance
        .request(config)
        .then((response: any) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /** 单独抽离的`post`工具函数 */
  public post<T, P>(
    url: string,
    params?: AxiosRequestConfig<P>,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>('post', url, params, config)
  }
  public patch<T, P>(
    url: string,
    params?: AxiosRequestConfig<P>,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>('patch', url, params, config)
  }
  public delete<T, P>(
    url: string,
    params?: AxiosRequestConfig<P>,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>('delete', url, params, config)
  }

  /** 单独抽离的`get`工具函数 */
  public get<T, P>(
    url: string,
    params?: AxiosRequestConfig<P>,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>('get', url, params, config)
  }
}

export const http = new Http()
