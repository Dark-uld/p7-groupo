<template>
    <div class="app-flex-col gap-8 max-w-full align-center">
    
        <div class="app-post app-flex-row" v-for="(post,index) in posts"  :key="index">
        <!-- Like -->
            <div class="app-flex-col">
                    <button  v-if="!checkLike(post.id)" @click="handleLiking(post.id, checkLike(post.id))">
                        <img class="app-like" src="/images/icons/icons8-heart-20.png" alt="Ajouter un like"  tabindex="-1"/>
                    </button>
                    <button  v-if="checkLike(post.id)" @click="handleLiking(post.id, checkLike(post.id))">
                        <img class="app-like" src="/images/icons/icons8-heartfilled-20.png" alt="Retirer un like"  tabindex="-1"/>
                    </button>
                    <div class="ml-1">{{ postLikes(post.id) }}</div>
            </div>
             <!-- Post-->
            <div class="app-post-container space-y-0.5">
                <h2>{{post.title}}</h2>
                <div class="app-post-head">
                    <div class="mr-1.5">Posté par {{post.User.name}} </div> 
                    <div>le {{newDate(post.createdAt)}}</div>
                </div>
                 <!-- Preview si link présent dans content -->
                <div v-if="post.Image || post.urlTitle || post.urlDesc" :id="`${post.id}`" class="app-preview-link app-flex-col app-center"> 
                    <a class="app-flex-col app-center max-w-full" :href="post.url" target="_blank" rel="noopener noreferrer" aria-label="`Lien Article intitulé ${post.urlTitle}`" >
                        <article class="app-preview-content app-center">
                        <div v-if="post.urlImage">
                            <img :src="post.urlImage" alt="Image app-preview de l'article" class="app-preview-img"/>
                        </div>
                        <div v-if="post.urlTitle || post.urlDesc">
                            <h3 class="app-preview-title app-olap" v-if="`${post.urlTitle}`">{{post.urlTitle}}</h3>
                            <div class="app-preview-desc  app-olap whitespace-nowrap" v-if="`${post.urlDesc}`">{{post.urlDesc}}</div>
                        </div>
                        
                        </article>
                    </a>
                </div>
                <div class="max-w-xl app-olap" v-html="getUrl(post.content, post.id)" ></div>
                <div v-if="`${post.createdAt}` != `${post.updatedAt}`" class="text-xs"> Modifié le {{newDate(post.updatedAt)}}</div>
                <div class="flex justify-around">
                    <div class="flex items-center"> {{pluriel(post.Comments.length)}}</div>
                    <nuxt-link :to="`/posts/${post.id}`" class="app-but app-butValid">Voir plus</nuxt-link>
                </div>    
            </div>

        </div>
    </div>
</template>

<script>
import newDate from '~/utils/newDate'
import axios from 'axios'
import store from '~/store/index'
import pluriel from '~/utils/pluriel'
import getUrl from '~/utils/getUrl'
export default {
    
    middleware: 'auth',
    data(){
        return{
            postid:null,
        }
    },
    methods: {
        // modifie la date dans un format lisible
        newDate,
        // verifie le nombre de commentaire et retourne un texte correspondant
        pluriel,
        //Verifie si le contenu contient une url et renvoie un texte correspondant
        getUrl,
        // fonction  like et dislike le post
        handleLiking(value, check) {
            let alreadyLiked = check
            if(!alreadyLiked){
                this.$axios.post( '/likes', {
                        postid: value,
                        userid:this.$auth.user.decoded.id
                })
                .then((response) => {
                   this.$store.dispatch('fetchLikes')
                })
                .catch( (error) => {
                    console.log(error);
                });
            } else {
                this.$axios.delete('/likes/' + value)
                .then((response) => {
                    this.$store.dispatch('fetchLikes')
                })
                .catch( (error) => {
                    console.log(error);
                });
            }
        },
        // fonction verifie si post liked par user
        checkLike(value){
            let listLikes = this.$store.state.postLiked
            let postAlreadyLiked=false
            for(let i=0; i<listLikes.length; i++){
                if(listLikes[i].postid == value && listLikes[i].userid == this.$auth.user.decoded.id ){
                    postAlreadyLiked=true
                }
            }

            return postAlreadyLiked
        },
        // fonction verifie le nombre de likes par post
        postLikes(value){
            let listLikes = this.$store.state.postLiked
            let numberOfLikes = 0
            for(let i=0; i < listLikes.length;i++ ) {
                if(listLikes[i].postid == value ){
                    numberOfLikes++
                }
            }
            return numberOfLikes
            
        }

    },
    props:{
        posts: {
        type: Array,
        default: []
        },
    },
    computed: {
        postLiked(){
            return this.$store.state.postLiked
        }
    },
    async fetch() {
        await this.$store.dispatch('fetchLikes')
    }
    
}
</script>

<style lang="scss">
</style>