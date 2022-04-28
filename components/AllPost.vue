<template>
    <div>
        <h1> Liste des posts</h1>
        <div>
            <nuxt-link to="posts/newpost">Créer un nouveau post</nuxt-link>
        </div>
        <nuxt-link class="app-post" v-for="(post,index) in posts" :to="`/posts/${post.id}`" :key="index">
            <div class="app-post-bord">
                <img src="/images/LogoS/icon-above-font.png" class="app-post-logo app-rounded"/>
            </div>
            <div class="app-post-container">
                <div class="app-post-head">
                    <div class="app-post-name">{{post.User.name}} </div> 
                    <div class="app-post-date">{{newDate(post.createdAt)}}</div>
                </div>
                <div>{{post.title}}</div>
                <div>
                    {{post.content}}
                    <div v-if="`${post.createdAt}` != `${post.updatedAt}`"> Modifié le {{newDate(post.updatedAt)}}</div>
                </div>
                <div>
                    <button>Comment</button>
                    <button  @click="showAth()">like</button>

                </div>
            </div>
        </nuxt-link>
    </div>
        
</template>

<script>
import newDate from '~/utils/newDate'
export default {
  methods: {
      newDate,
      showAth(){
          console.log($auth.user)
      }
  },
    props:{
    posts: {
      type: Array,
      default: []
    }
  }
}
</script>