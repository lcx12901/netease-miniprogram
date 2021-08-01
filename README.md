# netease-miniprogram


### 仿网易云音乐小程序

#### 此项目api接口使用Binaryify大佬开源项目[NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)



### 下载此项目：

```javascript
// 先clone
$ git clone https://github.com/lcx12901/netease-miniprogram.git
$ cd netease-miniprogram
$ npm install

// 导入微信开发工具
```



### 项目介绍:

​	**说明:本项目参考网易云音乐安卓端app界面开发，组件为微信小程序官方的组件，在此过程中，将部分知识补齐，有所收益**。



### 开发准备：

- **微信开发者工具**
- **Android网易云音乐8.2.51版本**
- [Binaryify的开源API](https://github.com/Binaryify/NeteaseCloudMusicApi)
- [阿里巴巴矢量图标库](https://link.juejin.cn/?target=https%3A%2F%2Fwww.iconfont.cn)



### 标题栏自定义：

在一般的页面当中，微信小程序的标题栏可以满足需求。当时为了美观，或者实现一些特殊效果，就需要对标题栏进行自定义。

在对应页面的`pages.json`或者全局app.json中进行声明：`"tabBar": { "custom": true }`

![image-20210802003610907](E:\Study\netease-miniprogram\READEME_IMG\image-20210802003610907.png)

​	

```json
<!-- songPlay.json -->
{
  "usingComponents": {},
  "navigationStyle": "custom"
}
```

```html
<!--pages/songPlay/songPlay.wxml-->

<!-- 填充导航栏位置,主体内容不会上移 -->
<view style="height: calc({{safeTop}}px + {{titleBarHeight}}px);"></view>
<!-- 自定义标题栏 -->
<view
  class="navBar"
  style="position: fixed;top: {{safeTop}}px;height: {{titleBarHeight}}px;line-height:{{titleHeight}}px;"
>
  <!-- 自定义返回按钮 -->
  <view 
    class="nav-navigate" 
    style="height: {{titleHeight}}px;top: calc(({{titleBarHeight}}px - {{titleHeight}}px) / 2);">
    <icon class="iconfont icon-zuojiantou" bindtap="back" style="height: {{titleHeight}}px;width: {{titleHeight}}px;"></icon>
  	<!-- 标题栏顶部距离为手机的状态栏高度 -->
    <view
      style="margin-top: calc(({{titleHeight}}px - 16px) / 2);">
   	</view>
    <icon class="iconfont icon-Home" style="height: {{titleHeight}}px;width: {{titleHeight}}px;"></icon>
  </view>
  <text>{{song[0].name}}</text>
</view>
```

```javascript
// pages/songPlay/songPlay.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        audioPlaying: false, // 是否在播放音频
        safeTop: 0, // 状态栏高度
        titleBarHeight: 0, // 微信小程序胶囊高度，Android、IOS高度不同
        titleHeight: 0 // 文字line-height，使标题和iconfont与胶囊对齐（强迫症）
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
        // 音频播放读秒
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
            duration: `${minute}:${second}`,
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
})
```



### API封装：

对于HTTP请求需要用到`wx.request`,对于只用一次或者有多次请求的页面，会使页面变得冗长和复杂，不利于维护，不仅自己会被搞糊涂，其他维护者也无从下手。
