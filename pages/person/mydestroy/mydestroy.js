// pages/person/mydestroy/mydestroy.js
const app = getApp()
var pageNum = 0;
var pageSize = 10;
var deptId = ''
var userId = '';
var spddStatus = '';
var total = 0;

var loadMore = function (that) {
    // that.setData({
    //   hidden:false
    // });
    // if(that.data.bottom){
    //   that.setData({
    //       hidden:true
    //   });
    //   return
    // }
    wx.request({
        url: app.globalData.baseUrl + '/wechat/xysq/flsp/order/dept/list?pageNum='+pageNum+'&pageSize='+pageSize+'&userId='+userId+'&deptId='+deptId,
        success: res => {
          var resp = res.data;
          if(200 == resp.code){
            total = resp.total
            //将搜索结果存储在searchResults中
            
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
    //   that.setData({
    //     hidden:true
    // });
}


Page({

    /**
   * 页面的初始数据
   */
  data: {
    //hidden:true,
    list:[],
    // scrollTop : 0,
    // scrollHeight:0,
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
    if(1 == type){
      deptId = app.globalData.userInfo.deptId;
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
    //   这里要注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
    var that = this;
    wx.getSystemInfo({
        success:function(res){
            that.setData({
                scrollHeight:res.windowHeight
            });
        }
    });
    loadMore(that);
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
  //页面滑动到底部
  // bindDownLoad:function(){   
  //   console.log('--------加载更多-------')
  //     var that = this;
  //     loadMore(that);
  // },
  // scroll:function(event){
  //   //该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
  //    this.setData({
  //        scrollTop : event.detail.scrollTop
  //    });
  // },
  // topLoad:function(event){
  //   console.log('--------上拉刷新-------')
  //     pageNum = 1;
  //     this.setData({
  //         list : [],
  //         scrollTop : 0,
  //         bottom:false
  //     });
  //     var that = this;
  //     loadMore(that);
  // },
  // choose: function (event) {
  //   console.log(event.currentTarget.dataset);
  //   spddStatus = event.currentTarget.dataset.spddstatus;
  //   if(1 == spddStatus){
  //     this.setData({
  //       allcolor:'#000',
  //       allbackcolor:'#fff',
  //       hxcolor:'#fff',
  //       hxbackcolor:'#ff5256'
  //     })
  //   }else{
  //     this.setData({
  //       allcolor:'#fff',
  //       allbackcolor:'#ff5256',
  //       hxcolor:'#000',
  //       hxbackcolor:'#fff'
  //     })
  //   }
  //   pageNum = 1;
  //   this.setData({
  //     list : [],
  //     scrollTop : 0,
  //     bottom:false
  //   });
  //   var that = this;
  //   loadMore(that);
  // },

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
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})