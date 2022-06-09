<template>
<div class="app">
    <div>
    <header class="app-header bg-redprim">
        <div>
            <nuxt-link to="/" aria-label="Vers la page d'accueil" title="Vers la page d'accueil"><img src="/images/LogoS/icon-above-font.png" class="app-logo app-rounded" alt="Logo de Groupomania"></nuxt-link>
        </div>
        <div>
        </div>
        <div> 
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
    </div>
    
    <footer class="app-footer bg-redprim app-flex-col app-center">
        <div>Groupamania ©2022 </div>
        <div class="app-flex-row">
            <div>Create icon by <a target="_blank" href="https://icons8.com">Icons8</a></div>
            // 
            <div>Contactez le support</div>
        </div>
    </footer>
</div>
</template>

<script>
export default {
   
}
</script>

<style lang="scss">

</style>