import {request} from './request.js'

//登录请求
export const reqLogin = (phone,password) => request({url:'/login/cellphone',data:{phone,password}})

// 获取首页banner图
export const reqBanner = () => request({url: '/banner', data: {type: 2}})