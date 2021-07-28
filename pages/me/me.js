// pages/me/me.js
import {reqUserDetail, reqUserPlayList} from '../../network/api.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
      uid: 0,
      userDetail: [],
      likeList: [],
      playlist: [],
      initLeft: 0,
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
      this.animation = wx.createAnimation()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
      this.queryTab('#create')
    },
    // 获取用户的详细信息
    async getUserDetail () {
      const userDetail = await reqUserDetail(this.data.uid)
      this.setData({
        userDetail
      })
    },
    // 获取用户的所有歌单信息
    async getUserPlayList (uid) {
      const {playlist} = await reqUserPlayList(uid)
      
      this.setData({
        likeList: playlist.splice(0,1),
        playlist: playlist
        
      })
    },
    // 获取dom元素的left
    queryTab (id) {
      const query = wx.createSelectorQuery()
      query.select(id).boundingClientRect()
      query.exec( (res) => {
        this.setData({
          initLeft: res[0].left
        })
      })
    },
    // 点击tab item触发事件
    tabScroll (e) {
      const query = wx.createSelectorQuery()
      query.select('#active').boundingClientRect()
      query.select(`#${e.currentTarget.dataset.name}`).boundingClientRect()
      let space
      query.exec( (res) => {
        if (e.currentTarget.dataset.name == 'create') {
          space = - (res[1].left - this.data.initLeft)
        } else {
          space = res[1].left - this.data.initLeft
        }
        this.animation.translate(space, 0).step()
        this.setData({
          animation: this.animation.export()
        })
      })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      this.setData({
        uid: wx.getStorageSync('profile').userId
      })
      const {uid, userDetail, playlist} = this.data
      if (uid) {
        if (!Object.keys(userDetail).length) this.getUserDetail()
        if (!Object.keys(playlist).length) this.getUserPlayList(uid)
      }
      
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