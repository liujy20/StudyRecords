// pages/list/list.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min');
var qqmapsdk;
qqmapsdk = new QQMapWX({
  key: 'LZ5BZ-5JP34-KWJU4-K2WEC-U7ARO-BTBST'
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isClose: false,
    userLocation: {
      lat: 0,
      lng: 0
    },
    stopList: [],
    markers:[]
  },

  closeMap() {
    this.setData({
      isClose: !this.data.isClose
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(options);
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        const latitude = res.latitude
        const longitude = res.longitude
        console.log('当前地址', res);
        this.setData({
          userLocation: {
            lat: latitude,
            lng: longitude+0.1
          }
        })

        qqmapsdk.search({
          keyword: '茶百道',
          location: {
            latitude:latitude,
            longitude:longitude+0.1,
          },
          success: (res)=> {
            console.log(res.data);
            
            let arr=res.data.map(item=>{
              if(item._distance>1000){
                let distance=item._distance/1000
                item._distance=distance.toFixed(2)+'km'
              }else{
                item._distance=item._distance+'m'
              }
              return {
                id:+item.id,
                longitude:item.location.lng,
                latitude:item.location.lat,
                iconPath:'../../assets/icons/marker.png',
                width:30,
                height:30
              }
            })
            this.setData({
              stopList:res.data,
              markers:arr
            })
          }
        });
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
    console.log('触底更新');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})