<template>
    <div>
        <h2>
            Liste des posts et commentaires
        </h2>
        <PremPost :posts="posts"/>
    </div>
</template>
<script>
export default {
    async asyncData(context){
        const {data} = await  context.$axios.get('/admin/posts')
        
        return {
            posts : data
        }
    },
}
</script>