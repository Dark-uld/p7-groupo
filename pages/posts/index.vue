<template>
<div class="app-body">
      <div v-if="$route.params.created=='yes'">Post créé !</div>
      <div v-if="$route.params.deleted=='yes'">Post supprimé !</div>
      <h1> Liste des posts</h1>
      <div class="flex justify-center">
          <nuxt-link to="/posts/newpost" class="app-but app-butValid">Créer un nouveau post</nuxt-link>
      </div>
      <div class="flex">
        <Posts :posts="posts" v-if="posts.length>0"/>
        <div v-if="posts.length==0">Pas de post</div>
      </div>
</div>
     
</template>

<script>

export default {
    middleware:'auth'
    ,
    head(){
        return {
            title: 'Espace Employé',
            meta: [{
                name: 'description',
                content: `Bienvenue sur le site de Groupomania, un espace de partage avec vos collègues de vos récentes découvertes: articles, memes...`,
                hid: 'description'
            }]
        }
    },
    created(){
    },
    methods:{
    },
    async asyncData(context){
        const {data} = await  context.$axios.get('/posts')
        
        return {
            posts : data
        }
    },
}
</script>