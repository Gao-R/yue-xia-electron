<template>
    <div class="wrap">
        <div class="img">
            <a-input style="width: 40%" v-model="user.name" :maxlength="15" placeholder="改一个炫酷的名字吧" /><br/>
            <a-input style="width: 40%" v-model="user.qq" type="number" placeholder="QQ" :maxlength="10" /><br/>
            <a-input style="width: 40%" v-model="user.pass0" type="password" :maxlength="15" placeholder="first" /><br/>
            <a-input style="width: 40%" v-model="user.pass1" type="password" placeholder="second" /><br/>
            <a-textarea style="width: 50%"  v-model="user.mottot" :cols="30" :rows="10" :maxlength="150" placeholder="把你最爱的那句话,写上来吧!" />
        </div>
        <div class="clearfix">
            <a-upload listType="picture-card" :multiple=true  @preview="handlePreview" 
            :customRequest=add :remove=remove >
            <div v-if="fileList.length < 1">
                <a-icon type="plus" />
                <div class="ant-upload-text">Upload</div>
            </div>
            </a-upload>
            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
        </div>
        <a-button type="primary" @click="setchange"> Submit </a-button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            previewVisible: false,
            previewImage: '',
            fileList: [],
            user:{
                name:'',
                mottot:'',
                qq:'',
                pass0:'',
                pass1:'',
            }
        }
    },
    methods: {
        handlePreview(file) {
            this.previewImage = file.url || file.thumbUrl;
            this.previewVisible = true;
        },
        handleCancel() {
            this.previewVisible = false;
        },
        add(file){
            this.fileList.push(file)
        },
        remove(file){
            for (let num = 0; num < this.fileList.length; num++) {
                if (this.fileList[num].file.uid == file.uid) {
                    this.fileList.splice(num,1)
                }
            }
        },
        getnewUser(use){
            this.$axios({
                method:'get',
                url:`${this.$store.state.url}user/info/${use.email}`
            }).then((reslut)=>{
                if(reslut.data.code == 0){
                    this.$store.commit('changeUser',JSON.stringify(reslut.data.msg[0]));
                    this.$message.warn('资料修改成功  Data modification successful',5);
                    this.$router.push('/user');
                }else if(reslut.data.code == 1){
                    this.$message.warn('刷新用户信息失败  Failed to refresh user information',5);
                }
            }).catch((err)=>{
                this.$message.warn('用户服务器故障    User server failure',5);
            })
        },
        setchange(){
            if (this.user.pass0 != this.user.pass1) {
                return this.$message.warn('两次密码不一样    The passwords are different',5);
            }
            var use = JSON.parse(this.$store.state.user);
            this.$axios({
                method:'get',
                url:`${this.$store.state.url}user/change/${use.email}`,
                params:{
                    name:this.user.name,
                    mottot:this.user.mottot,
                    qq:this.user.qq,
                    pass:this.user.pass1, 
                }
            }).then((reslut)=>{
                if(reslut.data.code == 0){
                    this.$message.warn('文本内容上传成功  Text content uploaded successfully',5);
                    if(this.fileList[0]){
                        var data = new FormData();
                        data.append('headimg',this.fileList[0].file);
                        this.$axios({
                            method:'post',
                            url:`${this.$store.state.url}published/registimg/${use.email}`,
                            data
                        }).then((res)=>{
                            if(res.data.code == 0){
                                this.$message.warn('头像上传成功  Profile photo uploaded successfully',5);
                                this.getnewUser(use)
                            }else if(res.data.code == 1){
                                this.$message.warn('头像上传失败  Avatar upload failed',5);
                            }else if(res.data.code == 2){
                                this.$message.warn('删除旧数据失败    Failed to delete old data',5);
                            }
                        }).catch((err)=>{
                            this.$message.warn('头像服务器故障    Avatar server failure',5);
                        });
                    }
                    this.getnewUser(use)
                }else if(reslut.data.code == 1){
                    this.$message.warn('文本修改失败  Text modification failed',5);
                }
            }).catch((err)=>{
                console.log(err);
                
                this.$message.warn('文本服务器故障    Text server failure',5);
            })
        }
    },
}
</script>
<style lang="less" scoped>
.wrap{
    text-align: center;
    *{
        margin-bottom: 4%;
    }
}
</style>