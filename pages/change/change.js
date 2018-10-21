//logs.js
const app = getApp()

Page({
  data: {
    curLang : {},
    langList: app.globalData.langs
  },
  onShow(){
    this.setData({ curLang: app.globalData.curLang })
  },
  onTapItem(event){
    this.setData({
      curLang: event.currentTarget.dataset
    })
    app.globalData.curLang = this.data.curLang
    wx.setStorageSync('lang', this.data.curLang)
    wx.switchTab({ url: '/pages/index/index'})
  }
})
