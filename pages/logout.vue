<template>
  <div class="relative h-full">
    <div class="app-logout" z-index="50">
        <img class="app-loading"src="/images/icons/icons8-loading-100.png" alt="loading logo"/>
    </div>
    <h1>Logging out</h1>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  head(){
    return {
        title: 'En cours de déconnection',
        meta: [{
            name: 'description',
            content: `Vous vous déconnectez du site Groupoamania`,
            hid: 'description'
        }]
    }
  },
  async asyncData(context){
      context.$auth.logout()
  },
}
</script>
