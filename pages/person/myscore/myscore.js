// pages/person/myscore/myscore.js
const app=getApp()
var pageNum  = 1;
var pageSize = 10;
var total = 0;
var userId = 0;
var bglx = '';
var bgqd = '';

// 请求数据
var loadMore = function(that){
  wx.request({
    url: app.globalData.baseUrl + '/wechat/xysq/point/history?userId='+userId+'&bglx='+bglx+'&bgqd='+bgqd,
    
    success: res => {
      var resp =res.data;
      if(200 == resp.code){
         total = resp.total
        //将搜索结果存储在searchResults中
          
          that.setData({
              list : resp.rows
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
    fail: res => {
      console.log(res);
    }
  })
}

Page({

  data: {
    score:{},
    list:[],
    bglxArray:[{bglx:'',name:"变更类型"},{bglx:0,name:"积分支出"},{bglx:1,name:"积分收入"}],
    bglxIndex:0,
    bgqdArray:[{bgqd:'',name:"变更渠道"},{bgqd:0,name:"公益活动获取"},{bgqd:1,name:"打卡活动获取"},{bgqd:2,name:"兑换商品"},{bgqd:3,name:"订单退单"},{bgqd:4,name:"积分过期"}],
    bgqdIndex:0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 身份
    var type = wx.getStorageSync('type');
    console.log('身份---'+type)
    if(0 == type){
      userId = app.globalData.userInfo.userId;
    }else{
      wx.switchTab({
        url: '/pages/person/person',
      })
    }
    // 个人积分
    userId = app.globalData.userInfo.userId;
    wx.request({
      url: app.globalData.baseUrl + '/wechat/xysq/point/user?userId='+userId,
      success: res => {
        var resp = res.data;
        if(200 == resp.code){
          if(null == resp.data){
            this.setData({
              score:{pointLj:0,pointKy:0,pointYy:0,pointGq:0}
            })
          }else{
            this.setData({
              score:resp.data
            })
          }
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
      fail:res=>{
        console.log(res);
      }
    })
    var that = this;
    loadMore(that);
  },
  bglxPickerChange: function(e) {
    var bglxIndex = e.detail.value;
    console.log('变更类型选择改变，携带值为', bglxIndex)
    this.setData({
      bglxIndex: bglxIndex
    })
    bglx = this.data.bglxArray[bglxIndex].bglx;
    console.log('bglx----', bglx)
    pageNum = 1;
    this.setData({
        list : [],
    });
    var that = this;
    loadMore(that);
  },
  bgqdPickerChange: function(e) {
    var bgqdIndex = e.detail.value;
    console.log('变更类型选择改变，携带值为', bgqdIndex)
    this.setData({
      bgqdIndex: bgqdIndex
    })
    bgqd = this.data.bgqdArray[bgqdIndex].bgqd;
    console.log('bgqd----', bgqd)
    pageNum = 1;
    this.setData({
        list : [],
    });
    var that = this;
    loadMore(that);
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
    wx.hideHomeButton();
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

  }
})