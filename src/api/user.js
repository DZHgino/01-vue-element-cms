import request from './request'

export function userList(page = 1, size = 2, kw = '') {
    let url = `/users?pagenum=${page}&pagesize=${size}`;

    if (kw) {
        // url 地址 query=andy
        url += '&query=' + kw;
    }

    return request({
        url,
        method: 'get',
        // api/request.js
        // 除了登录接口是不需要做token的传递，做认证，其他的接口全部要传递token。 建议统一配置管理
        /*headers: {
            'Authorization': 'token',
        }*/
    });

}

// 使用 ts userInfo 格式是固定的对于调用方来说，应该要严格传递  username password email mobile

// 使用的 ts 约束 userInfo 的类型，必须 username password email mobile
// 如何约束对象的类型 interface
/*
interface UserInfo {
    username: string;
    password: string;
    email: string;
    mobile: string;
}
*/

export function userAdd(userInfo) {
    let url = `/users`;
    return request({
        url,
        method: 'post', // 对于 所有 post 请求，都要进行数据的编码和设置请求头
        data: userInfo,
    });

}

export function userDel(id) {
    let url = `/users/${id}`;
    return request({
        url,
        method: 'delete' // 注意删除的请求方式 RESTFul api 资源路由
    });
}