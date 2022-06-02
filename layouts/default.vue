<template>
<div class="app">
    <header class="app-header">
        <div>
            <img src="/images/LogoS/icon-above-font.png" class="app-logo app-rounded" alt="Logo de Groupomania">
        </div>
        <div class='app-flex-row'>
            <div v-if="$auth.loggedIn">
                <nuxt-link  class='app-navbar' to="/posts">Home</nuxt-link>
                <nuxt-link class='app-navbar' to="/admin" v-if="$auth.user.isAdmin">AdminPage</nuxt-link>
                <nuxt-link  class='app-navbar' to="/myaccount" >Mon compte</nuxt-link>
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
}
</script>

<style lang="scss">

</style>