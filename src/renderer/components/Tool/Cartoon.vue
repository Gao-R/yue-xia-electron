<template>
    <div>
         <a-list  itemLayout="vertical" :dataSource="ct">
            <a-list-item slot="renderItem" slot-scope="item" @click="goto(item.url)">
                <img slot="extra"  alt="The picture is invalid." 
                :src="item.cover" />
            <a-list-item-meta >
                <strong slot="title">{{item.name}}</strong>
                <span slot="description">
                    <p>{{ item.tag }}</p>
                    <p >{{ item.author }}</p> 
                    <p>{{item.latest}}</p>
                    <p>{{item.time}}</p>
                </span>
            </a-list-item-meta>
            </a-list-item>
        </a-list>
    </div>
</template>
<script>
export default {
    props:['ct','tag'],
    methods:{
        goto(url){
            return this.$router.push(`/cartoonInfo?url=${url}&tag=${this.tag}`)
        }
    }
}
</script>
<style lang="less" scoped>
img{
    height: 100px;
    margin-right: 5%;
}
</style>