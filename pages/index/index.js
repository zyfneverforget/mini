//index.js
//获取应用实例
import {translate} from'../../utils/api.js'
const app = getApp()

Page({
  data: {
    curLang: {},
    query: '',
		result : [],
		hideClearIcon: true
  },
	//事件处理函数
	clearText(){
		this.setData({
			query: '',
			hideClearIcon: true
		})
	},
  onConfirm(event) {
		if(!this.data.query) return
		translate(this.data.query,{from: 'auto', to: this.data.curLang.lang}).then(res=>{
			this.setData({ result: res.trans_result })
			let history = wx.getStorageSync('history') ||[]
			history.unshift({query : this.data.query, result : res.trans_result[0].dst})
			history.length = history.length > 10 ? 10 : history.length
			wx.setStorageSync('history',history)
		})
		
	},
	onInput(event){
		this.setData({ query: event.detail.value })
		if(this.data.query.length>0){
			this.setData({ hideClearIcon : false })
		} else{
      this.setData({ hideClearIcon : true })
    }
	},
	onLoad(options) {
		if(options.query) {
			this.setData({ query: options.query })
    } else {
			this.setData({ curLang: app.globalData.curLang})
		}
	},
	onShow() {
    if (this.data.curLang.lang !== app.globalData.curLang.lang) {
			this.setData({ curLang: app.globalData.curLang })
			if(this.data.query.length>0){
				this.setData({ hideClearIcon : false })
			}
			this.onConfirm()
		}
  },
})
