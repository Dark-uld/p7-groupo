<template>
  <div>
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