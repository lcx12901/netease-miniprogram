// pages/found/found.js
import {reqBanner, reqHomePageBall} from '../../network/api'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tapRoute: [
            {
                name: '每日推荐',
                path: '/pages/recommend/recommend'
            }
        ]
    },
    // 获取首页banner图
    async getBanner () {
        const {banners} = await reqBanner()
        this.setData({
            banners
        })
    },
    // 首页-发现-圆形图标入口列表
    async getBall () {
        const {data} = await reqHomePageBall()
        this.setData({
            homePageBall: data
        })
    },
    // 图标入口路由跳转
    navigateTo(e) {
        const {name} = e.currentTarget.dataset
        const {path} = this.data.tapRoute.filter(item => item.name === name)[0]
        if (path) wx.navigateTo({
          url: path,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getBanner()
        this.getBall()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})