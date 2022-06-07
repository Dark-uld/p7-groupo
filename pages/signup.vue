<template>
  <div class="app-body">
        <form action="" class="app-form"
          method="post"
          @submit.prevent="submitForm(verifName(),verifMail(),verifPass())">
          <h1>Créer un nouveau compte</h1>
          <div class="app-flex-col app-formCat">
            <label for="userName" class="flex app-center">Votre nom
            </label>
            <input id="userName" type="text" class="flex text-center app-formInp"
              :class="{ 'is-invalid': errors && errors.name }"
              v-model="name"
              @input="verifName()"
              aria-label="nom">
            <div id="nameError" class="app-err"></div>
           
          </div>

          <div class="app-flex-col app-formCat">
            <label for="userMail" class="flex app-center">Votre email</label>
            <input id="userMail" type="text" class="flex text-center app-formInp"
              :class="{ 'is-invalid': errors && errors.email }"
              v-model="email"
              @input="verifMail()"
              aria-label="email">
            <div id="mailError" class="app-err"></div>
          </div>

          <div class="app-flex-col app-formCat">
            <label for="userPass" class="flex app-center">Votre mot de passe</label>
            <input id="userPass" type="password" class="flex text-center app-formInp"
              :class="{ 'is-invalid': errors && errors.password }"
              v-model="password"
              @input="verifPass()"
              aria-label="password">
            <div id="passError" class="app-err"></div>
          </div>

          <div class="flex justify-around">
            <input type="submit" value="Créer le compte" class="app-but app-butValid">
            <nuxt-link to="/" class="app-but app-butCancel">Cancel</nuxt-link>
          </div>

        </form>
  </div>
</template>

<script>
import verifName from "~/utils/verifierName"
import verifMail from "~/utils/verifierMail"
import verifPass from "~/utils/verifierPass"

export default {
  head(){
      return {
          title:'Créer votre compte',
          meta: [{
              name: 'description',
              content: "Créer votre compte Groupomania pour rejoindre la communauté de nos employés",
              hid: 'description'
          }]
      }
  },
  middleware: 'auth',
  auth: 'guest',
  data(){
    return{
      errors:null,
      name:null,
      email:null,
      password:null,
      status:false,
    }
  },
  methods:{
    verifName,
    verifMail,
    verifPass,
    submitForm(fct1, fct2 ,fct3){
      if(fct1 + fct2 + fct3 >0){
        return alert("Formulaire incomplet ou incorrect")
      }
      this.$axios.post( 'http://localhost:3000/api/auth/signup', {
          name: this.name,
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          if(response.data._id){
            this.$router.push({ name:'login', params:{ registered:'yes' } })
            // log in if successfully registered
            this.$auth.loginWith('local', {
                data: {
                  email: this.email,
                  password: this.password
                }
              })
              .catch( (error) => {
                console.log(error)
              })
          }
        })
        .catch( (error) => {
          alert("Données du formulaire incorrect ou incomplet")
        });
    },
  }
}
</script>

