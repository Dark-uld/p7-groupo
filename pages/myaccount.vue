<template>

<div class="app-body"> 
    <h1>Mon compte</h1>  
    <div class="app-form app-flex-col justify-center">
        <div class="app-flex-col app-formCat">Mon nom: <span> {{user.name}}</span></div>
        <div class="app-flex-col app-formCat">Mon mail: <span> {{user.email}}</span></div>
        <button v-if="!($auth.user.isAdmin==2)" @click="deleteAccount()" class="app-but app-butCancel">Supprimer le compte</button>
    </div>
    
</div>
</template>
<script>
export default {
    head(){
        return {
            title:'Mon compte',
            meta: [{
                name: 'description',
                content: "Les détails de votre compte Groupomania",
                hid: 'description'
            }]
        }
    },
    middleware:'auth',
    methods:{
        deleteAccount(){
            if(confirm("Êtes-vous sûr de vouloir supprimer votre comtpe?") === true){
                 this.$axios.delete( '/auth/user/' + this.$auth.user.decoded.id)
                .then((response) => {
                    this.$auth.logout()
                })
                .catch( (error) => {
                    console.log(error)
                    if(error.response.data.errors){
                        this.errors = error.response.data.errors
                    }
                });
            }
        }
        
    },
    async asyncData(context){
        const {data} = await  context.$axios.get('/auth/myuser')
        
        return {
            user : data
        }
    }

}
</script>