import VueRouter from "vue-router";

import Login from "../pages/Login"
import Home from "../pages/Home"
import Xsskc from "../pages/Xsskc"
import Xssyx from "../pages/Xssyx"

const router = new VueRouter({
    routes: [
        {
            path: '/',
            beforeEnter: (to, from, next) => {
                next({
                    name: "login"
                })
            }
        },
        {
            name: 'login',
            path: '/login',
            component: Login,
            meta: {
                routername: "login"
            },
            beforeEnter: (to, from, next) => { // login的前置路由守卫
                var token = localStorage.getItem("token")
                if (token == null) {          // 若是本地没有token 放行
                    next()
                } else {
                    token = token.replace("_", "/").replace("-", "+") // 解密jwt
                    var json = window.atob(token.split(".")[1]);
                    var timestamp = Date.parse(new Date()) / 1000; // 获取当前精确到秒的时间戳
                    if (timestamp <= JSON.parse(json).exp) {       // 判断jwt是否失效
                        next({                                  // 没有失效则直接跳转home
                            name: "home"
                        })
                    } else {
                        localStorage.removeItem("token")
                        next()
                    }
                }
            }
        },
        {
            name: 'home',
            path: '/home',
            component: Home,
            children: [
                {
                    name: "xsskc",
                    path: "xsskc",
                    component: Xsskc
                },
                {
                    name: "xssyx",
                    path: "xssyx",
                    component: Xssyx,
                    props($route) {
                        return {
                            tableid: $route.query.tableid
                        }
                    }
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.routername != "login") {   // 如果不是login界面，则进入
        var token = localStorage.getItem("token")
        if (token == null) {
            next({
                name: "login"
            })
        } else {
            token = token.replace("_", "/").replace("-", "+")
            var json = window.atob(token.split(".")[1]);
            var timestamp = Date.parse(new Date()) / 1000;
            if (timestamp > JSON.parse(json).exp) { // token过期      
                alert("登录已过期，请重新登录！")
                localStorage.removeItem("token")
                next({
                    name: "login"
                })
            } else {
                next()
            }
        }
    }
    next()
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default router
