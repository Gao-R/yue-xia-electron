import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from '../components/Tabber/Home'
import ImageInfo from '../components/info/Image'
import VideoInfo from '../components/info/Video'
import Image from '../components/Tabber/Image'
import Video from '../components/Tabber/Video'
import Artcle from '../components/Tabber/Artcle'
import Fiction from '../components/Tabber/Fiction'
import Cartoon from '../components/Tabber/Cartoon'
import Films from '../components/Tabber/Films'
import FictionInfo from '../components/info/Fiction'
import Book from '../components/Innder/Book'
import CartoonInfo from '../components/info/Cartoon'
import Cart from '../components/Innder/Cart'
// import FilmsInfo from '../components/info/Films'
import Film from '../components/Innder/Film'
import ArtInfo from '../components/info/Artcle'
import User from '../components/Tabber/User'
import Load from '../components/Tabber/Load'
import Public from '../components/Tabber/Public'
import Seach from '../components/Tabber/Seach'
import ChangeUser from '../components/Tabber/ChangeUser'

export default new Router({
  routes: [
    { path: '/', component: Home },
    { path: '/home', component: Home },
    { path: '/image/:id', component: ImageInfo },
    { path: '/video/:id', component: VideoInfo },
    { path: '/image', component: Image },
    { path: '/video', component: Video },
    { path: '/artcle', component: Artcle },
    { path: '/artcleinfo', component: ArtInfo },
    { path: '/fiction', component: Fiction },
    { path: '/cartoon', component: Cartoon },
    { path: '/films', component: Films },
    { path: '/seach', component: Seach },
    { path: '/fictioninfo', component: FictionInfo },
    { path: '/book', component: Book },
    { path: '/cartoonInfo', component: CartoonInfo },
    { path: '/cart', component: Cart },
    // { path: '/filmsInfo', component: FilmsInfo },
    { path: '/mvinfo', component: Film },
    { path: '/user', component: User },
    { path: '/load', component: Load },
    { path: '/public', component: Public },
    { path: '/change', component: ChangeUser },


    // {
    //   path: '*',
    //   redirect: '/'
    // }
  ]
})
