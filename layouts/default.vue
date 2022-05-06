<template>
<div class="app">
    <header class="app-header">
        <div >
            <img src="/images/LogoS/icon-above-font.png" class="app-logo app-rounded"/>
        </div>
        <div class="app-search">
            
        </div>
        <div class='app-flex-row'>
            <div>
                <nuxt-link   class='app-navbar' to="/">Home</nuxt-link>
            </div>
            <div >
                <nuxt-link class='app-navbar' to="/admin">Admin Page</nuxt-link>
            </div>
            <div v-if="$auth.loggedIn">
                <nuxt-link  class='app-navbar' to="/logout" >Logout</nuxt-link>
            </div>
            <div  v-if="!$auth.loggedIn">
                <nuxt-link   class='app-navbar' to="/login">Login</nuxt-link>
                <nuxt-link   class='app-navbar' to="/signup">Sign Up</nuxt-link>
            </div>
        </div>
    </header>
    <nuxt/>
</div>
</template>

<script>
</script>

<style lang="scss">

</style>