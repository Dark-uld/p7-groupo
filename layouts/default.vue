<template>
<div class="app">
    
    <header class="app-header bg-redprim">
        <div class="app-flex-row justify-between w-full">
            <nuxt-link to="/" aria-label="Vers la page d'accueil" title="Vers la page d'accueil"><img src="/images/LogoS/icon-above-font.png" class="app-logo app-rounded" alt="Logo de Groupomania"></nuxt-link>
            <button :class="['app-but','app-but-menu','block', {'change': toggled}]" @click="showMenu" aria-label="Show Menu">
                    <div class="app-bar1" index="-1"></div>
                    <div class="app-bar2" index="-1"></div>
                    <div class="app-bar3" index="-1"></div>
            </button>
        </div>
        <div :class="['app-navContainer',{'change': toggled}]" >
            
            <ul v-if="$auth.loggedIn" class="app-navbar gap-1 flex md:flex-row flex-col">
                <li>
                    <nuxt-link  class='app-navitem app-flex-row ' to="/posts" aria-label="Vers la page d'accueil" title="Vers la page d'accueil"> 
                        <img src="/images/icons/icons8-home-35.png" alt="Icone Home" class="app-navicon"/> 
                        <span>Home</span>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link class='app-navitem app-flex-row' to="/admin" v-if="$auth.user.isAdmin" aria-label="Vers la page d'admin" title="Vers la page d'admin">
                        <img src="/images/icons/icons8-admin-35.png" alt="Icone Admin " class="app-navicon"/>
                        <span>AdminPage</span>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link  class='app-navitem app-flex-row' to="/myaccount" aria-label="Vers la page mon compte" title="Vers la page mon compte">
                        <img src="/images/icons/icons8-account-35.png" alt="Icone Account" class="app-navicon"/>
                        <span>Mon compte</span>
                    </nuxt-link>
                </li>
                
                <li>
                    <nuxt-link  class='app-navitem app-flex-row' to="/logout" aria-label="Se déconnecter" title="Se déconnecter">
                        <img src="/images/icons/icons8-logout-35.png" alt="Icone Logout" class="app-navicon"/>
                        <span>Logout</span>
                    </nuxt-link>
                </li>
            </ul>
            <ul v-if="!$auth.loggedIn" class="app-navbar gap-1 flex md:flex-row flex-col">
                <li>
                    <nuxt-link  class='app-navitem app-flex-row' to="/" aria-label="Vers la page d'accueil" title="Vers la page d'accueil">
                        <img src="/images/icons/icons8-home-35.png" alt="Icone Home" class="app-navicon"/>
                        <span>Home</span>
                    </nuxt-link>
                </li>
                <li><nuxt-link   class='app-navitem app-flex-row' to="/login" aria-label="Vers la page de connection" title="Vers la page de connection">
                        <img src="/images/icons/icons8-login-35.png" alt="Icone Login" class="app-navicon"/>
                        <span>Se connecter</span>
                    </nuxt-link>
                </li>
                <li><nuxt-link   class='app-navitem app-flex-row' to="/signup" aria-label="Vers la page de creation de compte" title="Vers la page de creation de compte">
                        <img src="/images/icons/icons8-signin-35.png" alt="Icone Signup" class="app-navicon"/>
                        <span>S'enregistrer</span>
                    </nuxt-link>
                </li>
            </ul>
        </div>
    </header>
    <nuxt/>
    
    
    <footer class="app-footer bg-redprim app-flex-col app-center">
        <div class="mb-4">Groupamania ©2022 </div>
        <div class="flex w-full justify-center ">
            <ul class="w-full justify-between flex md:flex-row flex-col gap-1.5"> 
                <li class="flex md:w-2/6 justify-center md:order-2"><a href="mailto:r.pirate94@gmail.com">Contactez le support</a></li>
                <li class="flex md:w-2/6 w-full  justify-center  md:order-1">Create icon by <a target="_blank" href="https://icons8.com">Icons8</a></li>
                
                <li class="flex md:w-2/6 justify-center  md:order-3"><a href='https://www.freepik.com/vectors/restrictions'>Restrictions vector created by pch.vector - www.freepik.com</a></li>
            </ul>
        </div>
    </footer>
</div>
</template>

<script>
export default {
    data() {
        return {
            toggled: false
        }
    },
    methods:{
       showMenu(){
           this.toggled = !this.toggled
       }
   }
}
</script>