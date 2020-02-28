<template>
    <div>
        <Cartoon :ct=ct_list tag='main'></Cartoon>
        <a-button type="primary" @click="go('before')"> <a-icon type="left" /> The previous page </a-button>
        <a-button type="primary" @click="go('next')"> The next page <a-icon type="right" /> </a-button>
    </div>
</template>
<script>
import Cartoon from '../Tool/Cartoon'
export default {
    data() {
      return {
        sta_ct:0,
        num:20,
        ct_list:[],
      };
    },
    created() {
        this.getmsg()
    },
    methods:{
        getmsg(){
            if (localStorage.getItem('cart')==''||localStorage.getItem('cart')==undefined) {
                // /video/getvideos/:sta/:num
                this.$axios.get(`${this.$store.state.url}subsidiary/getart/cartoon/${this.sta_ct}/${this.num}`).then((reslut)=>{
                    if(reslut.data.code == 0){
                        this.$store.commit('changeCart',JSON.stringify(reslut.data.msg))
                        this.ct_list = reslut.data.msg;
                    }else if(reslut.data.code == 1){
                        this.$message.warn('访问数据时,我们迷路了',5);
                    }
                }).catch((err)=>{
                    this.$message.warn('访问数据时,它已经远走高飞了',5);
                })
            }else{
                this.ct_list = JSON.parse(localStorage.getItem('cart'));
            }

        },
        go(tag){
            if (tag == 'before') {
                if(this.sta_ct == 0) return this.$message.success('已经到顶了',5,);;
                this.sta_ct -= 2;
                this.$axios.get(`${this.$store.state.url}subsidiary/getart/cartoon/${this.sta_ct}/${this.num}`).then((reslut)=>{
                    if(reslut.data.code == 0){
                        this.ct_list = reslut.data.msg;
                        this.loading = false;
                        
                    }else if(reslut.data.code == 1){
                        this.$message.warn('加载失败',5,);
                    }
                }).catch((err)=>{
                    this.$message.warn('访问服务器失败',5,);
                })
            }else{
                if(this.end == true) return this.$message.success('已经没有了',5,);;
                this.sta_ct += 2;
                this.$axios.get(`${this.$store.state.url}subsidiary/getart/cartoon/${this.sta_ct}/${this.num}`).then((reslut)=>{
                    if(reslut.data.code == 0){
                        if (reslut.data.msg == '') {
                            this.sta_ct -= 2;
                            return this.end = true;
                        }
                        this.ct_list = reslut.data.msg;
                        this.loading = false;
                        
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
        Cartoon
    }
}
</script>