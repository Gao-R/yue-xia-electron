<template>
    <div>
        <a-divider orientation="right">Hot Img</a-divider>
        <Card :data='img_list' tag='image'></Card>
        <a-divider orientation="left">vM toH</a-divider>
        <Card :data='mv_list' tag='video'></Card>
    </div>
</template>
<script>
import Card from '../Tool/Card';
export default {
    data() {
      return {
        img_list:[],
        mv_list:[]
      };
    },
    created() {
        this.aa()
    },
    methods:{
        aa(){
            // 获取首页图片
            if (localStorage.getItem('homeimg')==''||localStorage.getItem('homeimg')==undefined) {
                this.$axios.get(`${this.$store.state.url}image/getimages/0/10/likes/ASC`).then((reslut)=>{
                    if(reslut.data.code == 0){
                        this.$store.commit('changeHomeimg',JSON.stringify(reslut.data.msg))
                        this.img_list = reslut.data.msg
                    }else if(reslut.data.code == 1){
                        this.$message.success('访问图片数据时,我们迷路了',5);
                    }
                }).catch((err)=>{
                     this.$message.success(
                        '访问图片数据时,它已经远走高飞了',
                        5
                        );
                })
            }else{
                this.img_list = JSON.parse(localStorage.getItem('homeimg'));
            }
      
            //获取首页视频
            if (localStorage.getItem('homemv')=='') {
                this.$axios.get(`${this.$store.state.url}video/getvideos/0/10/likes/ASC`).then((reslut)=>{
                    if(reslut.data.code == 0){
                        this.$store.commit('changeHomemv',JSON.stringify(reslut.data.msg))
                        this.mv_list = reslut.data.msg
                    }else if(reslut.data.code == 1){
                        this.$message.success(
                        '访问视频数据时,我们迷路了',
                        5
                        );
                    }
                }).catch((err)=>{
                     this.$message.success(
                        '访问视频数据时,它已经远走高飞了',
                        5
                        );
                })
            }else{
                this.mv_list = JSON.parse(localStorage.getItem('homemv'));
            }
        },

    },
    components:{
        Card,
    }
}
</script>