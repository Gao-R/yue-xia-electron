<template>
    <div>
        <Fiction :xs=xs_list tag='main'></Fiction>
        <a-button type="primary" @click="go('before')"> <a-icon type="left" /> The previous page </a-button>
        <a-button type="primary" @click="go('next')"> The next page <a-icon type="right" /> </a-button>
    </div>
</template>
<script>
import Fiction from '../Tool/Fiction'
export default {
    data() {
      return {
        sta_xs:0,
        num:20,
        xs_list:[],
      };
    },
    created() {
        this.getmsg()
    },
    methods:{
        getmsg(){
            if (localStorage.getItem('fict')==''||localStorage.getItem('fict')==undefined) {
                // /video/getvideos/:sta/:num
                this.$axios.get(`${this.$store.state.url}subsidiary/getart/fiction/${this.sta_xs}/${this.num}`).then((reslut)=>{
                    if(reslut.data.code == 0){
                        this.$store.commit('changeFict',JSON.stringify(reslut.data.msg))
                        this.xs_list = reslut.data.msg;
                    }else if(reslut.data.code == 1){
                        this.$message.warn('访问数据时,我们迷路了',5);
                    }
                }).catch((err)=>{
                    this.$message.warn('访问数据时,它已经远走高飞了',5);
                })
            }else{
                this.xs_list = JSON.parse(localStorage.getItem('fict'));
            }

        },
        go(tag){
            if (tag == 'before') {
                if(this.sta_xs == 0) return this.$message.success('已经到顶了',5,);;
                this.sta_xs -= 2;
                this.$axios.get(`${this.$store.state.url}subsidiary/getart/fiction/${this.sta_xs}/${this.num}`).then((reslut)=>{
                    if(reslut.data.code == 0){
                        this.xs_list = reslut.data.msg;
                    }else if(reslut.data.code == 1){
                        this.$message.warn('加载失败',5,);
                    }
                }).catch((err)=>{
                    this.$message.warn('访问服务器失败',5,);
                })
            }else{
                if(this.end == true) return this.$message.success('已经没有了',5,);;
                this.sta_xs += 2;
                this.$axios.get(`${this.$store.state.url}subsidiary/getart/fiction/${this.sta_xs}/${this.num}`).then((reslut)=>{
                    if(reslut.data.code == 0){
                        if (reslut.data.msg == '') {
                            this.sta_xs -= 2;
                            return this.end = true;
                        }
                        this.xs_list = reslut.data.msg;
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
        Fiction
    }
}
</script>