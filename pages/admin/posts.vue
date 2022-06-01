<template>
    <div>
        <h2>
            Liste des posts et commentaires
        </h2>
        <div class="app-post app-flex-col" v-for="(post,index) in posts"  :key="index">
            <h3>{{post.title}}</h3>
        </div>
    </div>
</template>
<script>
export default {
    async asyncData(context){
        const {data} = await  context.$axios.get('/posts')
        
        return {
            posts : data
        }
    },
}
</script>