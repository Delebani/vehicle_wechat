// pages/person/mywelfare/mywelfare.js
const app = getApp()
var pageNum = 0;
var pageSize = 10;
var userId = '';
var spddStatus = '';
var total = 0;

var loadMore = function (that) {
    
  wx.request({
      url: app.globalData.baseUrl + '/wechat/xysq/flsp/order/list?pageNum='+pageNum+'&pageSize='+pageSize+'&userId='+userId+'&spddStatus='+spddStatus,
        
      success: res => {
        var resp = res.data;
        if(200 == resp.code){
          total = resp.total
          //将搜索结果存储在searchResults中
          console.info(that.data.list);
            var list = that.data.list;
            for(var i = 0; i < resp.rows.length; i++){
                list.push(resp.rows[i]);
            }
            that.setData({
                list : list
            });
            
            
          if(total > pageSize * pageNum){
            pageNum ++;
          }else{
            that.setData({
              bottom: true
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

}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    bottom: false,
    allcolor: '#000',
    allbackcolor:'#fff',
    hxcolor:'#000',
    hxbackcolor:'#fff',
    randomcode:'',
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
    spddStatus = 0;
    this.setData({
      hxcolor:'#fff',
      hxbackcolor:'#ff5256'
    })
    var that = this;
    loadMore(that);
  },
  choose: function (event) {
    console.log(event.currentTarget.dataset);
    spddStatus = event.currentTarget.dataset.spddstatus;
    if(spddStatus && 0 == spddStatus){
      this.setData({
        allcolor:'#000',
        allbackcolor:'#fff',
        hxcolor:'#fff',
        hxbackcolor:'#ff5256'
      })
    }else{
      this.setData({
        allcolor:'#fff',
        allbackcolor:'#ff5256',
        hxcolor:'#000',
        hxbackcolor:'#fff'
      })
    }
    pageNum = 1;
    this.setData({
      list : [],
      scrollTop : 0,
      bottom:false
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
    console.log('--------上拉刷新-------')
    pageNum = 1;
    this.setData({
      list : [],
      bottom:false
    });
    var that = this;
    loadMore(that);
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    console.log('--------加载更多-------')
    if(this.data.bottom){
      wx.showToast({
        title: '已经到底了啦~',
        icon: 'success',
        duration: 2000,      // 2秒
      });
      return
    }
    wx.showLoading({ title: '加载中...', })
    var that = this;
    loadMore(that);
    wx.hideLoading();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  detail: function(event){
    console.log(event.currentTarget.dataset);
    const orderId = event.currentTarget.dataset.orderid;
    console.log('--详情--'+ orderId)
    wx.navigateTo({
      url: '/pages/person/mywelfare/detail/detail?orderId='+orderId,
    })
  }
})