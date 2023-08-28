// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switchChecked: false,
    type: [],
    curIndex: 0,
    curId:''
  },

  goMap(event){
   console.log(event.currentTarget.dataset.name);
   let name=event.currentTarget.dataset.name
   wx.redirectTo({
     url: `../list/list?name=${name}`,
   })
  },

  getGoods() {
    wx.request({
      url: 'http://124.70.54.24:3005/milkTeas/getAllCategory',
      success: (res) => {
        console.log(res.data);
        this.setData({
          type: res.data.data
        })
      }
    })
  },

  changeIndex(event) {
    // console.log(event.currentTarget.dataset.index);
    this.setData({
      curIndex: event.currentTarget.dataset.index,
      curId:'item-'+event.currentTarget.dataset.index
    })
  },
  changeScroll(event) {
    let scorllTop = event.detail.scrollTop
    // console.log(scorllTop);
    const query = wx.createSelectorQuery()
    query.selectAll('.list-box').boundingClientRect((res)=> {
      // console.log(res);
      let allTop = 0;
      for (let i in res) {
        allTop += res[i].height
        if (allTop > scorllTop) {
          this.setData({
            curIndex: i
          })
          break
        }
      }
    }).exec()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getGoods()
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})