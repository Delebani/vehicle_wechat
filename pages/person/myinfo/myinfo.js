// pages/person/myinfo/myinfo.js
const app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    sexIndex: 0,
    sexArray:[{sex:0,name:'男'},{sex:1,name:'女'},{sex:'',name:'未知'}],
    avatarUrl:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
    console.log(app.globalData);
    this.setData({
      userInfo: app.globalData.userInfo,
      avatarUrl: app.globalData.userInfo.avatarUrl,
    })
    console.log(this.data.userInfo);
    if(null == this.data.userInfo.gender || '' == this.data.userInfo.gender){
      this.setData({
        sexIndex:2
      })
    }else{
      this.setData({
        sexIndex:this.data.userInfo.gender
      })
    }
  },
  onChooseAvatar(e) {
    wx.showLoading({ title: '上传中...', })
    var that = this;
    const avatar = e.detail
    console.info(avatar);
    that.setData({
      avatarUrl: avatar.avatarUrl,
    })
    wx.uploadFile({
      url: app.globalData.baseUrl + '/wechat/system/upload',
      filePath: avatar.avatarUrl,
      name: 'file',
      complete(){
        wx.hideLoading();
      },
      success (res){
        console.log('上传文件响应--'+ res);
        var resp = JSON.parse(res.data);
        console.log('上传文件响应resp--'+ resp);
          if(200 == resp.code){
              wx.showModal({
                title: '提示',
                content: '上传成功',
                showCancel: false,
                confirmText: '确定',
                success: function (res) {

                  that.setData({
                    "userInfo.avatarUrl": app.globalData.baseUrl + resp.fileName,
                  })
                }
            })
          }else{
            wx.showModal({
              title: '提示',
              content: '上传失败',
              showCancel: false,
              confirmText: '确定',
              success: function (res) {
                  if (res.confirm) {
                      console.log('用户点击了确定')
                  }
              }
          })
        }
      },fail: res => {
        console.log(res);
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
  onPhoneInput: function(event) {
    console.log(event.detail.value)
    this.setData({
      "userInfo.phone":event.detail.value
    })
  },
  onPhoneConfirm: function(event) {
    console.log(event.detail.value)
    
    this.setData({
      "userInfo.phone":phone
    })
  },
  onConfirm: function (event) {
    var nickName = event.detail.value;
    this.setData({
      "userInfo.nickName":nickName
    })
  },
  onInput: function(event) {
    console.log(event.detail.value)
    this.setData({
      "userInfo.nickName":event.detail.value
    })
  },
  sexChange:function (event) {
    var sexIndex = event.detail.value;
    var sex = this.data.sexArray[sexIndex].sex;
    this.setData({
      "userInfo.gender":sex,
      sexIndex:sexIndex,
    })
  },
  bindDateChange:function (event) {
    var birthday = event.detail.value;
    this.setData({
      "userInfo.birthday":birthday
    })
  },
  save: function (event) {
    var that = this;
    console.log("保存个人信息")
    var phone = this.data.userInfo.phone;
    if (!(/^1[34578]\d{9}$/.test(phone))) { 
      wx.showModal({
        title: '提示',
        content: '手机号格式不正确，请重新输入',
        showCancel: false,
        confirmText: '确定',
        success: function (res) {
            if (res.confirm) {
                console.log('用户点击了确定')
                that.setData({
                  "userInfo.phone":app.globalData.userInfo.phone,
                })
            }
        }
    });
    return
  }
  wx.showLoading({
    title: '保存中...',
  })
    wx.request({
      url: app.globalData.baseUrl + '/wechat/system/edituser',
      method: "POST",
      header: {  
        "Content-Type": "application/json"  
      },  
      data: {
        "id": this.data.userInfo.userId,
        "nickname": this.data.userInfo.nickName,
        "avatar": this.data.userInfo.avatarUrl,
        "gender":this.data.userInfo.gender,
        "phone": this.data.userInfo.phone,
      },  
      complete(){
        wx.hideLoading();
      },
      success: res => {
        var resp = res.data;
        if(200 == resp.code){
          wx.showModal({
            title: '提示',
            content: '保存成功',
            showCancel: false,
            confirmText: '确定',
            success: function (res) {
                app.globalData.userInfo = that.data.userInfo;
                wx.setStorageSync('userInfo', that.data.userInfo);
                if (res.confirm) {
                    console.log('用户点击了确定')
                    wx.navigateBack({
                      delta: 1
                    });
                }
            }
        })
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
})