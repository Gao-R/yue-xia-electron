<template>
    <div>
        <fan></fan>
        <div class="wrap">
            <img :src="info.cover" alt="">
            <div class="info">
                <h4>{{info.name}}</h4>
                <h6>{{info.director}}</h6>
                <h6>{{info.performer}}</h6>
                <h6>{{info.Release}}</h6>
                <h6>{{info.region}}</h6>
                <h6>{{info.Language}}</h6>
                <h6>{{info.time}}</h6>
            </div>
            <a-divider>电影简介:</a-divider>
            <div class="introduce">
                {{info.introduce}}
            </div>
            <div class="but">
                <a-button type="primary" icon="download" size="default" @click="read">{{ sart }}</a-button>
                <a-button type="primary" icon="download" size="default" @click="changeadd">{{ text }}</a-button>
            </div>
            <div style="margin:20px auto;width:40%;">
                <a-input-search  placeholder="input search text" enterButton="Search" @search=goto allowClear />
            </div>
            <div class="more">
                <span v-for="(item, index) in list" :key="index" 
                @click="aa(item.onlineurl)">{{item.num}}</span>
                <!-- <router-link v-for="(item, index) in list" :key="index" 
               :to="'/mvinfo?url='+item.m3u8url+'&name='+info.name+'&shelf='+isadd" >{{item.num}}</router-link> -->
            </div>
        </div>
    </div>
</template>
<script>
import fan from '../Tool/fan'
export default {
    data() {
        return {
            url:this.$route.query.url,
            tag:this.$route.query.tag,
            info:{},
            list:[],
            text:'加入暗影阁',
            isadd:false,
            ismain:true,
            sart:'立即观看',
        }
    },
    created() {
        this.getinfo();
        this.iffrom();
    },
    beforeDestroy() {
        this.add()
    },
    methods: {
        aa(url){
            window.open(url)
        },
        getinfo(){
            this.$axios.get('http://api.pingcc.cn/?ysurl=' + this.url).then((reslut)=>{
                if(reslut.data.code == 0){
                    this.info = reslut.data.data;
                    this.list = reslut.data.list;
                }else if(reslut.data.code == 1){
                    this.$message.warn('小影不小心带错电影了|･ω･｀)',5);
                }
            }).catch((err)=>{
                this.$message.warn('小影的船坏了╮(～▽～)╭',5);
            });
        },
        goto(value){
            let url = parseInt(value)-1;
            if(url > this.list.length){
                return  this.$message.warn('不存在此电影',5);
            }
            this.aa(this.list[url].onlineurl)
            // this.$router.push(`/mvinfo?url=${this.list[url].m3u8url}&name=${this.info.name}&shelf=${this.isadd}`)
        },
        iffrom(){
            if (this.tag == 'main') {
                this.sart = '立即观看';
                return
            }else if (this.tag == 'user') {
                this.sart = '继续观看';
                this.ismain = false;
                this.changeadd()
            }
        },
        changeadd(){
            if (this.$store.state.user == '') {
                 return this.$message.warn('未登录不可管理暗影阁',5);
            }
            this.isadd = !this.isadd;
            this.text = this.isadd==false?'加入暗影阁':'移出暗影阁'
        },
        add(){
            /*
                name
                author
                cover
                time
                url
                email
            */
           if (this.ismain == true) {
                if(this.isadd == false) return;
                this.$axios({
                    method:'get',
                    url:`${this.$store.state.url}user/addfilm`,
                    params:{
                        name:this.info.name,
                        author:this.info.author,
                        cover:this.info.cover,
                        time:this.info.time,
                        url:this.url,
                        email:JSON.parse(this.$store.state.user).email,
                    }
                }).then((reslut)=>{
                    if(reslut.data.code == 0){
                        this.$message.success('加入暗影阁成功    Join shadow pavilion success',5);
                    }else if(reslut.data.code == 1){
                        this.$message.warn('加入暗影阁失败    Failed to join shadow court',5);
                    }else if(reslut.data.code == 2){
                        this.$message.warn('暗影已存在哦  The shadow is already there',5);
                    }
                }).catch((err)=>{
                    this.$message.warn('暗影阁地震    Shadow pavilion earthquake',5);
                });
           }else{
                if(this.isadd == true) return;
                this.$axios({
                    method:'get',
                    url:`${this.$store.state.url}user/delfilm`,
                    params:{
                        name:this.info.name,
                        email:JSON.parse(this.$store.state.user).email,
                    }
                }).then((reslut)=>{
                    if(reslut.data.code == 0){
                        this.$message.warn('撤销暗影阁成功    Cancel shadow pavilion successfully',5);
                    }else if(reslut.data.code == 1){
                        this.$message.warn('撤销暗影阁失败    Failed to undo shadow pavilion',5);
                    }
                }).catch((err)=>{
                    this.$message.warn('暗影阁地震    Shadow pavilion earthquake',5);
                });
           }
            
        },
        read(){
            this.aa(this.list[0].onlineurl)
        },
        // read(){
        //     if (this.isadd == true) {
        //         if (this.ismain == true) {
        //             //main 点击加入书架后，第一次阅读
        //             this.aa(this.list[0].onlineurl)
        //             // this.$router.push(`/mvinfo?url=${this.list[0].m3u8url}&name=${this.info.name}&shelf=true`)
        //         }else{
        //             this.$axios({
        //                 method:'get',
        //                 url:`${this.$store.state.url}user/getfilm`,
        //                 params:{
        //                     name:this.info.name,
        //                     email:JSON.parse(this.$store.state.user).email,
        //                 }
        //             }).then((reslut)=>{
        //                 if(reslut.data.code == 0){
        //                     if (reslut.data.msg[0].last == null) {
        //                         //用户点击加入书架后，没有阅读，导致数据库为空
        //                         this.aa(this.list[0].onlineurl)
        //                         // this.$router.push(`/mvinfo?url=${this.list[0].m3u8url}&name=${this.info.name}&shelf=true`)                                
        //                     }else{
        //                         this.aa(reslut.data.msg[0].last)
        //                         // this.$router.push(`/mvinfo?url=${reslut.data.msg[0].last}&name=${this.info.name}&shelf=true`)
        //                     }
        //                 }else if(reslut.data.code == 1){
        //                     this.$message.warn('获取影视失败  Access failure',5);
        //                 }
        //             }).catch((err)=>{
        //                 this.$message.warn('暗影阁地震    Shadow pavilion earthquake',5);
        //             });
        //         }
        //     }else{
        //         this.aa(this.list[0].onlineurl)
        //         // this.$router.push(`/mvinfo?url=${this.list[0].m3u8url}&shelf=false`)
        //     }
          
        // },
    },
    components:{
        fan,
    }
}
</script>
<style lang="less" scoped>
.wrap{
    margin: 0 auto;
    text-align: center;
    img{
        height: 200px;
    }
    .info{
        margin: 20px 0;
        h4{
            font-size: 20px;
            font-weight: 800;
            color: #000;
        }
        h6{
            font-size: 16px;
            font-weight: 600;
            color: #666;
        }
    }
    .but{
        margin: 20px 0;
    }
    .more{
        width: 70%;
        margin: 20px auto;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        span{
            width: 25%;
            height: 20%;
            margin: 10px 0;
            font-size: 18px;
            font-weight: 600;
            color: #222;
            text-align: center;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
    }
}
</style>
