import {request} from './request.js'

//登录请求
export const reqLogin = (phone,password) => request({url:'/login/cellphone',data:{phone,password}})

// 获取首页banner图
export const reqBanner = () => request({url: '/banner', data: {type: 2}})

// 首页-发现-圆形图标入口列表
export const reqHomePageBall = () => request({url: '/homepage/dragon/ball'})

// 获取每日推荐歌曲
export const reqRecommendSongs = () => request({url: '/recommend/songs'})