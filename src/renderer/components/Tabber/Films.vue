<template>
    <div>
        <Films :fil=fil_list tag='main'></Films>
        <a-button type="primary" @click="go('before')"> <a-icon type="left" /> The previous page </a-button>
        <a-button type="primary" @click="go('next')"> The next page <a-icon type="right" /> </a-button>
    </div>
</template>
<script>
import Films from '../Tool/Films'
export default {
    data() {
      return {
        sta_fil:0,
        num:20,
        fil_list:[],
      };
    },
    created() {
        this.getmsg()
    },
    methods:{
        getmsg(){
            if (localStorage.getItem('film')==''||localStorage.getItem('film')==undefined) {
                // /video/getvideos/:sta/:num
                this.$axios.get(`${this.$store.state.url}subsidiary/getart/films/${this.sta_fil}/${this.num}`).then((reslut)=>{
                    if(reslut.data.code == 0){
                        this.$store.commit('changeFilm',JSON.stringify(reslut.data.msg))
                        this.fil_list = reslut.data.msg;
                    }else if(reslut.data.code == 1){
                        this.$message.warn('访问数据时,我们迷路了',5);
                    }
                }).catch((err)=>{
                    this.$message.warn('访问数据时,它已经远走高飞了',5);
                })
            }else{
                this.fil_list = JSON.parse(localStorage.getItem('film'));
            }

        },
        go(tag){
            if (tag == 'before') {
                if(this.sta_fil == 0) return this.$message.success('已经到顶了',5,);;
                this.sta_fil -= 2;
                this.$axios.get(`${this.$store.state.url}subsidiary/getart/films/${this.sta_fil}/${this.num}`).then((reslut)=>{
                    if(reslut.data.code == 0){
                        this.fil_list = reslut.data.msg;
                        
                    }else if(reslut.data.code == 1){
                        this.$message.warn('加载失败',5,);
                    }
                }).catch((err)=>{
                    this.$message.warn('访问服务器失败',5,);
                })
            }else{
                if(this.end == true) return this.$message.success('已经没有了',5,);;
                this.sta_fil += 2;
                this.$axios.get(`${this.$store.state.url}subsidiary/getart/films/${this.sta_fil}/${this.num}`).then((reslut)=>{
                    if(reslut.data.code == 0){
                        if (reslut.data.msg == '') {
                            this.sta_fil -= 2;
                            return this.end = true;
                        }
                        this.fil_list = reslut.data.msg;
                        
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
        Films
    }
}
</script>