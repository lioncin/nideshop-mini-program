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
    fenlei:["食品礼盒","家用电器","家纺礼品","创意数码","家具百货","商务礼品","汽车户外","潮牌箱包","个护清洁","户外活动","母婴玩具"],
    indicatorDots: true,
    autoplay: false, // 可设置为true实现自动播放
    interval: 3000,
    circular: true,
    imageList: [
      { src: 'https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/SAD1.png' },
      { src: 'https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/SAD2.png' },
      { src: 'https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/SAD3.png' }
    ],

    cagetory: [{
      "id":"1","name":"年货节","url":"https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/ssicon1.png"
    },{
      "id":"2","name":"女神精选","url":"https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/ssicon2.png"
    },{
      "id":"3","name":"开门红","url":"https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/ssicon3.png"
    },{
      "id":"4","name":"促销礼赠","url":"https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/ssicon4.png"
    },{
      "id":"5","name":"伴手礼盒","url":"https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/ssicon5.png"
    },{
      "id":"6","name":"商务套装","url":"https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/ssicon6.png"
    },{
      "id":"7","name":"阳光慧采","url":"https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/ssicon7.png"
    },{
      "id":"8","name":"代发专区","url":"https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/ssicon8.png"
    },{
      "id":"9","name":"暖冬好物","url":"https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/ssicon9.png"
    },{
      "id":"10","name":"国铁商城","url":"https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/ssicon10.png"
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
      "url":"https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/brand7.png"
    },{
      "id":2,
      "name":"臻味",
      "url":"https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/brand8.png"
    },{
      "id":3,
      "name":"笨笨马",
      "url":"https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/brand9.png"
    },{
      "id":4,
      "name":"卓朗",
      "url":"https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/brand4.png"
    },{
      "id":5,
      "name":"西屋",
      "url":"https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/brand5.png"
    },{
      "id":6,
      "name":"九阳",
      "url":"https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/brand6.png"
    },{
      "id":7,
      "name":"戴森",
      "url":"https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/brand3.png"
    },{
      "id":8,
      "name":"膳魔师",
      "url":"https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/brand2.png"
    },{
      "id":9,
      "name":"飞利浦",
      "url":"https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/brand1.png"
    }],
    searchPrice1:0,
    searchPrice2:0,
    goods:[{
      "id":1,
      "name":"AAA",
      "url":'https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/nuandong.png',
      "subItems":[{
        "id":11,
        "name":"AAA",
        "price":100,
        "url":'https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/boluodihai/4.%E6%B3%A2%E7%BD%97%E7%9A%84%E6%B5%B7/24.%E6%B3%A2%E7%BD%97%E5%95%A4%E9%85%92%E8%AF%A6%E6%83%85%E5%9B%BE/1.%E6%8D%B7%E5%85%8B%E7%86%8A%EF%BC%88%E6%9C%AA%E8%BF%87%E6%BB%A4%EF%BC%89%E9%B2%9C%E5%95%A4%E9%85%92%20%20%201.35l/1.jpg'
      },{
        "id":12,
        "name":"AAA",
        "price":100,
        "url":'https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/boluodihai/4.%E6%B3%A2%E7%BD%97%E7%9A%84%E6%B5%B7/24.%E6%B3%A2%E7%BD%97%E5%95%A4%E9%85%92%E8%AF%A6%E6%83%85%E5%9B%BE/1.%E6%8D%B7%E5%85%8B%E7%86%8A%EF%BC%88%E6%9C%AA%E8%BF%87%E6%BB%A4%EF%BC%89%E9%B2%9C%E5%95%A4%E9%85%92%20%20%201.35l/1.jpg'
      }]
    },{
      "id":1,
      "name":"AAA",
      "url":'https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/nuandong.png',
      "subItems":[{
        "id":11,
        "name":"AAA",
        "price":100,
        "url":'https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/boluodihai/4.%E6%B3%A2%E7%BD%97%E7%9A%84%E6%B5%B7/24.%E6%B3%A2%E7%BD%97%E5%95%A4%E9%85%92%E8%AF%A6%E6%83%85%E5%9B%BE/1.%E6%8D%B7%E5%85%8B%E7%86%8A%EF%BC%88%E6%9C%AA%E8%BF%87%E6%BB%A4%EF%BC%89%E9%B2%9C%E5%95%A4%E9%85%92%20%20%201.35l/1.jpg'
      },{
        "id":12,
        "name":"AAA",
        "price":100,
        "url":'https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/boluodihai/4.%E6%B3%A2%E7%BD%97%E7%9A%84%E6%B5%B7/24.%E6%B3%A2%E7%BD%97%E5%95%A4%E9%85%92%E8%AF%A6%E6%83%85%E5%9B%BE/1.%E6%8D%B7%E5%85%8B%E7%86%8A%EF%BC%88%E6%9C%AA%E8%BF%87%E6%BB%A4%EF%BC%89%E9%B2%9C%E5%95%A4%E9%85%92%20%20%201.35l/1.jpg'
      }]
    }]
  },
  onCategoryClick(e) {
    const index = e.currentTarget.dataset.index;
    const selectedCategory = this.data.fenlei[index];
    
    // 在这里可以添加点击分类后的逻辑，例如跳转到对应分类的页面或执行其他操作
    console.log('点击了分类:', selectedCategory);
  },

  onInput(e){ //输入框的输入事件
    this.setData({
      keyword:e.detail.value
    })
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
        that.setData({
          newGoods: res.data.newGoodsList,
          hotGoods: res.data.hotGoodsList,
          topics: res.data.topicList,
          brand: res.data.brandList,
          floorGoods: res.data.categoryList,
          banner: res.data.banner,
          channel: res.data.channel
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
