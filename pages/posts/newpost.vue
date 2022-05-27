<template>
    <div>
        <h1> Créer un nouveau post</h1>
        <div >
        <form action=""
          method="post"
          @submit.prevent="submitForm()">

          <div >
            <label for="">Titre</label>
            <input type="text" v-model="title">
          </div>

          <div >
            <label for="">Contenu du post</label>
            <input type="text" v-model="content">
          </div>

          <input type="submit" value="Register">
          <nuxt-link to="/" >Cancel</nuxt-link>

        </form>
      </div>
        
    </div>
        
</template>

<script>
import newDate from '~/utils/newDate'
export default {
 middleware: 'auth',
  data(){
    return{
      errors:null,
      title:null,
      content:null,
      userid:null,
    }
  },
  methods:{
    submitForm(){
      this.$axios.post( '/posts', {
          title: this.title,
          content: this.content,
          userid:this.$auth.user.id
        })
        .then((response) => {
          console.log(response)
          this.$router.push({ name:'posts', params:{ created:'yes' } })
          
        })
        .catch( (error) => {
          console.log(error)
          if(error.response.data.errors){
            this.errors = error.response.data.errors
          }
        });
    }
  }
}
</script>