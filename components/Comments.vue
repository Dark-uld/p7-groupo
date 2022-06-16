<template>
    <div>
        <div class="app-com" v-for="(comment,index) in comments" :key="`${comment.id}`">
          <!-- Commentaire -->
            <div class="app-post-container">
                <div class="app-post-head italic">
                    <div class="app-post-name">Par {{comment.User.name}}</div> 
                    <div class="app-post-date">&nbsp le {{newDate(comment.createdAt)}}</div>
                </div>
                <div>
                    {{comment.content}}
                    <div v-if="`${comment.createdAt}` != `${comment.updatedAt}`" class="text-sm"> Modifié le {{newDate(comment.updatedAt)}}</div>
                </div> 
                 <!-- Partie pour modifier le commentaire -->
                <div v-if="`${comment.userid}`==`${$auth.user.decoded.id}`">
                    <button v-on:click="showForm(comment.id)" class="app-but app-butCom app-butValid" >Modifier</button>
                    <form :id="`${comment.id}`" action=""
                    method="put"
                    @submit.prevent="modifyComment(`comCont${comment.id}`)"
                    hidden>
                        <div>
                            <label :for="`comCont${comment.id}`">Modifier le commentaire</label>
                            <input type="text"  :id="`comCont${comment.id}`" :value="`${comment.content}`" class="app-formCom" >
                        </div>
                        <input type="submit" value="Valider" class="app-but app-butCom app-butValid " >
                        <button v-on:click="showForm(comment.id)" class="app-but app-butCom app-butCancel" >Annuler</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
        
</template>

<script>
import newDate from '~/utils/newDate'
import verifyContent from '~/utils/verifyContent'
export default {
    middleware:'auth',
    methods: {
        newDate,
        verifyContent,
        // Affiche ou cache le formulaire pour modifier un commentaire
        showForm(value){
            let form = document.getElementById(value);
            if(form.hasAttribute('hidden')){
                form.removeAttribute('hidden')
            } else {
                form.setAttribute('hidden', true)
            }
        },
        // modifier un commentaire
        modifyComment(value){
            if(verifyContent(this.content) ) {
                
                return alert("Le commentaire contient des caratères interdits : |[]{};)")
            }
            let commentaire = document.getElementById(value);
            this.$axios.put( '/comments/' + event.srcElement.id , {
                postid: this.$route.params.id,
                content: commentaire.value,
                userid:this.$auth.user.decoded.id,
            })
            .then((response) => {
                console.log("Commentaire Modifié")
                window.location.reload(true)
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
            listComment:null,
        }
    },
}
</script>