<template>
    <div>
        <div class="top">
            <a-avatar :size='100' :src="user_info.head_img" />
            <p>{{user_info.user_name}}</p>
            <p>{{user_info.mottot}}</p>
        </div>
        <div class="info">
            <span>Email:    {{user_info.email}}</span><br>
            <span>QQ:   {{user_info.qq}}</span><br>
            <span>Phone:    {{user_info.cell_phone}}</span>
        </div>
        <!-- 3个功能按钮 -->
        <!-- 清除缓存 退出登陆 修改资料 -->
        <div class="button">
                <a-button type="primary" @click="cache"> Clear the cache </a-button>
                <a-button type="primary" @click="goland" v-if="!is_land"> Landing </a-button>
                <a-button type="dashed"  @click="exit" v-if="is_land"> Exit </a-button>
                <a-button type="primary" @click="change" v-if="is_land"> Modify the data </a-button>
        </div>
        <!-- 分页 -->
        <a-tabs v-if="is_land" defaultActiveKey="1">
            <a-tab-pane key="1">
                <span slot="tab">
                   <a-icon type="play-circle" />
                    Films
                </span>
                <Films :fil=user_film tag='user'></Films>
            </a-tab-pane>
            <a-tab-pane key="2">
                <span slot="tab">
                    <a-icon type="layout" />
                    Cartoon
                </span>
                <Cartoon :ct=user_cart tag='user'></Cartoon>
            </a-tab-pane>
            <a-tab-pane key="3">
                <span slot="tab">
                    <a-icon type="book" />
                    Fiction
                </span>
                <Fiction :xs=user_fict tag='user'></Fiction>
            </a-tab-pane>
            <a-tab-pane key="4">
                <span slot="tab">
                    <a-icon type="picture" />
                    Image
                </span>
                <Card :data='user_img' tag='image'></Card>
            </a-tab-pane>
            <a-tab-pane key="5">
                <span slot="tab">
                    <a-icon type="video-camera" />
                    Video
                </span>
                <Card :data='user_mv' tag='video'></Card>
            </a-tab-pane>
            <a-tab-pane key="6">
                <span slot="tab">
                    <a-icon type="read" />
                    Artcle
                </span>
                <Artcle :list=user_art></Artcle>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>
<script>
import Card from '../Tool/Card'
import Fiction from '../Tool/Fiction'
import Cartoon from '../Tool/Cartoon'
import Films from '../Tool/Films'
import Artcle from '../Tool/Artcle'
export default {
    data() {
        return {
             user_info:{},
            is_land:false,
            user_img:[],
            user_mv:[],
            user_art:[],
            user_fict:[],
            user_cart:[],
            user_film:[],
        }
    },
    created() {
        this.getuser();
        this.getpublic()
    },
    methods: {
        getuser(){
            if (localStorage.getItem('user')==''||localStorage.getItem('user')==undefined) {
                // 未登录
                this.user_info.head_img = `${this.$store.state.url}headImgs/head.png`;
                this.user_info.user_name = '未登录哦!';
                this.is_land = false;
            }else{
                this.user_info = JSON.parse(this.$store.state.user);
                this.is_land = true;
            }
        },
        getpublic(){
            if (localStorage.getItem('user')==''||localStorage.getItem('user')==undefined) {
               return;
            }else{
                if (localStorage.getItem('userimg')==''||localStorage.getItem('userimg')==undefined) {
                    this.$axios.get(`${this.$store.state.url}user/img/${this.user_info.email}`).then((reslut)=>{
                        if(reslut.data.code == 0){
                        this.user_img = reslut.data.msg;
                        this.$store.commit('changeUserimg',JSON.stringify(reslut.data.msg))
                        }else if(reslut.data.code == 1){
                            this.$message.warn('获取用户发表图片失败  Failed to get user to publish picture',5);
                        }
                    }).catch((err)=>{
                        this.$message.warn('服务器故障    Server failure',5);
                    });
                }else{
                    this.user_img = JSON.parse(this.$store.state.userimg);
                }

                if (localStorage.getItem('unsermv')==''||localStorage.getItem('unsermv')==undefined) {
                    this.$axios.get(`${this.$store.state.url}user/mv/${this.user_info.email}`).then((reslut)=>{
                        if(reslut.data.code == 0){
                        this.user_mv = reslut.data.msg;
                        this.$store.commit('changeUnsermv',JSON.stringify(reslut.data.msg))
                        }else if(reslut.data.code == 1){
                            this.$message.warn('获取用户发表视频失败  Failed to get user to publish video',5);
                        }
                    }).catch((err)=>{
                        this.$message.warn('服务器故障    Server failure',5);
                    });
                }else{
                    this.user_mv = JSON.parse(this.$store.state.unsermv);
                }

                if (localStorage.getItem('userart')==''||localStorage.getItem('userart')==undefined) {
                    this.$axios.get(`${this.$store.state.url}user/artcle/${this.user_info.email}`).then((reslut)=>{
                        if(reslut.data.code == 0){
                        this.user_art = reslut.data.msg;
                        this.$store.commit('changeUserart',JSON.stringify(reslut.data.msg))
                        }else if(reslut.data.code == 1){
                            this.$message.warn('获取用户发表文章失败  Failed to get the user to publish the article',5);
                        }
                    }).catch((err)=>{
                        this.$message.warn('服务器故障    Server failure',5);
                    });
                }else{
                    this.user_art = JSON.parse(this.$store.state.userart);
                }
                
                if (localStorage.getItem('userfict')==''||localStorage.getItem('userfict')==undefined) {
                    this.$axios({
                        method:'get',
                        url:`${this.$store.state.url}user/fict/${this.user_info.email}`,
                    }).then((reslut)=>{
                        if(reslut.data.code == 0){
                        this.user_fict = reslut.data.msg;
                        this.$store.commit('changeUserfict',JSON.stringify(reslut.data.msg))
                        }else if(reslut.data.code == 1){
                            this.$message.warn('获取天书阁失败    Failed to obtain tianshu pavilion',5);
                        }
                    }).catch((err)=>{
                        this.$message.warn('服务器故障    Server failure',5);
                    });
                }else{
                    this.user_fict = JSON.parse(this.$store.state.userfict);
                }
                
                if (localStorage.getItem('usercart')==''||localStorage.getItem('usercart')==undefined) {
                    this.$axios({
                        method:'get',
                        url:`${this.$store.state.url}user/cart/${this.user_info.email}`,
                    }).then((reslut)=>{
                        if(reslut.data.code == 0){
                        this.user_cart = reslut.data.msg;
                        this.$store.commit('changeUsercart',JSON.stringify(reslut.data.msg))
                        }else if(reslut.data.code == 1){
                            this.$message.warn('获取漫天阁失败    Get all over the sky failed',5);
                        }
                    }).catch((err)=>{
                        this.$message.warn('服务器故障    Server failure',5);
                    });
                }else{
                    this.user_cart = JSON.parse(this.$store.state.usercart);
                }

                if (localStorage.getItem('userfilm')==''||localStorage.getItem('userfilm')==undefined) {
                    this.$axios({
                        method:'get',
                        url:`${this.$store.state.url}user/film/${this.user_info.email}`,
                    }).then((reslut)=>{
                        if(reslut.data.code == 0){
                        this.user_cart = reslut.data.msg;
                        this.$store.commit('changeUserfilm',JSON.stringify(reslut.data.msg))
                        }else if(reslut.data.code == 1){
                            this.$message.warn('获取暗影阁失败    Failed to gain shadow pavilion',5);
                        }
                    }).catch((err)=>{
                        this.$message.warn('服务器故障    Server failure',5);
                    });
                }else{
                    this.user_film = JSON.parse(this.$store.state.userfilm);
                }
            }
        },
        goland(){
            this.$router.push('/load')
        },
        exit(){
            this.$store.commit('changeToken',{token:''});
            this.$store.commit('changeUser','');
            this.$store.commit('changeUserimg','');
            this.$store.commit('changeUnsermv','');
            this.$store.commit('changeUserart','');
            this.$store.commit('changeUserfict','');
            this.$store.commit('changeUsercart','');
            this.$store.commit('changeUserfilm','');
            this.$router.push('/load')
        },
        cache(){
            this.$store.commit('changeHomeimg','');
            this.$store.commit('changeHomemv','');
            this.$store.commit('changeImg','');
            this.$store.commit('changeMv','');
            this.$store.commit('changeArt','');
            this.$store.commit('changeFict','');
            this.$store.commit('changeCart','');
            this.$store.commit('changeFilm','');
            this.$store.commit('changeUserimg','');
            this.$store.commit('changeUnsermv','');
            this.$store.commit('changeUserart','');
            this.$store.commit('changeUserfict','');
            this.$store.commit('changeUsercart','');
            this.$store.commit('changeUserfilm','');
        },
        change(){
            this.$router.push('/change');
        },
    },
    components:{
        Card,
        Fiction,
        Cartoon,
        Films,
        Artcle,
    }
}
</script>
<style lang="less" scoped>
.top{
    text-align: center;
    p{
        margin: 1rem 0 0 0;
    }
    :nth-child(2){
        font-size: 2.5rem;
        line-height: 2.5rem;
        font-weight: 700;
        color: #333;
    }
    :nth-child(3){
        font-size: 1.5rem;
        line-height: 1.5rem;
        font-weight: 600;
        color: #555;
    }
}
.button{
    text-align: center;
    margin: 30px 0;
    *{
        margin-left: 15px;
    }
}
.info{
    margin-top: 20px;
    text-align: center;
    span{
        font-size: 18px;
        color: #666;
    }
}
</style>