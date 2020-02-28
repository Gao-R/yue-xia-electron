<template>
    <div>
        <a-row type="flex" justify="space-around" align="middle" >
            <a-col v-for="item in data" :key="item.id">
                <router-link :to="'/'+tag+'/'+item.id">
                    <a-card hoverable style="width: 240px">
                        <img
                        alt="example"
                        :src=item.img_url
                        slot="cover"
                        />
                        <a-card-meta :title=item.title>
                        </a-card-meta>
                    </a-card>
                </router-link>
            </a-col>
        </a-row>
    </div>
</template>
<script>
export default {
    props:['data','tag']
}
</script>