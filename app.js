// app.js
import {reqSongUrl, reqLyric} from '/network/api'
App({
  onLaunch() {
    // 监听本页面修改globalData，使其他页面实时获得
    this.watch()

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
    };
    // 全局创建背景音频管理器
    this._globalData.BackgroundAudioManager = wx.getBackgroundAudioManager()
    // 监听背景音乐暂停
    this.globalData.BackgroundAudioManager.onPause( () => {
      this.globalData = {
        audioPlaying: false
      }
    })
    // 监听背景音乐开始
    this.globalData.BackgroundAudioManager.onPlay( () => {
      this.globalData = {
        audioPlaying: true
      }
    })
    setInterval( () => {
      wx.getBackgroundAudioPlayerState({
        success: (result) => {
          const{currentPosition, duration, status} = result
          // 0 暂停中
          // 1 播放中
          // 2 没有音乐播放
          if (status == 1) {
            this.globalData = {
              currentPosition,
              duration
            }
          }
        },
      })
    }, 1000)
    // 自动连播
    this.globalData.BackgroundAudioManager.onEnded(()=> {
      this.changeAudio()
    })
  },
  _globalData: {
    playList: [],
    songId: 0,
    audioPlaying: false,
    lrc: []
  },
  // 监听globalData变化
  watch(method) {
    Object.defineProperty(this, "globalData", {  // 对其他页面使用globalData进行监听
      configurable: true,
      enumerable: true,
      set: (value) => {  //动态赋值，传递对象，为 globalData 中对应变量赋值
        Object.keys(value).forEach(item => {
          this._globalData[item] = value[item]
        })
        method(this._globalData)
      },
      get: () => {
        //获取全局变量值，直接返回全部
        return this._globalData
      }
    })
  },
  // 播放音频
  async playAudio (index) {
    const {id, name, al, ar} = this._globalData.playList[index]
    const {data, code} = await reqSongUrl(id)
    if (code == 200) {
      this.globalData.songId = id
      this.globalData.BackgroundAudioManager.title= name
      this.globalData.BackgroundAudioManager.epname = al.name
      this.globalData.BackgroundAudioManager.singer = ar[0].name
      this.globalData.BackgroundAudioManager.coverImgUrl  = al.picUrl
      this.globalData.BackgroundAudioManager.src = data[0].url
      this.globalData.audioPlaying = true
      // this.getLrc(id)
      return true
    }
  },
  // 歌曲change
  changeAudio (call) {
    const len = this.globalData.playList.length - 1 
    if (len) {
      let index = this.globalData.playList.findIndex(item => item.id === this.globalData.songId)
      if (call == 'prev') {
        if (index -- <= 0) index = len
      }
      else if (call == 'next' || !call) {
        if ( ++index > len) index = 0 // 如果当前这一首歌为最后一首，从头开始播放
      }
      this.playAudio(index)
    }
  },
  // 格式化歌词
  // async getLrc (id) {
  //   const {lrc} = await reqLyric(id)
  //   let lyric = lrc.lyric.split('\n')
  //   lyric.pop()
  //   let lyricList = {}
  //   lyric.forEach( item => {
  //     // let time = item.split(']')[0].split('[')[1].split('.')[0]
  //     console.log(item)
  //   })
  // }
})
