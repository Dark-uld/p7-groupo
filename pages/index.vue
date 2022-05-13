<template>
<div class="app-main app-flex-col app-center">
  <div class="app-main-box">
    <h1 class="app-title text-redter">Bienvenue sur Groupomania</h1>
    <div v-if="!$auth.loggedIn" class="app-main-menu app-flex-col app-jaic">
      <nuxt-link class="app-main-btn text-redter bg-redsec" to='/signup'>Créer un nouveau compte</nuxt-link>
      <nuxt-link class="app-main-btn text-redter bg-redsec" to='/login'>Se connecter</nuxt-link>
    </div>
    <div v-if="$auth.loggedIn">
      <div v-if="$route.params.created=='yes'">Post créé !</div>
      <div v-if="$route.params.deleted=='yes'">Post supprimé !</div>
      <h1> Liste des posts</h1>
      <div>
          <nuxt-link to="posts/newpost">Créer un nouveau post</nuxt-link>
          <button @click="userState()">User</button>
      </div>
      <div>
        <Posts :posts="posts"/>
      </div>
    </div>
     
  </div>
</div>
 
</template>

<script>
export default {
  head(){
        return {
            title:'Accueil',
            meta: [{
                name: 'description',
                content: "Voici la page d'accueil",
                hid: 'description'
            }]
        }
  },
  methods:{
      userState(){
        console.log(this.$auth.hasScope('isAdmin'));
      }
  },
  async asyncData(context){
      const {data} = await context.$axios.get('/posts')
      return {
      posts : data
      }
  },
  
}
</script>
