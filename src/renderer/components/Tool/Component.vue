<template>
    <div>
        <a-textarea placeholder="你想对它说什么" v-model="value" :rows="4" />
        <svg @click="putcomment" slot="prefix" t="1579525790217" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1181" width="32" height="32"><path d="M853.46 421.21l-99.93-79.95-37.43-142.19c-3.18-12.07-12.77-21.03-25.02-23.35-12.18-2.31-24.33 2.44-31.7 12.48-17.02 23.21-39.04 62.47-47.26 117.69-2.62 17.6-13.8 33.65-30.56 43.33-10.66 6.15-22.7 8.78-34.84 7.59l-98.42-9.53c5.19-19.85 10.32-45.37 9.09-65.91-0.53-8.82-8.11-15.54-16.93-15.01-8.84 0.52-15.54 8.13-15.01 16.93 1.92 31.98-16.64 84.27-16.82 84.8l-0.47 1.32c-35.61 56.34-158.03 246.9-241.12 337.81l-2.38 2.58c-12.63 13.72-27.79 30.71-16.33 55.83l-0.45 0.26 2.71 4.7 4.8 8.32 18.47 32c15.91 27.56 71.64 64.89 168.68 8.86l55.37-31.97-2.19-39.16 25.41 25.76 118-68.13-2.19-39.16 25.41 25.76 118.29-68.3-2.19-39.16 25.41 25.76 144.02-83.15c18.95-10.94 30.85-30.53 31.82-52.39 0.96-21.87-9.14-42.43-26.24-54.42z m-430.45-15.48l27.91 51.29-53.07-12.24c9.61-14.77 18.1-27.97 25.16-39.05z m-54.56 83.7l24.97 43.26-53.4-1.09c9.88-14.48 19.4-28.61 28.43-42.17zM188.19 731.46l2.44-2.66c38.85-42.5 85.17-104.82 127.61-165.65l86.79 1.78c5.13 0.54 10.15-0.55 14.44-3.03 3.02-1.74 5.68-4.17 7.77-7.19 5.33-7.71 5.73-17.53 1.04-25.65l-29.59-51.25 62.37 14.38c9.19 2.12 18.8-1.37 24.51-8.87 5.7-7.5 6.47-17.71 1.96-25.98l-42.58-78.24 98.67 9.56c18.81 1.83 37.46-2.22 54.59-12.11 24.48-14.13 41.51-38.79 45.55-65.95 7.27-48.75 26.54-83.18 41.4-103.38l37.54 142.64-32.22 94.58c-8.5 24.96-27.79 61.16-70.53 85.83L273.84 730.1c-15.3 8.84-32.73 13.83-50.38 14.44l-46.97 1.63c1.23-2.99 4.68-7.09 11.7-14.71z m176.66 38.47l-38.32 22.13c-93.87 54.2-124.67 3.37-124.97 2.85l-9.96-17.25 32.96-1.14c22.87-0.79 45.45-7.26 65.28-18.71l72.02-41.58 2.99 53.7z m141.22-81.53l-79.53 45.91L391.71 699l111.37-64.3 2.99 53.7z m141.51-81.7l-79.82 46.09-34.83-35.32 103.02-59.48c2.96-1.71 5.76-3.65 8.61-5.51l3.02 54.22z m200.14-132.51c-0.49 11.06-6.27 20.57-15.85 26.1l-122.6 70.78-38.57-39.1c22.58-21.15 39.94-47.51 50.06-77.22l26.43-77.57 87.06 69.61c9.06 6.37 13.97 16.35 13.47 27.4z" fill="#FFB400" p-id="1182"></path><path d="M423.01 405.73l27.91 51.29-53.07-12.24c9.61-14.77 18.1-27.97 25.16-39.05z" fill="#6DB213" p-id="1183"></path><path d="M368.45 489.43l24.97 43.26-53.4-1.09c9.88-14.48 19.4-28.61 28.43-42.17z" fill="#0277B2" p-id="1184"></path><path d="M188.19 731.46l2.44-2.66c38.85-42.5 85.17-104.82 127.61-165.65l86.79 1.78c5.13 0.54 10.15-0.55 14.44-3.03 3.02-1.74 5.68-4.17 7.77-7.19 5.33-7.71 5.73-17.53 1.04-25.65l-29.59-51.25 62.37 14.38c9.19 2.12 18.8-1.37 24.51-8.87 5.7-7.5 6.47-17.71 1.96-25.98l-42.58-78.24 98.67 9.56c18.81 1.83 37.46-2.22 54.59-12.11 24.48-14.13 41.51-38.79 45.55-65.95 7.27-48.75 26.54-83.18 41.4-103.38l37.54 142.64-32.22 94.58c-8.5 24.96-27.79 61.16-70.53 85.83L273.84 730.1c-15.3 8.84-32.73 13.83-50.38 14.44l-46.97 1.63c1.23-2.99 4.68-7.09 11.7-14.71z" fill="#E60037" p-id="1185"></path><path d="M364.85 769.93l-38.32 22.13c-93.87 54.2-124.67 3.37-124.97 2.85l-9.96-17.25 32.96-1.14c22.87-0.79 45.45-7.26 65.28-18.71l72.02-41.58 2.99 53.7zM506.07 688.4l-79.53 45.91L391.71 699l111.37-64.3zM647.58 606.7l-79.82 46.09-34.83-35.32 103.02-59.48c2.96-1.71 5.76-3.65 8.61-5.51l3.02 54.22zM847.72 474.19c-0.49 11.06-6.27 20.57-15.85 26.1l-122.6 70.78-38.57-39.1c22.58-21.15 39.94-47.51 50.06-77.22l26.43-77.57 87.06 69.61c9.06 6.37 13.97 16.35 13.47 27.4z" fill="#FFF7E4" p-id="1186"></path></svg>


        <a-list
            class="comment-list"
            itemLayout="horizontal"
            :dataSource="comment_list"
        >
            <a-list-item slot="renderItem" slot-scope="item">
            <a-comment :author="item.user_name" :avatar="item.head_img">
                <p slot="content">{{item.content}}</p>
                <a-tooltip slot="datetime">
                <span>{{item.time | dateformat}}</span>
                </a-tooltip>
            </a-comment>
            </a-list-item>
        </a-list>
    </div>
</template>
<script>
// import { Toast } from 'vant';
export default {
    data() {
        return {
            loading:false,
            finished:true,
            value:'',
            user:null,
            sta:0,
            comment_list:[],
            com:0,
        }
    },
    props:['id','tag'],
    created() {
        this.getcomment();
        this.getuser();
    },
    methods: {
        getuser(){
            if (this.$store.state.user == '') {
                
                return this.$message.warn('未登录,请先登陆   Not logged in, please log in first',5,);
            }else{
                this.user = JSON.parse(this.$store.state.user);
            }
        },
        putcomment(){
            if (this.$store.state.user == '') {
                return this.$message.warn('未登录,无法发表评论   Not logged in to comment',5,);
            }else{
                this.$axios({
                    method:'get',
                    url:`${this.$store.state.url}subsidiary/content`,
                    params:{
                        name:this.user.user_name,
                        img:this.user.head_img,
                        content:this.value,
                        id:this.id,
                        tag:this.tag
                    }
                }).then((reslut)=>{
                    if(reslut.data.code == 0){
                        this.$message.warn('评论成功  Comment on success',5,);
                        this.comment_list.unshift({
                            content:this.value,
                            head_img:this.user.head_img,
                            user_name:this.user.user_name,
                        });
                        this.value = '';
                    }else if(reslut.data.code == 1){
                        this.$message.warn('评论失败  Comment on failure',5,);
                    }
                }).catch((err)=>{
                    this.$message.warn('服务器故障    Server failure',5,);
                })
            }
        },
        getcomment(){
            this.$axios({
                method:'get',
                url:`${this.$store.state.url}subsidiary/comment`,
                params:{
                    tag:this.tag,
                    sta:this.sta,
                    num:10,
                    id:this.id,
                }
            }).then((reslut)=>{
                if(reslut.data.code == 0){
                    this.comment_list = reslut.data.msg;
                    this.com ++;
                }else if(reslut.data.code == 1){
                    this.$message.warn('获取评论失败  Failed to get a comment',5,);
                }
            }).catch((err)=>{
                this.$message.warn('服务器故障    Server failure',5,);
            })
        },
        onLoad(){
            setTimeout(() => {
                this.$axios({
                    method:'get',
                    url:`${this.$store.state.url}subsidiary/comment`,
                    params:{
                        tag:this.tag,
                        sta:this.com,
                        num:10,
                        id:this.id,
                    }
                }).then((reslut)=>{
                    if(reslut.data.code == 0){
                        if (reslut.data.msg == '') {
                            return this.finished = true;
                        }
                        this.com ++;
                        this.comment_list.push(reslut.data.msg);
                        this.loading = false;
                        
                    }else if(reslut.data.code == 1){
                        this.$message.warn('加载失败',5,);
                    }
                }).catch((err)=>{
                    this.$message.warn('访问服务器失败',5,);
                })
            }, 500);
        }
    },
}
</script>
<style lang="less" scoped>
.comment{
    margin-top: 3%;
    display: flex;
    justify-content: space-between;
    background-color: rgba(254, 121, 140,.3);
    padding: 1%;
    .headimg{
        flex: 2;
        display: flex;
        justify-content: center;
    }
    .text{
        flex: 10;
        .comname{
            flex: 2;
            display: flex;
            justify-content: space-between;
            :nth-child(1){
                margin-left: 5%;
            }
            :nth-child(2){
                margin-right: 5%;
            }
        }
        .com{
            margin-top: 2%;
            flex: 4;
            padding-left: 8%;
            word-break: break-all;
        }
    }
}
</style>