// pages/person/person.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    resident: false,
    business: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 身份
    var type = wx.getStorageSync('type');
    console.log('身份---'+type)
    if(0 == type){
      this.setData({
        resident:true,
        business:false,
      })
    }else{
      this.setData({
        resident:false,
        business:true,
      })
    }
    console.log(app.globalData);
    this.setData({
      userInfo: app.globalData.userInfo
    })
    console.log(this.data.userInfo);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.onLoad();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.onLoad();
    wx.stopPullDownRefresh();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  myactivity:function (e) {
    console.log('我的活动')
      wx.navigateTo({
        url: '/pages/activity/myactivity/myactivity',
      })
  },
  mywelfare: function (e) {
    console.log('我的福利')
    wx.navigateTo({
      url: '/pages/person/mywelfare/mywelfare',
    })
  },
  myscore:function (e) {
      console.log('个人积分')
      wx.navigateTo({
        url: '/pages/person/myscore/myscore',
      })
  },
  mydestroy:function (e) {
    console.log('核销记录')
    wx.navigateTo({
      url: '/pages/person/mydestroy/mydestroy',
    })
},
  myinfo:function (e) {
    console.log('个人信息')
    wx.navigateTo({
      url: '/pages/person/myinfo/myinfo',
    })
  },
  qrcode:function (e) {
    console.log('二维码')
    wx.navigateTo({
      url: '/pages/scan/scan?qrtype=0',
    })
  }
})