<template>
<div>
      <div v-if="$route.params.created=='yes'">Post créé !</div>
      <div v-if="$route.params.deleted=='yes'">Post supprimé !</div>
      <h1> Liste des posts</h1>
      <div>
          <nuxt-link to="/posts/newpost">Créer un nouveau post</nuxt-link>
          <button @click="userState()">User</button>
      </div>
      <div>
        <div v-if="posts.length>0">
          <Posts :posts="posts"/>
        </div>
        <div v-if="posts.length==0">Pas de post</div>
      </div>
</div>
     
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import store from '~/store/index'

export default {
    middleware:'auth'
    ,
    head(){
        return {
            title: 'Espace Employé',
            meta: [{
                name: 'description',
                content: `Bienvenue sur le site de Groupomania, un espace de partage avec vos collègues de vos récentes découvertes: articles, memes...`,
                hid: 'description'
            }]
        }
    },
    created(){
    },
    methods:{
        userState(value){
            let user = value
        console.log(user.hasScope('isAdmin'));
        },

    },
    async asyncData(context){
        const {data} = await  context.$axios.get('/posts')
        
        return {
            posts : data
        }
    },
    async fetch() {
        await this.$store.dispatch('fetchUser', this.$auth.user.id)
    },
}
</script>