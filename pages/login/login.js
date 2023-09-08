//登录页面login/index.js
const app=getApp()
let redirect = ''
var openId = '';
var sence = '';
Page({
  data: {
    viewShow: false
  },
  onLoad: function (option) {
    console.log(option);
    redirect = option.redirect;
    sence = option.sence;
    console.log(redirect);
    // 判定用户缓存存在
    var userInfo = wx.getStorageSync('userInfo');
    console.log('用户缓存信息----' + userInfo)
    if(userInfo){
      openId = userInfo.openId;
      checkSence(sence,openId);
      console.log('用户缓存存在，跳转至----' + redirect)
      app.globalData.userInfo = userInfo;
      app.globalData.token = userInfo.token;
      app.globalData.openId = userInfo.openId;
      wx.switchTab({
        //获取当前页面的路径，在未登陆的情况下通过地址参数传给登录页面
          url: redirect,
          success:function(e){
　　　　　　　　console.log(e)
　　　　　　  },
          fail:function(e){
　　　　　　　　console.log(e)
　　　　　　  }
        })
      return
    }else{
    // ====== 【获取Code】
      wx.login({
        success: (res) => {
          console.log(res);
          var code = res.code
          console.log('code ----' + code);
          wx.request({
            url: app.globalData.baseUrl + '/wechat/getOpenId?code='+ code,
            success: (res) => {
              var resp = res.data;
              if(0 == resp.code){
                openId = resp.data;
              }else{
                wx.showModal({
                  title: '提示',
                  content: resp.msg,
                  showCancel: false,
                  confirmText: '确定',
                  success: function (res) {
                      if (res.confirm) {
                        console.log('用户点击了确定')
                        return;
                      }
                  }
                })
              }
            },
            fail: function (err) {
              console.log("失败=" + err)
              return;
            }
          })
          wx.request({
            url: app.globalData.baseUrl + '/wechat/getUserByOpenId?openId='+ openId,
            success: (res) => {
              var resp = res.data;
              if(0 == resp.code){
                // 获取到用户信息
                var userInfo = resp.data;
                // 获取到用户信息
                app.globalData.userInfo = userInfo,
                app.globalData.token = userInfo.token,
                app.globalData.openId = userInfo.openId,
                wx.setStorageSync('userInfo', userInfo);
                checkSence(sence,openId);
                // 当前时间
                var timestamp = Date.parse(new Date());
                // 加上过期期限
                var expiration = timestamp + 7000000; //缓存120分钟
                // 存入缓存
                wx.setStorageSync('data_expire', expiration);
                wx.redirectTo({
                  url: '/pages/index/index',
                })
              }else{
                // 展示登录
                this.setData({
                  viewShow: true
                })
              }
            },
            fail: function (err) {
              console.log("失败=" + err)
            }
          })
        }
      })
    }
  },
})
function accountLogin(){
  wx.request({
    url: app.globalData.baseUrl + '/wechat/minLogin?mobile='+ mobile + "&password="+password,
    success: (res) => {
      var resp = res.data;
      if(0 == resp.code){
        // 获取到用户信息
        var userInfo = resp.data;
        // 获取到用户信息
        app.globalData.userInfo = userInfo,
        app.globalData.token = userInfo.token,
        app.globalData.openId = userInfo.openId,
        wx.setStorageSync('userInfo', userInfo);
        checkSence(sence,openId);
        // 当前时间
        var timestamp = Date.parse(new Date());
        // 加上过期期限
        var expiration = timestamp + 7000000; //缓存120分钟
        // 存入缓存
        wx.setStorageSync('data_expire', expiration);
        wx.redirectTo({
          url: '/pages/index/index',
        })
      }else{
        wx.showModal({
          title: '提示',
          content: res.data.msg,
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
      console.log("失败=" + err)
    }
  })
};
function checkSence(sence,openId){
  if(null != sence && '' != sence){
    wx.request({
      url: app.globalData.baseUrl + '/wechat/getAuth?scene='+ scene + "&openId="+openId,
      success: (res) => {
        if(0 == res.code){

        }else{
          wx.showModal({
            title: '提示',
            content: res.data.msg,
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
        console.log("失败=" + err)
      }
    })
  }
}