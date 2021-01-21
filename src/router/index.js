import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login/index.vue'
import Home from '../views/Home/index.vue'

import User from '../views/User/index.vue'
import UserAdd from '../views/User/add.vue'

Vue.use(VueRouter)


const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },

    {
        path: '/home',
        name: 'Home',
        component: Home,
        // 后台的除了 home 页面，其他的页面都是home子页面，出现了嵌套路由，所有的子页面都是在 home/index.vue 里面的 router-view 里面展示
        children: [
            {
                path: '/users',
                name: 'Users',
                component: User
            },
            {
                path: '/useradd',
                name: 'Useradd',
                component: UserAdd
            },
        ]
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    routes
})

// 现在希望使用的路由守卫完成路由信息的检测，防止用户做翻墙操作。在用户没有合法授权的情况下，是不能查看未授权的页面。例如用户没有登录的情况下，是不可以查看后台页面
// 在每一次的路由请求的时候，该方法都会执行；这个方法接受一个回调函数
// to 将要前往的地方 /home
// from 代表来的地方 （/list--->/add）
// next 函数，代表是否允许放行。
router.beforeEach((to, from, next) => {

    if( to.path != '/login' && !localStorage.getItem('html7CmsToken')){
        // 翻译：如果前往的不是登录页面，同时用户的登录标识不存在，则必须要登录
        next('/login'); // next 可以支持参数，代表要去的url地址。默认去 to.path 对应的位置
        return;

    }else if( to.path == '/login' && localStorage.getItem('html7CmsToken')){
        // 翻译：用户在已经登录的情况下，还要前往登录页面，则这个是没有意义，跳转回它来的页面
        next(from.path); // /home--->/login
        return;
    }

    console.log(to, 'to');
    console.log(from, 'from');

    // next 没有执行，则代表不放行，就是 url地址对应的组件不会渲染。
    next();

})
export default router
