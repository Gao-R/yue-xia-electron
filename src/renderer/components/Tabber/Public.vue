<template>
  <div>
      <div class="info">
          <a-input v-if="this.tag=='art'" placeholder="Input a number" :maxLength="30" style="width: 50%" v-model="imgs.lead" />
          <a-input placeholder="Input a number" :maxLength="20" style="width: 50%" v-model="imgs.title" />
          <a-textarea placeholder="Basic usage" :cols="30" :rows="10" :maxLength="3000" v-model="imgs.introduce" />
      </div>
        <div class="clearfix">
            <a-upload listType="picture-card" :multiple=true  @preview="handlePreview" 
            :customRequest=add :remove=remove >
            <div v-if="fileList.length < num">
                <a-icon type="plus" />
                <div class="ant-upload-text">Upload</div>
            </div>
            </a-upload>
            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
        </div>
        <a-button type="primary" @click="put"> Modify the data </a-button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        previewVisible: false,
        previewImage: '',
        fileList: [],
        imgs:{
            title:'',
            introduce:'',
            lead:''
        },
        user:null,
        tag:this.$route.query.tag,
        num:this.$route.query.num,
      };
    },
    created() {
        this.getuser()
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
        getuser(){
            if (this.tag == 'img') {
                this.num = 30;
            } else if (this.tag == 'mv') {
                this.num = 2;
            } else if (this.tag == 'art') {
                this.num = 20;
            }
            if (this.$store.state.user == '') {
                this.$message.warn('未登陆不可发表',5);
            }else{
                this.user = JSON.parse(this.$store.state.user);
            }
        },
        put(){
            if (this.imgs.title.includes('/')||this.imgs.title.includes("'")||this.imgs.title.includes('"')||this.imgs.title.includes('?')||this.imgs.title.includes('&')||this.imgs.introduce.includes('/')||this.imgs.introduce.includes("'")||this.imgs.introduce.includes('"')||this.imgs.introduce.includes('?')||this.imgs.introduce.includes('&')||this.imgs.lead.includes('/')||this.imgs.lead.includes("'")||this.imgs.lead.includes('"')||this.imgs.lead.includes('?')||this.imgs.lead.includes('&')) {
                return this.$message.warn('非法字符',5);
            }
            if (this.tag == 'img') {
                if (!this.fileList[0]&&!this.fileList[0].content.includes("image")) {
                    return this.$message.warn('封面为空 The cover is empty',5);
                }
                
                this.$axios({
                    method:'get',
                    url:`${this.$store.state.url}published/putimg/info`,
                    params:{
                        title:this.imgs.title,
                        introduce:this.imgs.introduce,
                        publisher:this.user.user_name,
                        portraits:this.user.head_img,
                        email:this.user.email,
                    }
                }).then((reslut)=>{
                    if(reslut.data.code == 0){
                        this.imgs.title = '',
                        this.imgs.introduce = '',
                        this.$message.warn('文本内容上传成功  Text content uploaded successfully',5);
                        var data = new FormData();
                        data.append('first',this.fileList[0].file);
                        for (var i = 1; i < this.fileList.length; i++) {
                            data.append('img',this.fileList[i].file);
                        }
                        this.$axios({
                            method:'post',
                            url:`${this.$store.state.url}published/putimg/img/${reslut.data.msg[1].parent}`,
                            data
                        }).then((res)=>{
                            if(res.data.code == 0){
                                this.$message.warn('图片上传成功  Picture uploaded successfully',5);
                                this.$router.push('/home')
                            }else if(res.data.code == 1){
                                this.$message.warn('图片上传失败  Picture upload failed',5);
                            }
                        }).catch((err)=>{
                            this.$message.warn('服务器故障 Server down',5);
                        });
                    }else if(reslut.data.code == 1){
                        this.$message.warn('文本内容上传失败  Text content upload failed',5);
                    }else if(reslut.data.status == 403){
                        this.$message.warn('登陆过期,请重新登陆   Login expired, please log in again',5);
                    }
                }).catch((err)=>{
                    this.$message.warn('服务器故障 Server down',5);
                });
            } else if (this.tag == 'mv') {
                if (!this.fileList[0]||!this.fileList[1]) {
                    return this.$message.warn('上传内容不全  The uploaded content is incomplete',5);
                }
                if (this.fileList[0].content.includes("image") && this.fileList[1].content.includes("video")) {
                    this.$axios({
                        method:'get',
                        url:`${this.$store.state.url}published/putmv/info`,
                        params:{
                            title:this.imgs.title,
                            introduce:this.imgs.introduce,
                            publisher:this.user.user_name,
                            portraits:this.user.head_img,
                            email:this.user.email,
                        }
                    }).then((reslut)=>{
                        if(reslut.data.code == 0){
                            this.$message.warn('文本内容上传成功  Text content uploaded successfully',5);
                            var data = new FormData();
                            data.append('first',this.fileList[0].file);
                            data.append('mv',this.fileList[1].file);
                            this.$axios({
                                method:'post',
                                url:`${this.$store.state.url}published/pumv/mv/${reslut.data.msg[1].parent}`,
                                data
                            }).then((res)=>{
                                if(res.data.code == 0){
                                this.imgs.title = '',
                                this.imgs.introduce = '',
                                this.$message.warn('图片上传成功  Picture uploaded successfully',5);
                                     this.$router.push('/home')
                                }else if(res.data.code == 1){
                                    this.$message.warn('图片上传失败  Picture upload failed',5);
                                }
                            }).catch((err)=>{
                                this.$message.warn('服务器故障    server failure',5);
                            });
                        }else if(reslut.data.code == 1){
                            this.$message.warn('文本内容上传失败  Text content upload failed',5);
                        }else if(reslut.data.status == 403){
                            this.$message.warn('登陆过期,请重新登陆   Login expired, please log in again',5);
                    }
                    }).catch((err)=>{
                        this.$message.warn('服务器故障    server failure',5);
                    });
                }else{
                    return this.$message.warn('上传格式错误  Upload format error',5);
                }
            } else if (this.tag == 'art'){
                if (!this.fileList[0]) {
                    return this.$message.warn('封面为空 The cover is empty',5);
                }
                this.$axios({
                    method:'get',
                    url:`${this.$store.state.url}published/putart/info`,
                    params:{
                        title:this.imgs.title,
                        content:this.imgs.introduce,
                        publisher:this.user.user_name,
                        head_img:this.user.head_img,
                        lead:this.imgs.lead,
                        email:this.user.email,
                    }
                }).then((reslut)=>{
                    if(reslut.data.code == 0){
                        this.$message.warn('文本内容上传成功  Text content uploaded successfully',5);
                    var data = new FormData();
                        data.append('first',this.fileList[0].file);
                        if (this.fileList[1]) {
                            for (var i = 1; i < this.fileList.length; i++) {
                                data.append('img',this.fileList[i].file);
                            }
                        }
                        this.$axios({
                            method:'post',
                            url:`${this.$store.state.url}published/putart/img/${reslut.data.msg[1].parent}`,
                            data
                        }).then((res)=>{
                            if(res.data.code == 0){
                                this.imgs.title = '',
                                this.imgs.introduce = '',
                                this.imgs.lead = '',
                                this.$message.warn('文章上传成功  Article uploaded successfully',5);
                                 this.$router.push('/home')
                            }else if(res.data.code == 1){
                                this.$message.warn('文章上传失败  Article upload failed',5);
                            }else if(reslut.data.status == 403){
                                this.$message.warn('登陆过期,请重新登陆   Login expired, please log in again',5);
                            }
                        }).catch((err)=>{
                            this.$message.warn('服务器故障    server failure',5);
                        });
                    }else if(reslut.data.code == 1){
                        this.$message.warn('文本内容上传错误  Text content upload error',5);
                    }
                }).catch((err)=>{
                    this.$message.warn('服务器故障    server failure',5);
                });
            }
        }
    },
  };
</script>
<style>
  /* you can make up upload button and sample style by using stylesheets */
  /* .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  } */
</style>
