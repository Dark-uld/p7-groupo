<template>
  <div class="app-body app-flex-col items-center">
    <h1 v-if="error.statusCode === 404">Error 404 <br>Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <NuxtLink to="/" class="app-but app-butValid w-36">Page d'accueil</NuxtLink>
    <img src="/images/error.webp" class="max-w-750"/>
    
  </div>
</template>

<script>
  export default {
    props: ['error'],
    head(){
        return {
            title:'Erreur',
            meta: [{
                name: 'description',
                content: "Erreur lors du chargement de la page",
                hid: 'description'
            }]
        }
    },
    layout: 'error' // you can set a custom layout for the error page
  }
</script>
