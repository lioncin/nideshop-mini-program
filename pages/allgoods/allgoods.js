const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');

const app = getApp()

Page({
  data:{
    keyword: '', //搜索的关键字，
    category: 0, //分类
    Attribute: 0, //类型
    brand: 0,   //品牌
    goodsList:[]
  },
  
  onLoad: function (options) {
    this.getGoodsList()
  },

  getGoodsList(){
    let that = this;
    // util.request(api.GoodsList, { keyword: this.data.keyword, categoryId:this.data.category,Attribute:this.data.Attribute,brandId: this.data.brand,page:1,size:100,order:'price',sort:'asc' }).then(function (res) {
    //   console.log(res)
    // })

    util.request(api.GoodsList, { brandId: that.data.id, page: that.data.page, size: that.data.size})
    .then(function (res) {
      if (res.errno === 0) {
        console.log(res.data)
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