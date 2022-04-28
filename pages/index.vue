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
      <AllPost :posts="posts"/>
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
  
  async asyncData(context){
      const {data} = await context.$axios.get('/posts')
      return {
      posts : data
      }
  },
}
</script>
