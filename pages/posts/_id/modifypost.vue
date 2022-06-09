<template>
    <div  class="app-body">
        <h1> Modifier le post</h1>
        <div class="app-form">
        <form action=""
          method="post"
          @submit.prevent="submitForm()">
         
         

          <div  class="app-flex-col app-formCat">
            <label for="title"  class="flex app-center">Titre</label>
            <input id="title"  type="text" v-model="title"  aria-label="titre du nouveau post" class="flex text-center app-formInp"  value="`${post.title}`" >
          </div>

          <div  class="app-flex-col app-formCat">
            <label for="content"  class="flex app-center">Contenu du post</label>
            <textarea id="content"  type="text" v-model="content" aria-label="contenu du nouveau post" class="flex text-center app-formInp app-formText"  value="`${post.content}`"></textarea>
          </div>

          <input type="submit" value="Mise à Jour"  class="app-but app-butValid">
          <nuxt-link to="/" class="app-but app-butCancel">Cancel</nuxt-link>

        </form>
      </div>
        
    </div>
        
</template>

<script>
import newDate from '~/utils/newDate'
export default {
 middleware: 'auth',
 async asyncData(context){
    const {data} = await context.$axios.get('/posts/' + context.route.params.id)
    return {
      post : data
    }
  },
  data(){
    return{
      errors:null,
      title:null,
      content:null,
      userid:null,
    }
  },
  mounted(){
    this.fillFormData()
  },

  methods:{
     fillFormData(){
      this.title = this.post.title,
      this.userid = this.post.userid,
      this.content = this.post.content
    },
    submitForm(){
      this.$axios.put( '/posts/' + this.$route.params.id, {
          title: this.title,
          content: this.content,
          userid:this.$auth.user.decoded.id
        })
        .then((response) => {
            this.$router.push({ name:'posts'})
            alert("Post modifié")
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