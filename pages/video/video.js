// pages/video/video.js
const app = getApp()
import {reqVideoGroupList, reqVideoGroup, reqVideoUrl} from '../../network/api.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        offset: 0,
        groupId: 0,
        videoGroupList: [],
        videoList: [],
        videoId: 0,
        urls: []

    },
    // 获取视频分类列表
    async getVideoGroupList () {
        const {data} = await reqVideoGroupList()
        const index = Math.floor(Math.random()* (data.length -10))
        const videoGroupList = data.slice(index, index+10)
        this.setData({
            groupId: videoGroupList[0].id,
            videoGroupList,
        })
        this.getVideoGroup(videoGroupList[0].id)
    },
    // 获取对应分类的视频
    async getVideoGroup (id) {
        const {datas, code} = await reqVideoGroup(id, this.data.offset)
        this.data.videoList.push(...datas)
        if (code == 200) {
            this.setData({
                videoList: this.data.videoList,
                offset: this.data.offset + 1
            })
            if (!this.data.videoId) {
                const videoId = this.data.videoList[0].data.vid
                this.getVideoUrl(videoId)
            }
        }
    },
    // 获取视频url
    async getVideoUrl (vid) {
        const {urls, code} = await reqVideoUrl(vid)
        this.setData({
            urls
        })
        if (code == 200) this.setData({
            videoId: vid
        })
    },
    // 切换视频播放
    changVideo (e) {
        const {vid} = e.currentTarget.dataset
        this.getVideoUrl(vid)
    },
    // 滚动到底部添加更多视频
    moreVideo () {
        this.getVideoGroup(this.data.groupId, this.data.offset)
    },
    
    // 导航栏点击事件
    itemClick (e) {
        const {id} = e.currentTarget.dataset
        this.setData({
            groupId: id,
            videoId: 0,
            videoList: [],
            offset: 0
        })
        this.getVideoGroup(id)
        
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (option) {
        this.getVideoGroupList()

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
        app.globalData.BackgroundAudioManager.pause()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        app.globalData.BackgroundAudioManager.play()
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