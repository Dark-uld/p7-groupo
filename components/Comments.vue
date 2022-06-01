<template>
    <div>
        <div class="app-post" v-for="(comment,index) in comments" :key="`${comment.id}`">
            <div class="app-post-container">
                <div class="app-post-head">
                    <div class="app-post-name">{{comment.User.name}} </div> 
                    <div class="app-post-date">{{newDate(comment.createdAt)}}</div>
                </div>
                <div>
                    {{comment.content}}
                    <div v-if="`${comment.createdAt}` != `${comment.updatedAt}`"> Modifié le {{newDate(comment.updatedAt)}}</div>
                </div>
                <div v-if="`${comment.userid}`==`${$auth.user.id}`">
                    <button v-on:click="showForm(comment.id)">Modifier</button>
                    <form :id="`${comment.id}`" action=""
                    method="put"
                    @submit.prevent="modifyComment()"
                    hidden>
                        <div>
                            <label for="comContent">Modifier le commentaire</label>
                            <input type="text" v-model="content" id="comContent" value="lol">
                        </div>
                        <input type="submit" value="Valider" >
                        <button v-on:click="showForm(comment.id)">Annuler</button>
                    </form>
                    <!-- <button>Supprimer</button> -->
                </div>
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
        showForm(value){
            let form = document.getElementById(value);
            if(form.hasAttribute('hidden')){
                form.removeAttribute('hidden')
            } else {
                form.setAttribute('hidden', true)
            }
        },
        modifyComment(){
            this.$axios.put( '/comments/' + event.srcElement.id , {
                postid: this.$route.params.id,
                content: this.content,
                userid:this.$auth.user.id,
            })
            .then((response) => {
                console.log("Commentaire Modifié")
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
    data(){
        return {
            content:null,
        }
    },
}
</script>

<style lang="scss">

</style>