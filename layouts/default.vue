<template>
<div class="app">
    <header class="app-header">
        <div >
            <img src="/images/LogoS/icon-above-font.png" class="app-logo app-rounded"/>
        </div>
        <div class="app-search">
            
        </div>
        <div class='app-navbar'>
            <div>
                <nuxt-link   class='app-navbar-item' to="/">Home</nuxt-link>
            </div>
            <div>
                <nuxt-link  class='app-navbar-item' to="/logout" >Logout</nuxt-link>
            </div>
            <div>
                <nuxt-link   class='app-navbar-item' to="/login">Login</nuxt-link>
                <nuxt-link   class='app-navbar-item' to="/signup">Sign Up</nuxt-link>
            </div>
        </div>
    </header>
    <nuxt/>
</div>
</template>

<script>
</script>