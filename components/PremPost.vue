<template>
    <div class="app-table">
        <table>
            <thead>
                <tr>
                    <th>Post Id</th>
                    <th>Créé par</th>
                    <th>Contenu</th>
                    <th>Créé le</th>
                    <th>Modifié le</th>
                    <th>Supprimer</th>
                </tr>
            </thead>
            <tbody>
                <tr  v-for="(post,index) in posts"  :key="index">
                    <td> {{post.id}}</td>
                    <td>{{post.User.name}}</td>
                    <td><div class="app-tableContent">{{post.content}}</div></td>
                    <td>{{newDate(post.createdAt)}}</td>
                    <td>{{newDate(post.updatedAt)}}</td>
                    <td><button @click="deletePost(post.id)" class="app-but app-butCancel">Supprimer</button></td>
                </tr>
            </tbody>          
        </table>
            
    </div>
        
</template>

<script>
import newDate from '~/utils/newDate'
import PremCom from '~/components/PremCom'
import axios from 'axios'
export default {
    
    middleware: 'auth',
    data(){
        return{
            postid:null,
        }
    },
    methods: {
        newDate,
        deletePost(value){
            if(confirm("Êtes-vous sure?") === true){
                 this.$axios.delete( '/admin/posts/' + value)
                .then((response) => {
                     alert("Post Supprimé")
                    this.$nuxt.refresh()
                })
                .catch( (error) => {
                    console.log(error)
                    if(error.response.data.errors){
                        this.errors = error.response.data.errors
                    }
                });
            }
        },
    },
    props:{
        posts: {
        type: Array,
        default: []
        },
    },
}
</script>

<style lang="scss">

</style>