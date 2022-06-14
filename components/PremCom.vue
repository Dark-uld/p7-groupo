<template>
    <div class="app-table">
        <table>
            <thead>
                <tr>
                    <th>Com Id</th>
                    <th>Créé par</th>
                    <th>Id du post</th>
                    <th>Contenu</th>
                    <th>Créé le</th>
                    <th>Modifié le</th>
                    <th>Supprimer</th>
                </tr>
            </thead>
            <tbody>
                <tr  v-for="(comment,index) in comments"  :key="index">
                    <td> {{comment.id}}</td>
                    <td>{{comment.User.name}}</td>
                    <td>{{comment.postid}}</td>
                    <td><div class="app-tableContent">{{comment.content}}</div></td>
                    <td>{{newDate(comment.createdAt)}}</td>
                    <td>{{newDate(comment.updatedAt)}}</td>
                    <td><button @click="deleteCom(comment.id)" class="app-but app-butCancel">Supprimer</button></td>
                </tr>
            </tbody>          
        </table>
    </div>
        
</template>

<script>
import newDate from '~/utils/newDate'
export default {
    middleware:'auth',
    methods: {
        newDate,
        deleteCom(value){
            if(confirm("Êtes-vous sure?") === true){
                this.$axios.delete( '/admin/comment/' + value)
            .then((response) => {
                alert("Commentaire Supprimé")
                this.$nuxt.refresh()
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
    props:{
        comments: {
        type: Array,
        default: []
        }
    },
}
</script>
