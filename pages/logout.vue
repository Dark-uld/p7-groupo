<template>
  <div class="relative h-full">
    <div class="app-logout" z-index="50">
        <img class="app-loading"src="/images/icons/icons8-loading-100.png"/>
    </div>
    <h1>Logging out</h1>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  methods: {
  },
  async asyncData(context){
      context.$auth.logout()
  },
}
</script>
