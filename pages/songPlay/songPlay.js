// pages/songPlay/songPlay.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        audioPlaying: false
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.calcNavTitle()
        app.watch(this.watchBack)
    },
    // 监听app.js
    watchBack (value) {
        const {currentPosition, duration} = value
        const minute = (`0${Math.floor(duration / 60)}`).slice(-2)
        const second = (`0${Math.floor(duration % 60)}`).slice(-2)
        const currentMinute = (`0${Math.floor( (currentPosition + 1) / 60)}`).slice(-2)
        const currentSecond = (`0${Math.floor( (currentPosition + 1) % 60)}`).slice(-2)
        this.setData({
            audioPlaying: value.audioPlaying,
            song: value.playList.filter(item => item.id == value.songId),
            progress: ((currentPosition / duration) * 100).toFixed(0),
            currentPosition: `${currentMinute}:${currentSecond}`,
            duration: `${minute}:${second}`
        })
    },
    // 计算标题栏的高度
    calcNavTitle () {
        const that = this
        wx.getSystemInfo({
            success (res) {
                let menuButton = wx.getMenuButtonBoundingClientRect()
                let titleBarHeight = (menuButton.top - res.statusBarHeight) * 2 + menuButton.height // 标题栏高
                that.setData({
                    safeTop: res.safeArea.top,
                    titleBarHeight,
                    titleHeight: menuButton.height
                })
            }
        })
    },
    // 获取到globalData的播放列表
    getSongDetail () {
        const song = app.globalData.playList.filter(item => item.id == app.globalData.songId)
        this.setData({
            song,
            audioPlaying: app.globalData.audioPlaying
        })
    },
    // 返回上一页面
    back () {
        wx.navigateBack({
          delta: 1,
        })
    },
    // 歌曲播放控制按钮
    playControll () {
        if (this.data.audioPlaying) {
            app.globalData.BackgroundAudioManager.pause()
        } else {
            app.globalData.BackgroundAudioManager.play()
        }
    },
    // 切换上一首
    prevAudio () {
        app.changeAudio('prev')
    },
    // 切换下一首
    nextAudio () {
        app.changeAudio('next')
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.getSongDetail()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getSongDetail()
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