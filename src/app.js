//app.js
App({
  globalData: {
    urlPath: 'https://admintour.cworld-china.com/tourWeb/v1.0',
    imgUrlPath: 'https://admintour.cworld-china.com/',
    userInfo: {}
  },
  onLaunch: function () {
    this.getUserInfo()
  },
  onLoad: function(){
    
  },
  //获取用户信息接口
  getUserInfo: function(){
    wx.checkSession({
      success: () => {
        console.log('have user session')
        wx.reLaunch({
          url: '/pages/index/index'
        })
      },
      fail: function(){
        console.log('no user session ,wait login !!!!')
      },
    })
  },
  //防止多次点击
  buttonClicked: function(that){
    that.setData({
        buttonClicked: true 
    })
    setTimeout(() =>{
        that.setData({
            buttonClicked: false
        })
    },1000)
  },
  
})
