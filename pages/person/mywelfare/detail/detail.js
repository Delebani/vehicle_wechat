// pages/person/mywelfare/detail/detail.js
const app = getApp();
var orderId = '';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    orderId = options.orderId;
    // 身份
    var type = wx.getStorageSync('type');
    console.log('身份---'+type)
    if(0 != type){
      wx.switchTab({
        url: '/pages/person/person',
      })
    }
    wx.request({
      url: app.globalData.baseUrl + '/wechat/xysq/flsp/order/detail?orderId=' + orderId,
      success: (res) => {
        var resp = res.data;
        console.log('我的福利详情---' + resp)
        if(200 == resp.code){
          resp.data.order.orderQr = app.globalData.baseUrl + resp.data.order.orderQr;
          resp.data.flsp.flspImg = app.globalData.baseUrl + resp.data.flsp.flspImg;
          resp.data.shxx.deptImg = app.globalData.baseUrl + resp.data.shxx.deptImg;
          this.setData({
            detail : resp.data
        });
        }else{
          wx.showModal({
            title: '提示',
            content: resp.msg,
            showCancel: false,
            confirmText: '确定',
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击了确定')
                }
            }
        })
        }
      },
      fail: function (err) {
        console.log("获取详情失败" + err)
      }
    })

    

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

  }
})