const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');

const app = getApp()

Page({
  data:{
    keyword: '', //搜索的关键字，
    category: 0, //分类
    attribute: '', //类型
    price: '',
    brand: '',   //品牌
    goodsList:[]
  },

  // onLoad: function () { //只执行了一次
  //   const attribute = wx.getStorageSync('attribute');
  //   const price =     wx.getStorageSync('price')
  //   const category =  wx.getStorageSync('category')
  //   const brand =     wx.getStorageSync('brand')
  //   console.log(category)
  //   this.getGoodsList()
  // },
  
  
  onShow: function (options) {
    const attribute = wx.getStorageSync('attribute');
    const price =     wx.getStorageSync('price')
    const category =  wx.getStorageSync('category')
    const brand =     wx.getStorageSync('brand')
    console.log('category', category)
    console.log('brand', brand)
    console.log('attribute', attribute)
    console.log('price', price)
    this.setData({
      attribute: attribute,
      brand: brand,
      price: price,
      category: category
    })
    this.getGoodsList()
  },

  getGoodsList(){
    let that = this;
    util.request(api.GoodsList, { brand: this.data.brand,category: this.data.category })
    .then(function (res) {
      if (res.errno === 0) {
        that.setData({
          goodsList: res.data
        });
      }
    });
  },

  onEnter(e){
    var value = e.detail.value;
    console.log(value)
  }
})