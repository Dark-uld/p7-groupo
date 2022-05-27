<template>
  <div>
    <h1>Logging out</h1>
    <hr>

    <p>Please wait...</p>
  </div>
</template>

<script>
import store from '~/store/index'
export default {
  middleware: 'auth',
  methods: {
  },
  /*async asyncData(context){
      await Promise.all([
        context.$store.commit('resetUser'),
        context.$auth.logout()
     ])
  },*/
  async fetch(){
      await Promise.all([
        this.$store.commit('resetUser'),
        this.$auth.logout()
     ])
  }
}
</script>