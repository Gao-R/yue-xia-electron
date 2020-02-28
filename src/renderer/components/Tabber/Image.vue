<template>
    <div>
        <Card :data='img_list' tag='image'></Card>
        <a-button type="primary" @click="go('before')"> <a-icon type="left" /> The previous page </a-button>
        <a-button type="primary" @click="go('next')"> The next page <a-icon type="right" /> </a-button>
    </div>
</template>
<script>
import Card from '../Tool/Card';
export default {
    data() {
      return {
        img_list: [],
        sta_img:0,
        num:20,
        end:false,
      };
    },
    created() {
        this.getmsg()
    },
    methods:{
        getmsg(){
            if (localStorage.getItem('img')==''||localStorage.getItem('img')==undefined) {
                //  /getimages/:sta/:num
                this.$axios.get(`${this.$store.state.url}image/getimages/${this.sta_img}/${this.num}/id/DESC`).then((reslut)=>{
                    if(reslut.data.code == 0){
                        this.$store.commit('changeImg',JSON.stringify(reslut.data.msg))
                        this.img_list = reslut.data.msg;
                    }else if(reslut.data.code == 1){
                        this.$message.warn('访问图片数据时,我们迷路了',5);
                    }
                }).catch((err)=>{
                    this.$message.warn('访问数据时,它已经远走高飞了',5);
                });
            }else{
                this.img_list = JSON.parse(localStorage.getItem('img'));
            }
        },
        go(tag){
            if (tag == 'before') {
                if(this.sta_img == 0) return this.$message.success('已经到顶了',5,);;
                this.sta_img -= 2;
                this.$axios.get(`${this.$store.state.url}image/getimages/${this.sta_img}/${this.num}/id/DESC`).then((reslut)=>{
                    if(reslut.data.code == 0){
                        this.img_list = reslut.data.msg;
                        this.loading = false;
                        
                    }else if(reslut.data.code == 1){
                        this.$message.warn('加载失败',5,);
                    }
                }).catch((err)=>{
                    this.$message.warn('访问服务器失败',5,);
                })
            }else{
                if(this.end == true) return this.$message.success('已经没有了',5,);;
                this.sta_img += 2;
                this.$axios.get(`${this.$store.state.url}image/getimages/${this.sta_img}/${this.num}/id/DESC`).then((reslut)=>{
                    if(reslut.data.code == 0){
                        if (reslut.data.msg == '') {
                            this.sta_img -= 2;
                            return this.end = true;
                        }
                        this.img_list = reslut.data.msg;
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
        Card,
    }
}
</script>