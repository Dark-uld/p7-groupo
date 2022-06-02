<template>
    <div>
        <div class="app-post-container">
            <h1>{{post.title}} </h1>
            <div class="app-post-head">
                <div class="app-post-name">Posté par {{post.User.name}} </div> 
                <div class="app-post-date">le {{newDate(post.createdAt)}}</div>
            </div>
            <div>
                {{post.content}}
                <div v-if="`${post.createdAt}` != `${post.updatedAt}`"> Modifié le {{newDate(post.updatedAt)}}</div>
            </div>
            <div v-if="`${post.userid}`==`${$auth.user.id}`">
                <nuxt-link  :to="`/posts/${post.id}/modifypost`">Modifier</nuxt-link>
                <button @click="deleteRecord()">Delete</button>
            </div>
            <hr/>
            <hr/>

            <div>
                <form action=""
                method="post"
                @submit.prevent="submitForm()">
                    <div>
                        <label for="">Envoyez un commentaire</label>
                        <input type="text" v-model="content">
                    </div>
                    <input type="submit" value="Register">
                </form>
            </div>
            <hr/>
            <hr/>
            <div>
                <div v-if="!`${post.Comments}`">No Comment</div>
                <div v-else>
                    <Comments :comments="post.Comments"/>
                </div>
            </div>
        </div>
    </div>
    
</template>
<script>
import newDate from '~/utils/newDate'
import axios from 'axios'
export default {
    head(){
        return {
            title: this.post.title,
            meta: [{
                name: 'description',
                content: `Ce post a été créé par ${this.post.User.name}`,
                hid: 'description'
            }]
        }
    },
    
    middleware: 'auth',
    data(){
        return{
        errors:null,
        content:null,
        userid:null,
        postid:null,
        comments:[]
        }
    },
    methods: {
        newDate,
        deleteRecord(){
            if(confirm("Êtes-vous sure?") === true){
                this.$axios.delete('/posts/' + this.$route.params.id)
                .then((response) => {
                    this.$router.push({ name:'posts', params:{ deleted:'yes' } })
                })
                .catch( (error) => {
                    console.log(error);
                });
            }
        },
        submitForm(){
            this.$axios.post( '/comments', {
                postid: this.$route.params.id,
                content: this.content,
                userid:this.$auth.user.decoded.id
                })
                .then((response) => {
                console.log("Commentaire Créé")
                this.$nuxt.refresh()
                })
                .catch( (error) => {
                console.log(error)
                if(error.response.data.errors){
                    this.errors = error.response.data.errors
                }
                });
        },
        
    },
    async asyncData(context){
        const {data} = await context.$axios.get('/posts/'+ context.route.params.id)
        return {
            post : data
        }
    },
    async fetch() {
        await this.$store.dispatch('fetchUser', this.$auth.user.decoded.id)
    }

}
</script>