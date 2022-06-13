<template>
  <div class="app-body relative">
    <div class="app-logout" z-index="50">
        <img class="app-loading"src="/images/icons/icons8-loading-100.png" alt="loading logo"/>
    </div>


    <form action="" class="app-form"
    method="post"
    @submit.prevent="submitForm()">
      <h1>Se connecter</h1>
      <div class="app-flex-col app-formCat">
        <label for="userMail" class="flex app-center">Votre email</label>
        <input id="userMail" type="text" class="flex text-center app-formInp"
          :class="{ 'is-invalid': errors && errors.email }"
          v-model="email"
          @change="verifMail()"
          aria-label="email">
        <div id="mailError" class="app-err"></div>
      </div>

      <div class="app-flex-col app-formCat">
        <label for="userPass" class="flex app-center">Votre mot de passe</label>
        <input id="userPass" type="password" class="flex text-center app-formInp"
          :class="{ 'is-invalid': errors && errors.password }"
          v-model="password"
          @change="verifPass()"
          aria-label="password">
        <div id="passError" class="app-err"></div>
      </div>
      
      <div class="flex justify-around">
        <input type="submit" value="Login" class="app-but app-butValid">
        <nuxt-link to="/" class="app-but app-butCancel">Cancel</nuxt-link>
      </div>

    </form>
  </div>
</template>

<script>
import verifMail from "~/utils/verifierMail"
import verifPass from "~/utils/verifierPass"

export default {
  head(){
    return {
        title:'Connectez vous',
        meta: [{
            name: 'description',
            content: "Connectez vous à votre compte Groupomania pour rejoindre la communauté de nos employés",
            hid: 'description'
        }]
    }
  },
  middleware: 'auth',
  auth: 'guest',
  data(){
    return{
      errors:null,
      login_error:null,
      email:null,
      password:null,
      status:false,
    }
  },
  methods:{
    verifMail,
    verifPass,
    submitForm(){
      this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })
        .then(() =>  console.log('Logged In!'))
        .catch( (error) => {
          alert("Le mail ou le mot de passe est incorrect")
        })
    }
  }
}
</script>