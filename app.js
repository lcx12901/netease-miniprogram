// app.js
import {reqSongUrl} from '/network/api'

App({
  onLaunch() {
    // 检查是否登录
    if (!wx.getStorageSync('profile')) {
      wx.showToast({
        title: '请先进行登录',
        duration: 1500,
        image: 'assets/imgs/login.png',
        success () {
          wx.navigateTo({
            url: '/pages/login/login'
          })
        }
      })
    }
    // 全局创建背景音频管理器
    this.globalData.BackgroundAudioManager = wx.getBackgroundAudioManager()
    // 自动连播
    this.globalData.BackgroundAudioManager.onEnded(()=> {
      const len = this.globalData.playList.length
      if (len) {
        let index = this.globalData.playList.findIndex(item => item.id === this.globalData.songId)
        if (len - 1 < index ) return
        this.playAudio(index+1)
      }
    })
  },
  async playAudio (index) {
    const {id, name, al, ar} = this.globalData.playList[index]
    const {data, code} = await reqSongUrl(id)
    if (code == 200) {
      this.globalData.songId = id
      this.globalData.BackgroundAudioManager.title= name
      this.globalData.BackgroundAudioManager.epname = al.name
      this.globalData.BackgroundAudioManager.singer = ar[0].name
      this.globalData.BackgroundAudioManager.coverImgUrl  = al.picUrl
      this.globalData.BackgroundAudioManager.src = data[0].url
      this.globalData.audioPlaying = true
    }
  },
  
  globalData: {
    methodList: [], //监听者列表
    playList: [],
    audioPlaying: false
  },
  //app 全局属性监听
  watch: function (method) {
    var obj = this.globalData;
    obj.methodList.push(method); //加入到监听者列表中

    Object.defineProperty(this, "globalData", {  //这里的 data 对应 上面 globalData 中的 data
      configurable: true,
      enumerable: true,
      set: function (value) {  //动态赋值，传递对象，为 globalData 中对应变量赋值
        obj.orderNum = value.orderNum;
        obj.methodList.forEach(element => {
          element(value); // 遍历监听者列表，回调
        });
      },
      get: function () {  //获取全局变量值，直接返回全部
        return obj;
      }
    })
  }
})
