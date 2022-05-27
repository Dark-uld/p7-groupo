<template>
    <div>
        <div class="app-post app-flex-col" v-for="(post,index) in posts"  :key="index">
            <div class="app-post-container">
            
                <div class="app-post-head">
                    <div class="app-post-name">{{post.User.name}} </div> 
                    <div class="app-post-date">{{newDate(post.createdAt)}}</div>
                </div>
                <div>{{post.title}}</div>
                <div>
                    <div v-if="`${retrieveUrl(post.content)}`" :id="`${post.id}`" class="preview-link app-flex-col app-center"> 
                        {{linkPreview(post.content,post.id)}}
                    </div>
                    {{post.content}}

                    <div v-if="`${post.createdAt}` != `${post.updatedAt}`"> Modifié le {{newDate(post.updatedAt)}}</div>
                </div>
                <div>
                    <button v-if="!checkLike(post.id)" @click="handleLiking(post.id, checkLike(post.id))">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                        </svg>
                        <span>{{ postLikes(post.id) }}</span>
                    </button>
                    <button v-if="checkLike(post.id)" @click="handleLiking(post.id, checkLike(post.id))">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                        </svg>
                        <span>{{ postLikes(post.id) }}</span>
                    </button>
                </div>
            </div>
            <div class="flex justify-end">
            <nuxt-link :to="`/posts/${post.id}`">Voir plus</nuxt-link>
            </div>
        </div>
    </div>
        
</template>

<script>
import newDate from '~/utils/newDate'
import retrieveUrl from '~/utils/retrieveUrl'
import linkPreview from '~/utils/linkPreview'
import axios from 'axios'
import store from '~/store/index'
export default {
    
    middleware: 'auth',
    data(){
        return{
            postid:null,
        }
    },
    methods: {
        newDate,
        retrieveUrl,
        linkPreview,
        handleLiking(value, check) {
            let alreadyLiked = check
            if(!alreadyLiked){
                this.$axios.post( '/likes', {
                        postid: value,
                        userid:this.$auth.user.id
                })
                .then((response) => {
                   this.$store.dispatch('fetchLikes')
                })
                .catch( (error) => {
                console.log(error)
                if(error.response.data.errors){
                    this.errors = error.response.data.errors
                }
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
        checkLike(value){
            let listLikes = this.$store.state.postLiked
            let postAlreadyLiked=false
            for(let i=0; i<listLikes.length; i++){
                if(listLikes[i].postid == value && listLikes[i].userid == this.$auth.user.id ){
                    postAlreadyLiked=true
                }
            }

            return postAlreadyLiked
        },
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
.preview {
    &-link{
        width:95%;
        padding: 2%;
        border: 1px solid black;
        border-radius: 5px;
    }
    &-content{
        width:96%;
    }
    &-preview-img-container{

    }
    &-title{
        
    }
    &-desc{

    }
}
</style>