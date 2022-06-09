<template>
    <div>
        <h2>
            Liste des commentaires
        </h2>
        <PremCom :comments="comments"/>
    </div>
</template>
<script>
export default {
    async asyncData(context){
        const {data} = await  context.$axios.get('/admin/comments')
        
        return {
            comments : data
        }
    },
}
</script>