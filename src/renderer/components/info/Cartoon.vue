<template>
  <div>
      <fan></fan>
    <div class="wrap">
      <img :src="info.cover" alt="">
       <div class="info">
            <h4>{{info.name}}</h4>
            <h6>{{info.author}}</h6>
            <h6>{{info.tag}}</h6>
            <h6>{{info.time}}</h6>
        </div>
        <a-divider>漫画简介:</a-divider>
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
            <router-link v-for="(item, index) in list" :key="index" 
            :to="'/cart?url='+item.url+'&shelf=false'" tag="span">{{item.num}}</router-link>
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
            text:'加入漫天阁',
            isadd:false,
            ismain:true,
            sart:'立即阅读',
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
        getinfo(){
            this.$axios.get('http://api.pingcc.cn/?mhurl1=' + this.url).then((reslut)=>{
                if(reslut.data.code == 0){
                    this.info = reslut.data .data;
                    this.list = reslut.data.list;
                }else if(reslut.data.code == 1){
                    this.$message.warn('漫漫在来的路上迷路了(/▽＼)',5);
                }
            }).catch((err)=>{
                this.$message.warn('漫漫在来的路上被拐跑了。゜゜(´Ｏ`) ゜゜。',5);
            });
        },
        goto(value){
            let url = parseInt(value)-1;
            if(url > this.list.length){
                return this.$message.warn('不存在此章节',5);
            }
            this.$router.push(`/cart?url=${this.list[url].url}&name=${this.info.name}&shelf=${this.isadd}`)
        },
        iffrom(){
            if (this.tag == 'main') {
                return this.sart = '立即阅读';
            }else if (this.tag == 'user') {
                this.sart = '继续阅读';
                this.ismain = false;
                this.changeadd()
            }
        },
        changeadd(){
            if (this.$store.state.user == '') {
                 return this.$message.warn('未登录不可管理漫天阁',5);
            }
            this.isadd = !this.isadd;
            this.text = this.isadd==false?'加入漫天阁':'移出漫天阁'
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
                    url:`${this.$store.state.url}user/addcart`,
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
                        this.$message.success('漫天阁加入成功    All over the sky to join the success',5);
                    }else if(reslut.data.code == 1){
                        this.$message.warn('漫天阁加入失败    The sky to join failure',5);
                    }else if(reslut.data.code == 2){
                        this.$message.warn('漫画已存在    Comics already exist',5);
                    }
                }).catch((err)=>{
                    this.$message.warn('漫天阁水灾    Flood in the sky',5);
                });
           }else{
                if(this.isadd == true) return;
                this.$axios({
                    method:'get',
                    url:`${this.$store.state.url}user/delfict`,
                    params:{
                        name:this.info.name,
                        email:JSON.parse(this.$store.state.user).email,
                    }
                }).then((reslut)=>{
                    if(reslut.data.code == 0){
                        this.$message.warn('撤销漫画成功  Comic strip removed successfully',5);
                    }else if(reslut.data.code == 1){
                        this.$message.warn('撤销漫画失败  Failed to cancel cartoon',5);
                    }
                }).catch((err)=>{
                    this.$message.warn('漫天阁水灾    Flood in the sky',5);
                });
           }
            
        },
        read(){
            if (this.isadd == true) {
                if (this.ismain == true) {
                    //main 点击加入书架后，第一次阅读
                    this.$router.push(`/cart?url=${this.list[0].url}&name=${this.info.name}&shelf=true`)
                }else{
                    this.$axios({
                        method:'get',
                        url:`${this.$store.state.url}user/getfict`,
                        params:{
                            name:this.info.name,
                            email:JSON.parse(this.$store.state.user).email,
                        }
                    }).then((reslut)=>{
                        if(reslut.data.code == 0){
                            if (reslut.data.msg[0].last == null) {
                                //用户点击加入书架后，没有阅读，导致数据库为空
                                this.$router.push(`/cart?url=${this.list[0].url}&name=${this.info.name}&shelf=true`)
                                
                            }else{
                                this.$router.push(`/cart?url=${reslut.data.msg[0].last}&name=${this.info.name}&shelf=true`)
                            }
                        }else if(reslut.data.code == 1){
                            this.$message.warn('获取漫画失败  Failed to get comics',5);
                        }
                    }).catch((err)=>{
                        this.$message.warn('漫天阁水灾    Flood in the sky',5);
                    });
                }
            }else{
                this.$router.push(`/cart?url=${this.list[0].url}&shelf=false`)
            }
          
        },
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
