<template>
<div class="app-body">
     
      <h1> Bienvenue {{$auth.user.name}} <br> sur le réseau d'actualités des employés Groupomania</h1>
      <div class="app-flex-row justify-center">

        <nuxt-link to="/posts/newpost" class="app-but app-butValid">Créer un nouveau post</nuxt-link>
      </div>
      <div class="flex py-8 justify-center">
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