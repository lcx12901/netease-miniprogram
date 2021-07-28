// pages/me/me.js
import {reqUserDetail} from '../../network/api.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
      uid: 0,
      userDetail: []
    },
    toLogin () {
      wx.navigateTo({
        url: '/pages/login/login',
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
    async getUserDetail () {
      const userDetail = await reqUserDetail(this.data.uid)
      this.setData({
        userDetail
      })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      this.setData({
        uid: wx.getStorageSync('profile').userId
      })
      if (this.data.uid && !Object.keys(this.data.userDetail).length) this.getUserDetail()
      
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