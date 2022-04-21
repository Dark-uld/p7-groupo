<template>
<div class="app-main app-flex-col app-center">
  <div class="app-main-box">
    <h1 class="app-title text-redter">Bienvenue sur Groupomania</h1>
    <div class="app-main-menu app-flex-col app-jaic">
      <nuxt-link class="app-main-btn text-redter bg-redsec" to='/signup'>Créer un nouveau compte</nuxt-link>
      <nuxt-link class="app-main-btn text-redter bg-redsec" to='/login'>Se connecter</nuxt-link>
    </div>
  </div>
</div>
 
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>
