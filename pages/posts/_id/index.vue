<template>
    <div>
        <div class="app-post-bord">
                    <img src="/images/LogoS/icon-above-font.png" class="app-post-logo app-rounded"/>
        </div>
        <div class="app-post-container">
            <div class="app-post-head">
                <div class="app-post-name">{{post[0].User.name}} </div> 
                <div class="app-post-date">{{newDate(post[0].createdAt)}}</div>
            </div>
            <div>{{post[0].title}}</div>
            <div>
                {{post[0].content}}
                <div v-if="`${post[0].createdAt}` != `${post[0].updatedAt}`"> Modifié le {{newDate(post[0].updatedAt)}}</div>
            </div>
            <div>
                <nuxt-link v-if="`${post[0].userid}`==`${$auth.user.id}`" :to="`/posts/${post[0].id}/modifypost`">Modifier</nuxt-link>
            </div>
            <div>
                <button>Comment</button>
                <button>like</button>
            </div>
        </div>
    </div>
    
</template>
<script>
import newDate from '~/utils/newDate'
export default {
  middleware: 'auth',
  methods: {
      newDate,
  },
  async asyncData(context){

      const {data} = await context.$axios.get('/posts/'+context.route.params.id)
      return {
      post : data
      }
    }
}
</script>