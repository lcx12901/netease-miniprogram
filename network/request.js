const BASEURL = 'https://netease-cloud-music-api-lcx12901.vercel.app'

export const request =  ({url, data = {}, method = 'get' }) => {
    wx.showLoading({
      title: '请稍等',
      mask: true,
    })

    return new Promise ( (resolve, reject) => {
        wx.request({
          url: BASEURL + url,
          data,
          method,
          header: {
            'cookie': wx.getStorageSync('cookie')
          },
          success (res) {
            resolve (res.data)
            wx.hideLoading()
          },
          fail (err) {
            reject (err)
            wx.hideLoding()
          }
        })
    })
}