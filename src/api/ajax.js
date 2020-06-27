import axios from "axios"
import store from '../store'

//创建axios新实例，修改两个属性
const instance = axios.create({
    baseURL : 'http://180.76.238.89:8080/sweet',
    // baseURL : '/sweet',
    timeout : 15000
})

//注册请求拦截器
instance.interceptors.request.use(config => {
    return config
})

//注册响应拦截器
instance.interceptors.response.use(
    response =>{
        return response.data
    },
    error =>{
        return  Promise.reject(error)
    }
)

export default instance