<template>
    <div>
         <a-list  itemLayout="vertical" :dataSource="fil">
            <a-list-item slot="renderItem" slot-scope="item" @click="goto(item.url)">
            <a-list-item-meta >
                <strong slot="title">{{item.name}}</strong>
                <span slot="description">
                    <p>{{ item.genre }}</p>
                    <p>{{item.time}}</p>
                </span>
            </a-list-item-meta>
            </a-list-item>
        </a-list>
    </div>
</template>
<script>
export default {
    props:['fil','tag'],
    methods:{
        goto(url){
            return this.$router.push(`/filmsInfo?url=${url}&tag=${this.tag}`)
        }
    }
}
</script>