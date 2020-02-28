<template>
    <div>
        
        <Artcle :list=list></Artcle>
        <a-button type="primary" @click="go('before')"> <a-icon type="left" /> The previous page </a-button>
      <a-button type="primary" @click="go('next')"> The next page <a-icon type="right" /> </a-button>
    </div>
</template>
<script>
import Artcle from '../Tool/Artcle'
export default {
    data() {
      return {
        list:[],
        sta:0,
        num:20,
        end:false,
      };
    },
    created() {
        this.getmsg()
    },
    methods:{
        getmsg(){
            if (localStorage.getItem('art')==''||localStorage.getItem('art')==undefined) {
                //  /getimages/:sta/:num
                this.$axios.get(`${this.$store.state.url}artcle/getart/${this.sta}/${this.num}`).then((reslut)=>{
                    if(reslut.data.code == 0){
                        this.$store.commit('changeArt',JSON.stringify(reslut.data.msg))
                        console.log(reslut.data.msg);
                        
                        this.list = reslut.data.msg;
                    }else if(reslut.data.code == 1){
                        this.$message.warn('访问视频数据时,我们迷路了',5);
                    }
                }).catch((err)=>{
                    this.$message.warn('访问数据时,它已经远走高飞了',5);
                });
            }else{
                this.list = JSON.parse(localStorage.getItem('art'));
            }
        },
        go(tag){
            if (tag == 'before') {
                if(this.sta == 0) return this.$message.success('已经到顶了',5,);;
                this.sta -= 2;
                this.$axios.get(`${this.$store.state.url}artcle/getart/${this.sta}/${this.num}`).then((reslut)=>{
                    if(reslut.data.code == 0){
                        this.list = reslut.data.msg;
                        
                    }else if(reslut.data.code == 1){
                        this.$message.warn('加载失败',5,);
                    }
                }).catch((err)=>{
                    this.$message.warn('访问服务器失败',5,);
                })
            }else{
                if(this.end == true) return this.$message.success('已经没有了',5,);;
                this.sta += 2;
                this.$axios.get(`${this.$store.state.url}artcle/getart/${this.sta}/${this.num}`).then((reslut)=>{
                    if(reslut.data.code == 0){
                        if (reslut.data.msg == '') {
                            this.sta -= 2;
                            return this.end = true;
                        }
                        this.list = reslut.data.msg;
                        
                    }else if(reslut.data.code == 1){
                        this.$message.warn('加载失败',5,);
                    }
                }).catch((err)=>{
                    this.$message.warn('访问服务器失败',5,);
                })
            }
        }
    },
    components:{
        Artcle
    }
}
</script>