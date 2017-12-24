var Api = require('../../utils/api.js');
var util = require('../../utils/util.js');
var wxApi = require('../../es6-promise/utils/wxApi.js')
var wxRequest = require('../../es6-promise/utils/wxRequest.js')

Page({
  data: {
    text: "Page topic",
    categoriesList: {},
    floatDisplay: "none"
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '前端学堂-教程',
      success: function (res) {
        // success
      }
    });
    wx.showLoading({
      title: '正在加载',
      mask: true
    })


    this.fetchCategoriesData();
  },
  //获取分类列表
  fetchCategoriesData: function () {
    var self = this;
    self.setData({
      categoriesList: []
    });

    var getCategoriesRequest = wxRequest.getRequest(Api.getCategories());

    getCategoriesRequest.then(response => {
      self.setData({
        floatDisplay: "block",
        categoriesList: self.data.categoriesList.concat(response.data.map(function (item) {
          if (typeof (item.category_thumbnail_image) == "undefined" || item.category_thumbnail_image == "") {
            item.category_thumbnail_image = "../../images/website.png";
          }
          if (item.name.indexOf("教程") > 0) {
            item.hot = true;
          }
          return item;
        }).sort((a, b) => {
          return b.name.indexOf("教程") > 0;
        })),
      });
      setTimeout(function () {
        wx.hideLoading();
      }, 900)
      wx.hideNavigationBarLoading();;
    })
  },

  onShareAppMessage: function () {
    return {
      title: '前端学堂FED123 - 进阶学习教程',
      path: 'pages/topic/topic',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  //跳转至某分类下的文章列表
  redictIndex: function (e) {
    //console.log('查看某类别下的文章');  
    var id = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.item;
    var url = '../list/list?categoryID=' + id;
    wx.navigateTo({
      url: url
    });
  }

})