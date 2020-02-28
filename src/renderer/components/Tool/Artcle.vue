<template>
    <div>
        <a-list itemLayout="vertical" size="large" :dataSource="list">
            <a-list-item slot="renderItem" slot-scope="item" key="item.id"  @click="goto(item.id)">
            <img slot="extra" alt="Picture loading error" :src=item.img_url />
            <a-list-item-meta>
                <span slot="title">{{item.title}}</span>
            </a-list-item-meta>
            {{item.lead}}
            </a-list-item>
        </a-list>
    </div>
</template>
<script>
export default {
    props:['list'],
    methods:{
        goto(id){
            return this.$router.push(`/artcleinfo?id=${id}`)
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