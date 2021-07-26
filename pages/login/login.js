// pages/login/login.js
import {reqLogin} from '../../network/api.js'

Page({
    /**
     * 页面的初始数据
     */
    data: {
        phone: '',
        password: ''
    },

    async formSubmit (e) {
        const {phone, password} = e.detail.value
        if (!phone || !password) return wx.showToast({
          title: '不能留空',
          duration: 1000,
          icon: 'error'
        })
        const {code, profile, cookie, msg} = await reqLogin(phone, password)
        if (code != 200) return wx.showToast({
          title: msg,
          icon: 'error',
          duration: 1000
        })
        wx.showToast({
          title: '登录成功',
        })
        wx.setStorageSync('profile', profile)
        wx.setStorageSync('cookie', cookie)
        wx.navigateBack({
          delta: 1,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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