<template>
    <div>
        <div class="app-post" v-for="(comment,index) in comments" :key="`${comment.id}`">
            <div class="app-post-container">
                <div class="app-post-name">{{comment.User.name}} </div> 
                <div class="app-post-date">{{newDate(comment.createdAt)}}</div>
                <div> {{comment.content}}</div>
                <div class="app-post-date">{{newDate(comment.createdAt)}}</div>
                <div v-if="`${comment.createdAt}` != `${comment.updatedAt}`">{{newDate(comment.updatedAt)}}</div>
                <button v-on:click="deleteComment()">Supprimer</button>
            </div>
        </div>
    </div>
        
</template>

<script>
import newDate from '~/utils/newDate'
export default {
    middleware:'auth',
    methods: {
        newDate,
        deleteComment(){
            this.$axios.delete( '/admin/comments/' + event.srcElement.id)
            .then((response) => {
                console.log("Commentaire Supprimé")
                location.reload()
            })
            .catch( (error) => {
                console.log(error)
                if(error.response.data.errors){
                    this.errors = error.response.data.errors
                }
            });
        }
    },
    props:{
        comments: {
        type: Array,
        default: []
        }
    },
}
</script>

<style lang="scss">

</style>