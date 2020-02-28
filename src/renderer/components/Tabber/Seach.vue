<template>
    <div>
        <a-input-search placeholder="input search text" @search="seach" enterButton /><br />
        <Films v-if="this.tag=='films'" :fil=list tag='main'></Films>
        <Cartoon v-if="this.tag=='cartoon'" :ct=list tag='main'></Cartoon>
        <Fiction v-if="this.tag=='fiction'" :xs=list tag='main'></Fiction>
        <Card v-if="this.tag=='image'" :data='list' tag='image'></Card>
        <Card v-if="this.tag=='video'" :data='list' tag='video'></Card>
        <Artcle v-if="this.tag=='artcle'" :list=list></Artcle>
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
            list:[],//数据数组
            tag:this.$route.query.tag,
        }
    },
    methods:{
        seach(value){
            if (value.includes('/') ||value.includes(' ') ||value.includes('&') ||value.includes('?')) {
                return this.$message.warn('非法字符',5);
            }
            if (this.tag == 'image') {
                this.$axios.get(`${this.$store.state.url}seach/img/${value}`).then((res)=>{
                    if (res.data.code == 0) {
                        this.value='';
                        this.list = res.data.msg;
                    } else {
                        this.$message.warn('飞船上有不明物体,发送失败',5);
                    }
                }).catch((err)=>{
                    this.$message.warn('访问数据时,火星已被大魔王统治',5);
                });
                
            } else if(this.tag == 'video'){
                this.$axios.get(`${this.$store.state.url}seach/mv/${value}`).then((res)=>{
                    if (res.data.code == 0) {
                        this.value='';
                        this.list = res.data.msg;
                    } else {
                        this.$message.warn('飞船上有不明物体,发送失败',5);
                    }
                }).catch((err)=>{
                    this.$message.warn('访问数据时,火星已被大魔王统治',5);
                });
                
            } else if(this.tag == 'artcle'){
                this.$axios.get(`${this.$store.state.url}seach/art/${value}`).then((res)=>{
                    if (res.data.code == 0) {
                        this.value='';
                        this.list = res.data.msg;
                    } else {
                        this.$message.warn('飞船上有不明物体,发送失败',5);
                    }
                }).catch((err)=>{
                    this.$message.warn('访问数据时,火星已被大魔王统治',5);
                });
                
            } else if(this.tag == 'fiction'){
                this.$axios.get('http://api.pingcc.cn/?xsname=' + value).then((res)=>{
                    if (res.data.code == 0) {
                        this.value='';
                        this.list = res.data.list;
                    } else {
                        this.$message.warn('返回数据时,飞船被大魔王劫持了QAQ',5);
                    }
                }).catch((err)=>{
                    this.$message.warn('访问数据时,火星已被大魔王统治',5);
                });
            } else if(this.tag == 'cartoon'){
                this.$axios.get('http://api.pingcc.cn/?mhname=' + value).then((res)=>{
                    if (res.data.code == 0) {
                        this.value='';
                        this.list = res.data.list
                    } else {
                        this.$message.warn('返回数据时,飞船被大魔王劫持了QAQ',5);
                    }
                }).catch((err)=>{
                    this.$message.warn('访问数据时,火星已被大魔王统治',5);
                });

            } else if(this.tag == 'films'){
                this.$axios.get('http://api.pingcc.cn/?ysname=' + value).then((res)=>{
                    if (res.data.code == 0) {
                        this.value='';
                        this.list = res.data.list
                    } else {
                        this.$message.warn('返回数据时,飞船被大魔王劫持了QAQ',5);
                    }
                }).catch((err)=>{
                    this.$message.warn('访问数据时,火星已被大魔王统治',5);
                });

            }
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