const app = getApp()

Page({
  data:{
		history: []
  },
  onShow(){
    this.setData({ history: wx.getStorageSync('history')})

  },
  onTap(event){
    wx.reLaunch({
      url: `/pages/index/index?query=${event.currentTarget.dataset.query}`
    })
  },
  deleteHis(event){
    let index = event.currentTarget.dataset.index
    wx.showModal({
      title: '删除',
      success:  (res)=> {
        if (res.confirm) {
					let newHistory = JSON.parse(JSON.stringify(this.data.history))
					if(newHistory.length)
					newHistory.splice(index,1)
					this.setData({ history: newHistory})
					wx.setStorageSync('history', this.data.history)
        } else if (res.cancel) {
           return
          }
      }
    })
  },
})