<template>
    <div>
        <fan></fan>
        <div class="wrap">
            <h3>{{ name }}</h3>
            <video-player class="video-player vjs-custom-skin"
                ref="videoPlayer"
                :playsinline="true"
                :options="playerOptions">
            </video-player>
        </div>
    </div>
</template>
<script>
import fan from '../Tool/fan'
import videojs from 'video.js'
window.videojs = videojs
// hls plugin for videojs6
require('videojs-contrib-hls/dist/videojs-contrib-hls.js')
export default {
    data() {
        // "https://video.pearvideo.com/mp4/third/20200123/cont-1645396-14186922-103601-hd.mp4"
        return {
            name:this.$route.query.name,
            playerOptions: {
                //播放速度
                playbackRates: [0.5, 1.0, 1.5, 2.0], 
                //如果true,浏览器准备好时开始回放。
                autoplay: false, 
                // 默认情况下将会消除任何音频。
                muted: false, 
                // 导致视频一结束就重新开始。
                loop: false, 
                // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                preload: 'auto', 
                language: 'zh-CN',
                    // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                aspectRatio: '16:9',
                    // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                fluid: true,
                sources: [{
                    //类型
                    type:'application/x-mpegURL',
                    src: this.$route.query.url,
                }],
                hls: true, 
                poster: '', 
                notSupportedMessage: '此视频暂无法播放，请稍后再试',
                controlBar: {
                    timeDivider: true,
                    durationDisplay: true,
                    remainingTimeDisplay: false,
                    //全屏按钮
                    fullscreenToggle: true  
                }
            },
            url:this.$route.query.url,
            shelf:this.$route.query.shelf,
        }
    },
    beforeDestroy() {
        this.ifshelf();
    },
    methods: {
        ifshelf(){
            if (this.shelf == 'true') {
                this.$axios({
                    method:'get',
                    url:`${this.$store.state.url}user/upfilm`,
                    params:{
                        name:this.name,
                        email:JSON.parse(this.$store.state.user).email,
                        last:this.url,
                    }
                }).then((reslut)=>{
                    if(reslut.data.code == 0){
                        this.$message.success('保存影视成功',5);
                    }else if(reslut.data.code == 1){
                        this.$message.warn('保存影视失败',5);
                    }
                }).catch((err)=>{
                    this.$message.warn('服务器故障',5);
                });

            }else{
                return
            }
        },
    },
    components:{
        fan,
    }
}
</script>
<style lang="less" scoped>
h3{
    padding: 10px 0;
}
.wrap{
    padding: 10px;
    background-color: #fff;
}
</style>