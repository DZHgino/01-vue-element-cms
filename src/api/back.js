import axios from 'axios'
const qs = require('qs')

export function login(userInfo) {
    let url = 'http://localhost:8888/api/private/v1/login';
    console.log(userInfo, 'userInfo'); // {} --- 如何将对象转换为 key = value 键值对 不需要  qs
    let userInfoString = qs.stringify( userInfo );
    console.log(userInfoString);

    return axios.post(url, userInfoString, {
        // post提交常见的编码方式存在三种：
        // 1. application/x-www-form-urlencoded 底层是以 key=value&key1=value1 传递
        // 2. application/json 底层以 '{"username":"admin","password":"123456"}'
        // 3. application/form-data 底层以二进制方式传递，一般是用于做文件上传的时候需要使用这种编码

        // 到底使用哪种编码，不取决于前端，而是在于后端程序猿需要使用哪种编码。
        // 我们的登录接口使用的 application/x-www-form-urlencoded 传输数据的时候，需要使用 key=value的方式进行产地。

        headers: {
            "Content-Type":"application/x-www-form-urlencoded"
        }
    });
}
