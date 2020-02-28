<template>
    <div class="wraps">
        <div class="aa">
            <h2>使用说明</h2>
            <p>双击上方灰色区域可最大化与最小化,单击左上角"GRG"即可关闭软件。其他请自行摸索</p>
        </div>
        <a-input type='email' placeholder="Email" style="width: 60%" v-model="loginForm.email"  /><br>
        <a-input-password type='password' placeholder="Pass" style="width: 60%" v-model="loginForm.pass"  /><br>
        <a-button type="primary" @click="login">Landing</a-button>
    </div>
</template>
<script>
export default {
    data() {
        return {
           loginForm:{
            email: '',
            pass: '',
        }  
        }
    },
    methods:{
       login(){
            let _this = this;
            if (this.loginForm.email === '' || this.loginForm.pass === '') {
                this.$message.warn('账号或密码不能为空',5);
            } else {
                this.$axios({
                method: 'post',
                url: `${this.$store.state.url}account/landing`,
                data: _this.loginForm
                }).then(res => {
                if (res.data.code == 0) {
                    // 将用户token保存到vuex中
                    _this.$store.commit('changeToken', { token: res.data.msg.token })
                    _this.$store.commit('changeUser', res.data.msg.email)
                    this.$axios({
                    method:'get',
                    url:`${this.$store.state.url}user/info/${this.$store.state.user}`
                    }).then((reslut)=>{
                    if(reslut.data.code == 0){
                        this.$store.commit('changeUser',JSON.stringify(reslut.data.msg[0]))
                    }else if(reslut.data.code == 1){
                        this.$message.warn('访问数据时,我们迷路了',5);
                    }
                    }).catch((err)=>{
                        this.$message.warn('访问数据时,它已经远走高飞了',5);
                    })
                    _this.$router.push('/home');
                    this.$message.success('成功来到 咕咕 Success to goo goo',5);
                } else if (res.data.code == 1) {
                    this.$message.warn('密码似乎是错的  The password seems to be wrong',5);
                } else if (res.data.code == 2) {
                    this.$message.warn('不存在此人  There is no such person',5);
                }
                }).catch(error => {
                    this.$message.warn('服务器故障  Server failure',5);
                });
            }
       }
    }
}
</script>
<style lang="less" scoped>
.wraps{
    text-align: center;
    *{
        margin: 20px 0;
    }
}
</style>