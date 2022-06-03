<template>
    <div >
        <div class="app-post app-flex-col" v-for="(post,index) in posts"  :key="index">
            <div class="app-post-container">
                <div class="app-post-name">{{post.User.name}} </div> 
                <div>{{post.title}}</div>
                <div>{{post.content}}</div>
                <div class="app-post-date">{{newDate(post.createdAt)}}</div>
                <div>{{newDate(post.updatedAt)}}</div>
                <button @click="deletePost(post.id)">Supprimer</button>
            </div>
            <PremCom :comments="post.Comments"/>
        </div>
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
        posts: {
        type: Array,
        default: []
        },
    },
}
</script>

<style lang="scss">

</style>