<template>
    <div class="app-body">
      <!-- Post -->
        <div class="app-post-container">
            <h1>{{post.title}} </h1>
            <div v-if="`${post.userid}`==`${$auth.user.decoded.id}`">
                <nuxt-link  :to="`/posts/${post.id}/modifypost`"  class="app-but app-butValid">Modifier</nuxt-link>
                <button @click="deleteRecord()" class="app-but app-butCancel">Delete</button>
            </div>
            <div class="mb-5">
                  <!-- Affichage d'une preview si url existante et valide -->
                <div v-if="post.Image || post.urlTitle || post.urlDesc" :id="`${post.id}`" class="app-preview-link app-flex-col app-center"> 
                    <a class="app-flex-col app-center max-w-full" :href="post.url" target="_blank" rel="noopener noreferrer" aria-label="`Lien Article intitulé ${post.urlTitle}`" >
                        <article class="app-preview-content app-center">
                            <div v-if="post.urlImage">
                                <img :src="post.urlImage" alt="Image app-preview de l'article" class="app-preview-img"/>
                            </div>
                            <div v-if="post.urlTitle || post.urlDesc">
                                <h2 class="app-preview-title app-olap" v-if="`${post.urlTitle}`">{{post.urlTitle}}</h2>
                                <div class="app-preview-desc  app-olap whitespace-nowrap" v-if="`${post.urlDesc}`">{{post.urlDesc}}</div>
                            </div>
                        </article>
                    </a>
                </div>
                <div class="app-flex-col">
                    <div class="max-w-full " v-html="getUrl(post.content, post.id)" ></div>
                    <div v-if="`${post.createdAt}` != `${post.updatedAt}`" class="text-sm"> Modifié le {{newDate(post.updatedAt)}}</div>
                </div>

            </div>
            <hr/>
            <hr/>
            <div class="mb-5">
              <!-- Envoyer du commentaire -->
                <form action=""
                method="post"
                @submit.prevent="submitForm()">
                    <div>
                        <label for="comment">Envoyez un commentaire</label>
                        <input id="comment" type="text" v-model="content" class="app-formCom" placeholder="Ajouter un commentaire">
                    </div>
                    <input type="submit" value="Commentez"  class="app-but app-butCom app-butValid">
                </form>
            </div>
            <hr/>
            <hr/>
            <div>
                <div v-if="!`${post.Comments}`">No Comment</div>
                <div v-else>
                    <Comments :comments="post.Comments"/>
                </div>
            </div>
        </div>
    </div>
    
</template>
<script>
import newDate from '~/utils/newDate'
import axios from 'axios'
import getUrl from '~/utils/getUrl'
import verifyContent from "~/utils/verifyContent"

export default {
    head(){
        return {
            title: this.post.title,
            meta: [{
                name: 'description',
                content: `Ce post a été créé par ${this.post.User.name}`,
                hid: 'description'
            }]
        }
    },
    
    middleware: 'auth',
    data(){
        return{
        errors:null,
        content:null,
        userid:null,
        postid:null,
        comments:[]
        }
    },
    methods: {
        newDate,
        getUrl,
        // Supprimer un post
        deleteRecord(){
            if(confirm("Êtes-vous sure?") === true){
                this.$axios.delete('/posts/' + this.$route.params.id)
                .then((response) => {
                    this.$router.push({ name:'posts'})
                    alert("Post supprimé")
                })
                .catch( (error) => {
                    console.log(error);
                });
            }
        },
         // Ajouter un commentaire
        submitForm(){
            if(verifyContent(this.content) ) {
                return alert("Le commentaire contient des caratères interdits : |[]{};)")
            }
            this.$axios.post( '/comments', {
                postid: this.$route.params.id,
                content: this.content,
                userid:this.$auth.user.decoded.id
                })
                .then((response) => {
                console.log("Commentaire Créé")
                this.$nuxt.refresh()
                })
                .catch( (error) => {
                console.log(error)
                if(error.response.data.errors){
                    this.errors = error.response.data.errors
                }
                });
        },
        
    },
    async asyncData(context){
        const {data} = await context.$axios.get('/posts/'+ context.route.params.id)
        return {
            post : data
        }
    },

}
</script>