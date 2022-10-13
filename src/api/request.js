// 二次封装axios
/* 
    请求拦截器：可以在发请求之前处理一些业务
    响应拦截器：当服务器数据返回以后，可以处理一些事情
*/

import axios from 'axios'

const requests = axios.create({
    baseURL: "/paijuserver",  // 配置基础路径
    timeout: 5000,              // 请求超时时间
})

// 请求拦截器
requests.interceptors.request.use((config)=>{
    // config是一个配置对象，对象里有一个属性很重要，header请求头
    return config
})

// 响应拦截器
requests.interceptors.response.use((res)=>{
    return res.data
},(err)=>{
    return Promise.reject(new Error('faile'))
})

export default requests