import {request} from './request.js'

//登录请求
export const reqLogin = (phone,password) => request({url:'/login/cellphone',data:{phone,password}})

// 获取用户详细信息
export const reqUserDetail = (uid) => request({url: '/user/detail',data: {uid}})

// 获取用户的歌单信息
export const reqUserPlayList = (uid) => request({url: '/user/playlist', data: {uid}})

// 获取首页banner图
export const reqBanner = () => request({url: '/banner', data: {type: 2}})

// 首页-发现-圆形图标入口列表
export const reqHomePageBall = () => request({url: '/homepage/dragon/ball'})

// 获取每日推荐歌曲
export const reqRecommendSongs = () => request({url: '/recommend/songs'})

// 获取每日推荐歌单
export const reqRecommendResource = () => request({url: '/recommend/resource'})

// 获取歌单详情
export const reqPlayListDetail = (id) => request({url: '/playlist/detail', data: {id}})

// 获取视频标签列表
export const reqVideoGroupList = () => request({url: '/video/group/list'})

// 获取视频标签/分类下的视频
export const reqVideoGroup = (id, offset) => request({url: '/video/group', data: {id, offset}})

// 获取视频url地址
export const reqVideoUrl = (id) => request({url: '/video/url', data: {id}})

// 获取音乐url
export const reqSongUrl = (id) =>request({url: '/song/url', data: {id}})

// 获取歌曲歌词
export const reqLyric = (id) => request({url: '/lyric', data: {id}})