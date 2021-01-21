// 对 axios 进一步的封装
// 基准url地址，还有请求的头信息
import axios from 'axios'
import qs from 'qs'

const instance = axios.create({
    baseURL: 'http://localhost:8888/api/private/v1',
    // headers: {},
});

// 做请求的拦截 可以在请求发送之前对头进行配置
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log(config, 'config');

    config.headers.Authorization = localStorage.getItem('html7CmsToken') ? localStorage.getItem('html7CmsToken')  : '';

    if(config.method == 'post' ){
        // 1. 数据编码 key=value&key1=value1....
        config.data = qs.stringify( config.data );
        // 2. 设置请求头  "Content-Type":"application/x-www-form-urlencoded"
        config.headers['Content-Type'] = "application/x-www-form-urlencoded";
    }

    return config;

}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});



export default instance;