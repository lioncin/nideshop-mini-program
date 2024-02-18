const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
const user = require('../../../services/user.js');
const app = getApp();

Page({
    data: {
      userInfo: {},
      showLoginDialog: false
    },
    getUserProfile: function(e){
      wx.getUserProfile({
        desc: '获取您的微信个人信息',
        success:(res)=>{
            this.setData({
              userinfo: res.userInfo,
              hasUserInfo: true
            })
            wx.setStorageSync('userinfo', res.userInfo)
            wx.showToast({
              title: '已获取信息',
            })
        },
        fail:function(e){
            wx.showToast({
              title: '已取消',
              icon: "none",
              duration: 1500,
              mask: true
            })
        }
      })
    },
    onLoad: function(options) {
        // 页面初始化 options为页面跳转所带来的参数
    },
    onReady: function() {

    },
    onShow: function() {
        this.setData({
            userInfo: app.globalData.userInfo,
        });
    },
    onHide: function() {
        // 页面隐藏

    },
    onUnload: function() {
        // 页面关闭
    },

    onUserInfoClick: function() {
      let that = this;
        wx.showModal({
            title: '授权提示',
            content: '为了提供更好的服务，我们需要获取您的信息。是否同意授权？',
            success: function (res) {
                if (res.confirm) {
                    wx.login({
                        success: function (resp) {
                          console.log(resp)
                            if(resp.errMsg=='login:ok'){
                                const code = resp.code;
                                console.log('code:',code);
                                wx.request({
                                    // url: api.getPhoneNumber,
                                    url: api.getPhoneNumber,
                                    method: 'POST',
                                    data: {
                                      code: code
                                    },
                                    success: function (response) {
                                        const msg = response.data.message;
                                        const openId = msg.openid;
                                        const userInfo = {
                                            openId:openId,
                                            nickName:'微信用户'
                                        };
                                        console.log(userInfo);
                                        wx.request({
                                            url: api.AuthLoginByWeixin,
                                            method: 'POST',
                                            data: {
                                                code: code,
                                                userInfo: userInfo
                                            },
                                            header: {
                                                'content-type': 'application/json'
                                            },
                                            success: function(res) {
                                                const data = res.data.data;
                                                const token = data.token;
                                                const userInfo2 = data.userInfo;
                                                // 在请求成功时执行的操作
                                                that.setData({
                                                    userInfo: userInfo2
                                                });
                                                app.globalData.userInfo = userInfo2;
                                                app.globalData.token = token;
                                                wx.setStorageSync('userInfo', JSON.stringify(userInfo2));
                                                wx.setStorageSync('token', token);
                                            },
                                            fail: function(error) {
                                                console.log(error);
                                              // 在请求失败时执行的操作
                                            }
                                        });
                                    },
                                    fail: function (error) {
                                        console.error('Request failed:', error);
                                        // 在这里处理请求失败的情况
                                    }
                                });
                            }
                        },
                        fail:function(resp){
                          console.log(resp)
                        }
                    });
                }
            }
        });
    },
    onUserLogout: function() {
      wx.showModal({
        title: '授权提示',
        content: '是否退出?',
        success: function(res) {
          if (res.confirm) {
            // 清除全局数据中的token和userInfo
            app.globalData.token = null;
            app.globalData.userInfo = null;
            // 清除本地存储中的token和userInfo
            wx.removeStorageSync('token');
            wx.removeStorageSync('userInfo');
            // 跳转至登录页面或者其他指定页面
            wx.reLaunch({
              url: '/pages/index/index',
            });
          }
        }
      });
    },
    showLoginDialog() {
        this.setData({
            showLoginDialog: true
        })
    },

    onCloseLoginDialog () {
        this.setData({
            showLoginDialog: false
        })
    },

    onDialogBody () {
        // 阻止冒泡
    },

    onWechatLogin(e) {
        util.login().then((res) => {
            return util.request(api.AuthLoginByWeixin, {
                code: res,
                userInfo: e.detail
            }, 'POST');
        }).then((res) => {
            if (res.errno !== 0) {
                wx.showToast({
                    title: '微信登录失败',
                })
                return false;
            }
            // 设置用户信息
            this.setData({
                userInfo: res.data.userInfo,
                showLoginDialog: false
            });
            app.globalData.userInfo = res.data.userInfo;
            app.globalData.token = res.data.token;
            wx.setStorageSync('userInfo', JSON.stringify(res.data.userInfo));
            wx.setStorageSync('token', res.data.token);
        }).catch((err) => {
            console.log(err)
        })
    },

    onOrderInfoClick: function(event) {
        wx.navigateTo({
            url: '/pages/ucenter/order/order',
        })
    },

    onSectionItemClick: function(event) {

    },

    // TODO 移到个人信息页面
    exitLogin: function() {
        wx.showModal({
            title: '',
            confirmColor: '#b4282d',
            content: '退出登录？',
            success: function(res) {
                if (res.confirm) {
                    wx.removeStorageSync('token');
                    wx.removeStorageSync('userInfo');
                    wx.switchTab({
                        url: '/pages/index/index'
                    });
                }
            }
        })

    }
})