//登录页面login/index.js
const app=getApp()
let redirect = ''
Page({
  data: {
    // viewShow: false
  },
  onLoad: function (option) {
    console.log(option);
    redirect = option.redirect;
    console.log(redirect);
    // 判定用户缓存存在
    var userInfo = wx.getStorageSync('userInfo');
    console.log('用户缓存信息----' + userInfo)
    if(userInfo){
      console.log('用户缓存存在，跳转至----' + redirect)
      app.globalData.userInfo = userInfo;
      app.globalData.token = userInfo.token;
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
          wx.getUserInfo({
            success: res => {
              console.log("==iv==" + res.iv)
              console.log("==encryptedData==" + res.encryptedData)
              const encryptedData = res.encryptedData
              const iv = res.iv
              wx.request({
                url: app.globalData.baseUrl + '/wechat/system/user/login',
                method: "POST",
                header: {  
                  "Content-Type": "application/json"  
                },  
                data: {
                  "code": code,
                  "iv": iv,
                  "encryptedData": encryptedData
                },  
                success: res => {
                  console.log(res);
                  var data = res.data;
                  if(200 == data.code){
                    // 获取到用户信息
                    var userInfo = data.data;
                    // 获取到用户信息
                    app.globalData.userInfo = userInfo,
                    app.globalData.openId = userInfo.openId,
                    app.globalData.userId = userInfo.userId,
                    wx.setStorageSync('userInfo', userInfo);
                    // 当前时间
                    var timestamp = Date.parse(new Date());
                    // 加上过期期限
                    var expiration = timestamp + 7000000; //缓存120分钟
                    // 存入缓存
                    wx.setStorageSync('data_expire', expiration);
                    wx.redirectTo({
                      url: '/pages/identity/identity',
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
                fail: res => {
                  console.log(res);
                }
              })
            }
          })

          // this.setData({
          //   viewShow: true
          // })
        }
      })
    }
  },
})