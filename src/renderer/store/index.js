import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState } from 'vuex-electron'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  plugins: [
    createPersistedState(),
  ],
  strict: process.env.NODE_ENV !== 'production',
  state: {
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    user: localStorage.getItem('user') ? localStorage.getItem('user') : '',
    time: localStorage.getItem('time') ? localStorage.getItem('time') : '',
    homeimg: localStorage.getItem('homeimg') ? localStorage.getItem('homeimg') : '',
    homemv: localStorage.getItem('homemv') ? localStorage.getItem('homemv') : '',
    img: localStorage.getItem('img') ? localStorage.getItem('img') : '',
    mv: localStorage.getItem('mv') ? localStorage.getItem('mv') : '',
    art: localStorage.getItem('art') ? localStorage.getItem('art') : '',
    fict: localStorage.getItem('fict') ? localStorage.getItem('fict') : '',
    cart: localStorage.getItem('cart') ? localStorage.getItem('cart') : '',
    film: localStorage.getItem('film') ? localStorage.getItem('film') : '',
    userimg: localStorage.getItem('userimg') ? localStorage.getItem('userimg') : '',
    unsermv: localStorage.getItem('unsermv') ? localStorage.getItem('unsermv') : '',
    userart: localStorage.getItem('userart') ? localStorage.getItem('userart') : '',
    url: 'http://123.56.254.73/',
    homeimgs: localStorage.getItem('homeimgs') ? localStorage.getItem('homeimgs') : '',
    userfict: localStorage.getItem('userfict') ? localStorage.getItem('userfict') : '',
    usercart: localStorage.getItem('usercart') ? localStorage.getItem('usercart') : '',
    userfilm: localStorage.getItem('userfilm') ? localStorage.getItem('userfilm') : '',

  },
  mutations: {
    changeToken (state, to) {
      state.token = to.token;
      localStorage.setItem('token', to.token);
    },
    changeUser(state, user){
      state.user = user;
      localStorage.setItem('user', user);
    },
    changeTime(state, time){
      state.time = time;
      localStorage.setItem('time', time);
    },
    changeHomeimg(state, homeimg){
      state.homeimg = homeimg;
      localStorage.setItem('homeimg', homeimg);
    },
    changeHomemv(state, homemv){
      state.homemv = homemv;
      localStorage.setItem('homemv', homemv);
    },
    changeImg(state, img){
      state.img = img;
      localStorage.setItem('img', img);
    },
    changeMv(state, mv){
      state.mv = mv;
      localStorage.setItem('mv', mv);
    },
    changeArt(state, art){
      state.art = art;
      localStorage.setItem('art', art);
    },
    changeUserimg(state, userimg){
      state.userimg = userimg;
      localStorage.setItem('userimg', userimg);
    },
    changeUnsermv(state, unsermv){
      state.unsermv = unsermv;
      localStorage.setItem('unsermv', unsermv);
    },
    changeUserart(state, userart){
      state.userart = userart;
      localStorage.setItem('userart', userart);
    },
    changeFict(state, fict){
      state.fict = fict;
      localStorage.setItem('fict', fict);
    },
    changeCart(state, cart){
      state.cart = cart;
      localStorage.setItem('cart', cart);
    },
    changeFilm(state, film){
      state.film = film;
      localStorage.setItem('film', film);
    },
    changeHomeimgs(state, homeimgs){
      state.homeimgs = homeimgs;
      localStorage.setItem('homeimgs', homeimgs);
    },
    changeUserfict(state, userfict){
      state.userfict = userfict;
      localStorage.setItem('userfict', userfict);
    },
    changeUsercart(state, usercart){
      state.usercart = usercart;
      localStorage.setItem('usercart', usercart);
    },
    changeUserfilm(state, userfilm){
      state.userfilm = userfilm;
      localStorage.setItem('userfilm', userfilm);
    },
  },
})
