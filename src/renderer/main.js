import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import moment from 'moment'
moment.locale('zh-cn');   
Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})
import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
Vue.use(VideoPlayer)


import {Layout,Menu,Button,Icon,Row,Col,Card,message,Divider,Avatar,List,Pagination,Input,Tabs,Comment,Affix,Upload,Modal,BackTop} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'
Vue.use(Button);
Vue.use(Menu);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Card);
Vue.use(Col);
Vue.prototype.$message = message;
Vue.use(Divider);
Vue.use(Avatar);
Vue.use(List);
Vue.use(Pagination);
Vue.use(Input);
Vue.use(Tabs);
Vue.use(Comment);
Vue.use(Affix);
Vue.use(Upload);
Vue.use(Modal);
Vue.use(BackTop);
// Vue.use(Modal);
// Vue.use(Modal);
// Vue.use(Modal);

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.axios = Vue.prototype.$axios = axios
Vue.config.productionTip = false

axios.interceptors.request.use(
  config => {
    if(config.url.includes('/user/info')||config.url.includes('/published')){
      if (localStorage.getItem('token')) {
        config.headers.token = localStorage.getItem('token');
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
