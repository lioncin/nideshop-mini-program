const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');

//获取应用实例
const app = getApp()
Page({
  data: {
    goodsCount: 0,
    newGoods: [],
    hotGoods: [],
    topics: [],
    floorGoods: [],
    banner: [],
    channel: [],
    keyword: '', //搜索的关键字，
    fenlei:[
      {
        "id":10,"name":"食品礼盒"
      },{
        "id":7,"name":"家用电器"
      },{
        "id":6,"name":"家纺礼品"
      },{
        "id":5,"name":"创意数码"
      },{
        "id":8,"name":"家具百货"
      },{
        "id":2,"name":"商务礼品"
      },{
        "id":3,"name":"汽车户外"
      },{
        "id":4,"name":"潮牌箱包"
      },{
        "id":9,"name":"个护清洁"
      },{
        "id":11,"name":"户外活动"
      },{
        "id":12,"name":"母婴玩具"
      }
      ],
    indicatorDots: true,
    autoplay: false, // 可设置为true实现自动播放
    interval: 3000,
    circular: true,
    imageList: [
      { src: 'https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/SAD1.png' },
      { src: 'https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/SAD2.png' },
      { src: 'https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/SAD3.png' }
    ],

    category: [{
      "id":"1","name":"年货节","url":"https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/ssicon1.png","category":1005002
    },{
      "id":"2","name":"女神精选","url":"https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/ssicon2.png","category":1005002
    },{
      "id":"3","name":"开门红","url":"https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/ssicon3.png","category":1005002
    },{
      "id":"4","name":"促销礼赠","url":"https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/ssicon4.png","category":1005002
    },{
      "id":"5","name":"伴手礼盒","url":"https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/ssicon5.png","category":1005002
    },{
      "id":"6","name":"商务套装","url":"https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/ssicon6.png","category":1005002
    },{
      "id":"7","name":"阳光慧采","url":"https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/ssicon7.png","category":1005002
    },{
      "id":"8","name":"代发专区","url":"https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/ssicon8.png","category":1005002
    },{
      "id":"9","name":"暖冬好物","url":"https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/ssicon9.png","category":1005002
    },{
      "id":"10","name":"国铁商城","url":"https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/ssicon10.png","category":1005002
    }],

    priceOptions:['1-20','20-40','40-60','60-80','80-100','100-200','200-500','500-800','800-1000','1000-1500','1500-2000','>2000'],
    brandList:[
      {
        "id":1,"name":"xxxx","url":"https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/TBRAND1.png"
      },
      {
        "id":2,"name":"xxxx","url":"https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/TBRAND2.png"
      },
      {
        "id":3,"name":"xxxx","url":"https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/TBRAND3.png"
      }
    ],
    brands:[{
      "id":1,
      "name":"中粮",
      "url":"https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/brand7.png","category":1005002
    },{
      "id":2,
      "name":"臻味",
      "url":"https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/brand8.png","category":1005002
    },{
      "id":3,
      "name":"笨笨马",
      "url":"https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/brand9.png","category":1005002
    },{
      "id":4,
      "name":"卓朗",
      "url":"https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/brand4.png","category":1005002
    },{
      "id":5,
      "name":"西屋",
      "url":"https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/brand5.png","category":1005002
    },{
      "id":6,
      "name":"九阳",
      "url":"https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/brand6.png","category":1005002
    },{
      "id":7,
      "name":"戴森",
      "url":"https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/brand3.png","category":1005002
    },{
      "id":8,
      "name":"膳魔师",
      "url":"https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/brand2.png","category":1005002
    },{
      "id":9,
      "name":"飞利浦",
      "url":"https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/brand1.png","category":1005002
    }],
    searchPrice1:0,
    searchPrice2:0,
    goods:[{
      "id":0,
      "url":'https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/nuandong.png',
      "subItems":[]
    },{
      "id":1,
      "url":'https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/kaimenhong.png',
      "subItems":[]
    },{
      "id":2,
      "url":'https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/nvshenjie.png',
      "subItems":[]
    },{
      "id":3,
      "url":'https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/shipinlihe.png',
      "subItems":[]
    },{
      "id":4,
      "url":'https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/chuanyishuma.png',
      "subItems":[]
    },{
      "id":5,
      "url":'https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/shangwulipin.png',
      "subItems":[]
    },{
      "id":6,
      "url":'https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/qichelipin.png',
      "subItems":[]
    },{
      "id":7,
      "url":'https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/chaopai.png',
      "subItems":[]
    },{
      "id":8,
      "url":'https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/jiayong.png',
      "subItems":[]
    }]
  },
  togoods3(e){
    const index = e.currentTarget.dataset.index;
    console.log(index)
  },
  toGoods2(e){
    const index = e.currentTarget.dataset.index;
    console.log(index)
  },
  toGoods(e){
    const index = e.currentTarget.dataset.index;
    wx.switchTab({
      url: '/pages/allgoods/allgoods?attribute='+index
    })
  },
  onCategoryClick(e) {
    const index = e.currentTarget.dataset.index;
    const selectedCategory = this.data.fenlei[index];
    
    wx.switchTab({
      url: '/pages/allgoods/allgoods?category='+index
    })    
  },

  onEnter(e){
    var value = e.detail.value;
    console.log(value)
    wx.navigateTo({  
      url: '/pages/search/search?query=' + value,
    });
  },
  onShareAppMessage: function () {
    return {
      title: 'NideShop',
      desc: '微信小程序商城',
      path: '/pages/index/index'
    }
  },

  onInputPrice1: function(e){
    this.setData({
      searchPrice1:e.detail.value
    })
  },

  onInputPrice2: function(e){
    this.setData({
      searchPrice2:e.detail.value
    })
  },

  getIndexData: function () {
    let that = this;
    util.request(api.IndexUrl).then(function (res) {
      if (res.errno === 0) {
        let dt = res.data;
        that.data.goods[0]['subItems'] = dt['nuandong']
        that.data.goods[1]['subItems'] = dt['kaimen']
        that.data.goods[2]['subItems'] = dt['nvshen']
        that.data.goods[3]['subItems'] = dt['shipin']
        that.data.goods[4]['subItems'] = dt['chuangyi']
        that.data.goods[5]['subItems'] = dt['shangwu']
        that.data.goods[6]['subItems'] = dt['qiche']
        that.data.goods[7]['subItems'] = dt['chaopai']
        that.data.goods[8]['subItems'] = dt['jiayong']
        that.setData({
          goods: that.data.goods
        });
      }
    });
  },
  onLoad: function (options) {
    this.getIndexData();
    util.request(api.GoodsCount).then(res => {
      this.setData({
        goodsCount: res.data.goodsCount
      });
    });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
})
