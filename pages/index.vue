<template>
<div class="app-body">
    <h1 class="text-redter">Bienvenue sur Groupomania</h1>
    <div  class="app-flex-col app-jaic">
      <nuxt-link class="app-but app-butValid" to='/signup'>Créer un nouveau compte</nuxt-link>
      <nuxt-link class="app-but app-butValid" to='/login'>Se connecter</nuxt-link>
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
  middleware: 'loggedIn'
  
}
</script>
