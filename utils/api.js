/*
 * api
 */

var DOMAIN = "haomou.net";
var HOST_URI = 'https://' + DOMAIN + '/wp-json/wp/v2/';
var HOST_URI_WATCH_LIFE_JSON = 'https://' + DOMAIN + '/wp-json/fed123/v1/';
var BASEHOST = 'https://' + DOMAIN + '/';


module.exports = {

  getDomain: function () {
    return DOMAIN;
  },
  // 获取文章列表数据
  getPosts: function (obj) {
    var url = HOST_URI + 'posts?per_page=6&page=' + obj.page;

    if (obj.categories != 0) {
      url += '&categories=' + obj.categories;
    }
    if (obj.search != '') {
      url += '&search=' + encodeURIComponent(obj.search);
    }
    return url;

  },

  // 获取置顶的文章
  getStickyPosts: function () {
    var url = HOST_URI + 'posts?sticky=true&per_page=5&page=1';
    return url;

  },

  // 获取tag相关的文章列表
  getPostsByTags: function (id, tags) {
    var url = HOST_URI + 'posts?per_page=5&&page=1&exclude=' + id + "&tags=" + tags;

    return url;

  },


  // 获取特定id的文章列表
  getPostsByIDs: function (obj) {
    var url = HOST_URI + 'posts?include=' + obj;

    return url;

  },
  // 获取特定slug的文章内容
  getPostBySlug: function (obj) {
    var url = HOST_URI + 'posts?slug=' + obj;

    return url;

  },
  // 获取内容页数据
  getPostByID: function (id) {

    return HOST_URI + 'posts/' + id;
  },
  // 获取页面列表数据
  getPages: function () {

    return HOST_URI + 'pages';
  },

  // 获取页面列表数据
  getPageByID: function (id, obj) {
    return HOST_URI + 'pages/' + id;
  },
  //获取分类列表
  getCategories: function () {
    var url = '';
    url = HOST_URI + 'categories?per_page=100&orderby=count&order=desc';

    return url
  },
  //获取某个分类信息
  getCategoryByID: function (id) {
    var dd = HOST_URI + 'categories/' + id;
    return HOST_URI + 'categories/' + id;
  },
  //获取评论
  getComments: function (obj) {
    return HOST_URI + 'comments?parent=0&per_page=100&orderby=date&order=desc&post=' + obj.postID + '&page=' + obj.page
  },

  //获取回复
  getChildrenComments: function (obj) {
    var url = HOST_URI + 'comments?parent_exclude=0&per_page=100&orderby=date&order=desc&post=' + obj.postID
    return url;
  },


  //获取最近的30个评论
  getRecentfiftyComments: function () {
    return HOST_URI + 'comments?per_page=30&orderby=date&order=desc'
  },

  //提交评论
  postComment: function () {
    return HOST_URI + 'comments'
  },

  //获取文章的第一个图片地址,如果没有给出默认图片
  getContentFirstImage: function (content) {
    var regex = /<img.*?src=[\'"](.*?)[\'"].*?>/i;
    var arrReg = regex.exec(content);
    var src = "../../images/logo.png";
    if (arrReg) {
      src = arrReg[1];
    }
    return src;
  },

  //获取热点文章
  getTopHotPosts(flag) {
    var url = HOST_URI_WATCH_LIFE_JSON;
    if (flag == 1) {
      url += "medium"
    } else if (flag == 2) {
      url += "medium"
    }

    return url;
  },
   //获取热点文章
  getWorldPosts() {
    var url = BASEHOST;
      url += "medium";
    return url;
  },

  //更新文章浏览数
  updatePageviews(id) {
    var url = HOST_URI_WATCH_LIFE_JSON;
    url += "post/addpageview/" + id;
    return url;
  }

};