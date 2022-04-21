<template>
  <div class="app-main app-flex-col app-center">
    <div class="app-main-box">
        <h1 class="app-title text-redter">Se connecter</h1>
        <hr>

    

        <div class="">
            <div class="">
                <form action=""
                method="post"
                >

                <div class="app-flex-col">
                    <label for="">Votre email</label>
                    <input type="text" class=""
                    :class="{ 'is-invalid': errors && errors.email }"
                    v-model="email">
                    
                </div>

                <div class="app-flex-col">
                    <label for="">Votre mot de passe</label>
                    <input type="password" class=""
                    :class="{ 'is-invalid': errors && errors.password }"
                    v-model="password">
                    
                </div>

                

                <input type="submit" value="Login" class="">
                <nuxt-link to="/" class="">Cancel</nuxt-link>

                </form>
            </div>
        </div>
    </div>
    
  </div>
</template>

<script>
export default {
 
}
</script>