// components/authorization/index.js
const app=getApp()
Component({
  data: {
    redirect: '',
    isLogin: false
  },
  // 生命周期函数
  lifetimes: {
    attached() {
      var expiration = wx.getStorageSync('data_expire');
      if (new Date().getTime() > expiration) {
        wx.clearStorageSync();
      }
      var userInfo = wx.getStorageSync('userInfo');
      if(userInfo){
        app.globalData.userInfo = userInfo,
        app.globalData.token = userInfo.token,
        // 记录登录状态
        this.setData({
          isLogin: true
        })
      }else{
        // 读取当前历史栈getCurrentPages()   第一个历史页面getCurrentPages()[0]
      // console.log(getCurrentPages()[getCurrentPages().length-1].route,789); //最后一个历史页面
      const redirect = getCurrentPages()[getCurrentPages().length - 1].route
      wx.redirectTo({
      //获取当前页面的路径，在未登陆的情况下通过地址参数传给登录页面
        url: '/pages/login/login?redirect=/' + redirect
      })
      this.setData({
        redirect: redirect
      })
      
      }
    console.log(this.data);
  },
}
})