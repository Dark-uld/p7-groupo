<template>
    <div>
        <h1> Modifier le post</h1>
        <div >
        <form action=""
          method="post"
          @submit.prevent="submitForm()">

          <div >
            <label for="">Titre</label>
            <input type="text" v-model="title" value="`${post.title}`" >
          </div>

          <div >
            <label for="">Contenu du post</label>
            <input type="text" v-model="content" value="`${post.content}`" >
          </div>

          <input type="submit" value="Mise à Jour">
          <nuxt-link to="/" >Cancel</nuxt-link>

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
          userid:this.$auth.user.id
        })
        .then((response) => {
            this.$router.push({ name:'posts', params:{ updated:'yes', id: this.$route.params.id } })
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