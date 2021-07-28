// pages/recommend/recommend.js
import {reqRecommendSongs} from '../../network/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fixed: false,
    today: {
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    }
  },
  async getRecommendSongs () {
    const {data} = await reqRecommendSongs ()
    const {dailySongs, recommendReasons} = data
    this.setData({
      dailySongs,
      recommendReasons
    })
  },
  // 页面主要内容容器滚动监听
  fixed (e) {
    const {scrollTop} = e.detail
    let isFixed
    scrollTop >= 140 ? isFixed = true : isFixed = false
    if (this.data.fixed === isFixed) return
    this.setData({
      fixed: isFixed
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRecommendSongs()
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