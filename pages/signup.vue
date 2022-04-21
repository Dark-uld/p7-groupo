<template>
  <div class="app-main app-flex-col app-center">
    <div class="app-main-box">
        <h1 class="app-title text-redter">Créer un nouveau compte</h1>
        <hr>

        <div >
            <div >
                <form action=""
                method="post"
                >

                <div class="app-flex-col">
                    <label for="">Votre nom</label>
                    <input type="text" class="form-control"
                    :class="{ 'is-invalid': errors && errors.name }"
                    v-model="name">
                
                </div>

                <div class="app-flex-col">
                    <label for="">Votre email</label>
                    <input type="text" 
                    :class="{ 'is-invalid': errors && errors.email }"
                    v-model="email">
                    
                </div>

                <div class="app-flex-col">
                    <label for="">Choisissez un mot de passe</label>
                    <input type="password" class="form-control"
                    :class="{ 'is-invalid': errors && errors.password }"
                    v-model="password">
                    
                </div>

                <input type="submit" value="Register">
                <nuxt-link to="/" >Cancel</nuxt-link>

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