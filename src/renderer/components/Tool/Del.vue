<template>
    <div v-if="adm" class="del">
        <a-button type="danger" block @click="del">Delete</a-button>
    </div>
</template>
<script>
import qs from 'qs';
export default {
    data() {
        return {
            adm:false,
        }
    },
    props:['keys','tag','id','alllist'],
    created() {
        this.getadm()
    },
    methods: {
        getadm(){
            if (localStorage.getItem('user')==''||localStorage.getItem('user')==undefined) return;
            const use = JSON.parse(localStorage.getItem('user'));
            if (use.administrator == 'grg') {
                this.adm = true;
            }else{
                this.adm = false;
            }
        },
        del(){
            var url = [];
            if ( this.alllist != '') {
                for (let i = 0; i < this.alllist.length; i++) {
                    url[i] =  this.alllist[i].img_url;                    
                }
            }
            this.$axios({
                method:'get',
                url:`${this.$store.state.url}subsidiary/delete`,
                params:{
                    id:this.id,
                    tag:this.tag,
                    key:this.keys,
                    url
                },
                 paramsSerializer: params => {
                    return qs.stringify(params, { arrayFormat: 'repeat' })
                }
            }).then((reslut)=>{
                if(reslut.data.code == 0){
                    this.$message.warn('删除成功',5,);
                    this.$router.go(-1);
                }else if(reslut.data.code == 1){
                    this.$message.warn('删除失败',5,);
                }
            }).catch((err)=>{
                this.$message.warn('服务器错误',5,);
            });
        }
    },
}
</script>
<style lang="less" scoped>
.del{
    height: 100px;
}
</style>