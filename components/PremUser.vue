<template>
    <div class="app-table">
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>isAdmin</th>
                    <th>Crée le</th>
                    <th>Modifier</th>
                    <th>Supprimer</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user,index) in users"  :key="index">
                    <td> {{user.id}}</td>
                    <td>{{user.name}}</td>
                    <td>{{user.email}}</td>
                    <td>
                    <input type="number" name="isAdmin" min="0" max="1" :value="user.isAdmin" :id="`quantity${user.id}`" aria-label="Choisir valeur isAdmin" placeholder="isAdmin">
                    </td>
                    <td>{{newDate(user.createdAt)}}</td>
                    <td><button @click="modifyUser(user.id)" class="app-but app-butValid">Modifier</button></td>
                    <td><button @click="deleteUser(user.id)" class="app-but app-butCancel">Supprimer</button></td>
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
        deleteUser(value){
            if(confirm("Êtes-vous sûr de vouloir supprimer ce compte ?") === true){
                 this.$axios.delete( '/admin/user/' + value)
                .then((response) => {
                     alert("Utlisateur Supprimé")
                    window.location.reload(true)
                })
                .catch( (error) => {
                    console.log(error)
                    if(error.response.data.errors){
                        this.errors = error.response.data.errors
                    }
                });
            }
        },
        modifyUser(value){
            const isAdmin = document.getElementById(`quantity${value}`)
            if( (isAdmin.value==0 || isAdmin.value==1) && confirm("Êtes-vous sûr de vouloir modifier ce compte?") === true ){
                 this.$axios.put( '/admin/user/' + value,
                    {
                        isAdmin:isAdmin.value
                    }
                 )
                .then((response) => {
                     alert("Utilisateur Modifié")
                    window.location.reload(true)
                })
                .catch( (error) => {
                    console.log(error)
                    if(error.response.data.errors){
                        this.errors = error.response.data.errors
                    }
                });
            } else {
                alert("Valeurs isAdmin admises : 1(admin) ou 0(normal user) uniquement")
                window.location.reload(true)
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