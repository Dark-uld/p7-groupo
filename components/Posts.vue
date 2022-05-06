<template>
    <div>
        <nuxt-link class="app-post" v-for="(post,index) in posts" :to="`/posts/${post.id}`" :key="index">
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
                    <button  @click="showAth()">like</button>
                </div>
            </div>
        </nuxt-link>
    </div>
        
</template>

<script>
import newDate from '~/utils/newDate'
import retrieveUrl from '~/utils/retrieveUrl'
import getPreview from '~/utils/getPreview'
import axios from 'axios'
export default {
  methods: {
      newDate,
      retrieveUrl,
      getPreview
  },
  props:{
    posts: {
      type: Array,
      default: []
    }
  },
}
</script>

<style>
</style>