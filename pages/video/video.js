// pages/video/video.js
import {reqVideoGroupList, reqVideoGroup} from '../../network/api.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    async getVideoGroupList () {
        const {data:videoGroupList} = await reqVideoGroupList()
        this.setData({
            groupId: videoGroupList[0].id,
            videoGroupList: videoGroupList.slice(0, 10)
        })
        this.getVideoGroup(videoGroupList[0].id)
    },
    async getVideoGroup (id) {
        const {datas:videoList} = await reqVideoGroup(id)
        this.setData({
            videoList,
            videoId: videoList[0].data.vid
        })
    },
    
    // 导航栏点击事件
    itemClick (e) {
        const {id} = e.currentTarget.dataset
        this.setData({
            groupId: id
        })
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