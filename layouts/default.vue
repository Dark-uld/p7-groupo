<template>
<div class="app">
    <header class="app-header">
        <div>
            <img src="/images/LogoS/icon-above-font.png" class="app-logo app-rounded" alt="Logo de Groupomania">
        </div>
        <div class='app-flex-row'>
            <div v-if="$auth.loggedIn">
                <nuxt-link  class='app-navbar' to="/posts">Home</nuxt-link>
                <nuxt-link v-if="userCon.isAdmin" class='app-navbar' to="/admin">AdminPage</nuxt-link>
                <nuxt-link  class='app-navbar' to="/logout" >Logout</nuxt-link>
            </div>
            <div  v-if="!$auth.loggedIn">
                <nuxt-link  class='app-navbar' to="/">Home</nuxt-link>
                <nuxt-link   class='app-navbar' to="/login">Login</nuxt-link>
                <nuxt-link   class='app-navbar' to="/signup">Sign Up</nuxt-link>
            </div>
        </div>
    </header>
    <nuxt/>
</div>
</template>

<script>
export default {
    computed: {
        userCon(){
            return this.$store.state.userCon
        }
    },
}
</script>

<style lang="scss">

</style>