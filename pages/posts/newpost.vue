<template>
    <div class="app-body">
        <h1> Créer un nouveau post</h1>
        <div >
        <form action=""
          class="app-form"
          method="post"
          @submit.prevent="submitForm()">

          <div  class="app-flex-col app-formCat">
            <label for="title"  class="flex app-center">Titre</label>
            <input id="title"  type="text" v-model="title"  aria-label="titre du nouveau post" class="flex text-center app-formInp">
          </div>

          <div  class="app-flex-col app-formCat">
            <label for="content"  class="flex app-center">Contenu du post</label>
            <input id="content"  type="text" v-model="content" aria-label="contenu du nouveau post" class="flex text-center app-formInp">
          </div>

          <input type="submit" value="Créer un post" class="app-but app-butValid">
          <nuxt-link to="/"  class="app-but app-butCancel">Cancel</nuxt-link>

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
      if(!this.title  && this.content) return alert("Il manque un titre")
      if(this.title  && !this.content )  return alert("Il manque du contenu")
      if(!this.title && !this.content) return alert("Il manque un titre et du contenu")

      this.$axios.post( '/posts', {
          title: this.title,
          content: this.content,
          userid:this.$auth.user.decoded.id
        })
        .then((response) => {
          console.log(response)
          this.$router.push({ name:'posts', params:{ created:'yes' } })
          
        })
        .catch( (error) => {
            console.log(error)
        });
    }
  }
}
</script>