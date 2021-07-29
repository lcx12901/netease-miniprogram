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
      createList: [],
      starList: [],
      initLeft: 0,
      block: false,
      activeName: 'create',
      scrollIntoView: 'user',
      isFixed: false,
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
      this.animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease-in-out',
      })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
      this.queryTab()
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
      const {playlist, code} = await reqUserPlayList(uid)
      if (code != 200) return
      const likeList = playlist.splice(0,1)
      const createList = playlist.filter( item => item.creator.userId == uid)
      const starList = playlist.filter(item => item.creator.userId != uid)
      this.setData({
        likeList,
        createList,
        starList
      })
    },
    // 获取tab的位置
    queryTab () {
      const query = wx.createSelectorQuery()
      query.select('#tab-scroll').boundingClientRect()
      query.select('#create').boundingClientRect()
      query.exec( (res) => {
        this.setData({
          fixedTop: res[0].top,
          initLeft: res[1].left,
          block: true
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
          animation: this.animation.export(),
          activeName: e.currentTarget.dataset.name,
          scrollIntoView: e.currentTarget.dataset.name + 'List'
        })
      })
    },
    // 页面scroll-view滚动监听
    meScroll (e) {
      const {scrollTop} = e.detail
      let isFixed
      scrollTop >= this.data.fixedTop ? isFixed = true : isFixed = false
      if (isFixed != this.data.isFixed) this.setData({isFixed})
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      this.setData({
        uid: wx.getStorageSync('profile').userId
      })
      const {uid, userDetail, createList, starList} = this.data
      console.log(!createList.length || !starList.length)
      if (uid) {
        if (!Object.keys(userDetail).length) this.getUserDetail()
        if (!createList.length || !starList.length) this.getUserPlayList(uid)
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