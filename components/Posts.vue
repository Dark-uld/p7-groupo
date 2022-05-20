<template>
    <div>
        <div class="app-post" v-for="(post,index) in posts"  :key="index">
            <div class="app-post-container">
                <div class="app-post-head">
                    <div class="app-post-name">{{post.User.name}} </div> 
                    <div class="app-post-date">{{newDate(post.createdAt)}}</div>
                </div>
                <div>{{post.title}}</div>
                <div>
                    <div v-if="`${retrieveUrl(post.content)}`" ><div :id="`${post.id}`">  {{getPreview(post.content,post.id)}}</div></div>
                    {{post.content}}

                    <div v-if="`${post.createdAt}` != `${post.updatedAt}`"> Modifié le {{newDate(post.updatedAt)}}</div>
                </div>
                <div>
                    {{postLiked}}
                    <button v-if="!checkLike(post.id)" @click="handleLiking(post.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                        </svg>
                    </button>
                    <button  v-if="checkLike(post.id)" @click="handleLiking(post.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                        </svg>
                    </button>
                </div>
            </div>
            <nuxt-link :to="`/posts/${post.id}`">Voir plus</nuxt-link>
        </div>
    </div>
        
</template>

<script>
import newDate from '~/utils/newDate'
import retrieveUrl from '~/utils/retrieveUrl'
import getPreview from '~/utils/getPreview'
import axios from 'axios'
import store from '~/store/index'
export default {
    methods: {
        newDate,
        retrieveUrl,
        getPreview,
        handleLiking(value) {
            this.$store.commit('liking', value)
        },
        checkLike(value){
            let listPost= this.$store.state.postLiked
            let postAlreadyLiked=false
            for(let i=0; i<listPost.length; i++){
                if(listPost[i]==value){
                    postAlreadyLiked=true
                }
            }
            return postAlreadyLiked
        }

    },
  props:{
    posts: {
      type: Array,
      default: []
    }
  },
  computed: {
    like() {
        return this.$store.state.like
    },
    postLiked(){
        return this.$store.state.postLiked
    },
  },
}
</script>

<style>
</style>