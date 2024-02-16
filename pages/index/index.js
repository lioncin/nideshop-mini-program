const util = require("../../utils/util.js");
const api = require("../../config/api.js");
const user = require("../../services/user.js");

//获取应用实例
const app = getApp();
Page({
  data: {
    goodsCount: 0,
    newGoods: [],
    hotGoods: [],
    topics: [],
    floorGoods: [],
    banner: [],
    channel: [],
    keyword: "", //搜索的关键字，
    fenlei: [
      {
        id: 10,
        name: "食品礼盒",
      },
      {
        id: 7,
        name: "家用电器",
      },
      {
        id: 6,
        name: "家纺礼品",
      },
      {
        id: 5,
        name: "创意数码",
      },
      {
        id: 8,
        name: "家具百货",
      },
      {
        id: 2,
        name: "商务礼品",
      },
      {
        id: 3,
        name: "汽车户外",
      },
      {
        id: 4,
        name: "潮牌箱包",
      },
      {
        id: 9,
        name: "个护清洁",
      },
      {
        id: 11,
        name: "户外活动",
      },
      {
        id: 12,
        name: "母婴玩具",
      },
    ],
    indicatorDots: true,
    autoplay: false, // 可设置为true实现自动播放
    interval: 3000,
    circular: true,
    imageList: [],

    attributes: [
      {
        id: "1",
        name: "年货",
        url: "https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/ssicon1.png",
        attribute: "年货节",
      },
      {
        id: "2",
        name: "女神",
        url: "https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/ssicon2.png",
        attribute: "女神精选",
      },
      {
        id: "3",
        name: "开门红",
        url: "https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/ssicon3.png",
        attribute: "开门红",
      },
      {
        id: "4",
        name: "促销",
        url: "https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/ssicon4.png",
        attribute: "促销礼赠",
      },
      {
        id: "5",
        name: "伴手",
        url: "https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/ssicon5.png",
        attribute: "伴手礼盒",
      },
      {
        id: "6",
        name: "商务",
        url: "https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/ssicon6.png",
        attribute: "商务套装",
      },
      {
        id: "7",
        name: "阳光",
        url: "https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/ssicon7.png",
        attribute: "阳光慧采",
      },
      {
        id: "8",
        name: "代发",
        url: "https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/ssicon8.png",
        attribute: "代发专区",
      },
      {
        id: "9",
        name: "暖冬",
        url: "https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/ssicon9.png",
        attribute: "暖冬好物",
      },
      {
        id: "10",
        name: "国铁",
        url: "https://qifucai-1256200318.cos.ap-nanjing.myqcloud.com/ADD/ssicon10.png",
        attribute: "国铁商城",
      },
    ],

    priceOptions: [
      "1-20",
      "20-40",
      "40-60",
      "60-80",
      "80-100",
      "100-200",
      "200-500",
      "500-800",
      "800-1000",
      "1000-1500",
      "1500-2000",
      ">2000",
    ],
    brandList: [
      {
        id: 1,
        name: "xxxx",
        url: "http://cdn.weilf.cn/Contents/site1/202304/62041cc186e44cc38202cddba5aafbd3.jpg",
      },
      {
        id: 2,
        name: "xxxx",
        url: "http://cdn.weilf.cn/Contents/site1/202311/slide_55e15cc5d8964442abf8cda1d6954013.jpeg",
      },
      {
        id: 3,
        name: "xxxx",
        url: "http://cdn.weilf.cn/Contents/site1/202305/33b5b782187e45b380f3ff5fe9e03a01.jpg",
      },
    ],
    brands: [],
    searchPrice1: 0,
    searchPrice2: 0,
    goods: [
      {
        id: 0,
        url: "http://cdn.weilf.cn/Contents/site1/202310/81ada9d1d0b4426eb112cc722e85bd4d.jpg",
        subItems: [],
      },
      {
        id: 1,
        url: "http://cdn.weilf.cn/Contents/site1/202309/8ce219c96bf14f6d8a9da2abec55452b.jpg",
        subItems: [],
      },
      {
        id: 2,
        url: "http://cdn.weilf.cn/Contents/site1/202401/e3968d84515e45bd869b8b28c2ad80c8.jpg",
        subItems: [],
      },
      {
        id: 3,
        url: "http://cdn.weilf.cn/Contents/site1/202305/74caff96b83344d3b40f944576b71e1f.jpg",
        subItems: [],
      },
      {
        id: 4,
        url: "http://cdn.weilf.cn/Contents/site1/202305/ffbd3cafdf2642648e3fc4e4074ed906.jpg",
        subItems: [],
      },
      {
        id: 5,
        url: "http://cdn.weilf.cn/Contents/site1/202305/69192b5c02f7449bae3097de9308c0c8.jpg",
        subItems: [],
      },
      {
        id: 6,
        url: "http://cdn.weilf.cn/Contents/site1/202311/category_daee3333250e401098d2d5e3be04d0d7.jpg",
        subItems: [],
      },
      {
        id: 7,
        url: "http://cdn.weilf.cn/Contents/site1/202305/2b8cc25b56664562a6a5fdc64899c731.jpg",
        subItems: [],
      },
      {
        id: 8,
        url: "http://cdn.weilf.cn/Contents/site1/202305/e4615345bb1a4cc4bee4ef1fa15d8449.jpg",
        subItems: [],
      },
    ],
  },
  togoods3(e) {
    wx.removeStorageSync("price");
    wx.removeStorageSync("brand");
    wx.removeStorageSync("attribute");
    wx.removeStorageSync("category");
    wx.removeStorageSync("keyword");
    const index = e.currentTarget.dataset.index;
    wx.setStorageSync("brand", index);
    wx.switchTab({
      url: "/pages/allgoods/allgoods",
    });
  },
  toPrice(e) {
    wx.removeStorageSync("price");
    wx.removeStorageSync("brand");
    wx.removeStorageSync("attribute");
    wx.removeStorageSync("category");
    wx.removeStorageSync("keyword");
    const index = e.currentTarget.dataset.index;
    wx.setStorageSync("price", index);
    wx.switchTab({
      url: "/pages/allgoods/allgoods",
    });
  },
  toAttribute(e) {
    wx.removeStorageSync("price");
    wx.removeStorageSync("brand");
    wx.removeStorageSync("attribute");
    wx.removeStorageSync("category");
    wx.removeStorageSync("keyword");
    const name = e.currentTarget.dataset.name;
    wx.setStorageSync("attribute", name);
    wx.switchTab({
      url: "/pages/allgoods/allgoods",
    });
  },
  onCategoryClick(e) {
    wx.removeStorageSync("price");
    wx.removeStorageSync("brand");
    wx.removeStorageSync("attribute");
    wx.removeStorageSync("category");
    wx.removeStorageSync("keyword");
    const index = e.currentTarget.dataset.index;
    wx.setStorageSync("category", index);
    wx.switchTab({
      url: "/pages/allgoods/allgoods",
    });
  },

  onEnter(e) {
    wx.removeStorageSync("price");
    wx.removeStorageSync("brand");
    wx.removeStorageSync("attribute");
    wx.removeStorageSync("category");
    wx.removeStorageSync("keyword");
    var value = e.detail.value;
    wx.setStorageSync("keyword", value);
    wx.switchTab({
      url: "/pages/allgoods/allgoods",
    });
  },
  onShareAppMessage: function () {
    return {
      title: "企福采",
      desc: "微信小程序商城",
      path: "/pages/index/index",
    };
  },

  onInputPrice1: function (e) {
    this.setData({
      searchPrice1: e.detail.value,
    });
  },

  onInputPrice2: function (e) {
    this.setData({
      searchPrice2: e.detail.value,
    });
  },

  getIndexData: function () {
    let that = this;
    util.request(api.IndexUrl).then(function (res) {
      if (res.errno === 0) {
        let dt = res.data;
        that.data.goods[0]["subItems"] = dt["nuandong"];
        that.data.goods[1]["subItems"] = dt["kaimen"];
        that.data.goods[2]["subItems"] = dt["nvshen"];
        that.data.goods[3]["subItems"] = dt["shipin"];
        that.data.goods[4]["subItems"] = dt["chuangyi"];
        that.data.goods[5]["subItems"] = dt["shangwu"];
        that.data.goods[6]["subItems"] = dt["qiche"];
        that.data.goods[7]["subItems"] = dt["chaopai"];
        that.data.goods[8]["subItems"] = dt["jiayong"];
        that.setData({
          brands: dt["brands"],
          goods: that.data.goods,
          imageList: dt['ads']
        });
      }
    });
  },
  onLoad: function (options) {
    this.getIndexData();
    util.request(api.GoodsCount).then((res) => {
      this.setData({
        goodsCount: res.data.goodsCount,
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
});
