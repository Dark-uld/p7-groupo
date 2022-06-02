<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>isAdmin</th>
                    <th>Crée le</th>
                    <th>Modifié le</th>
                    <th>Modifier</th>
                    <th>Supprimer</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user,index) in users"  :key="index">
                    <td> {{user.id}}</td>
                    <td>{{user.name}}</td>
                    <td>{{user.email}}</td>
                    <td>{{user.isAdmin}}</td>
                    <td>{{newDate(user.createdAt)}}</td>
                    <td>{{newDate(user.updatedAt)}}</td>
                    <td><button>Modifier</button></td>
                    <td><button>Supprimer</button></td>
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
        users: {
        type: Array,
        default: []
        },
    },
}
</script>