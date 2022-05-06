<template>
    <div>
        <div class="app-post" v-for="comment in comments">
            <div class="app-post-container">
                <div class="app-post-head">
                    <div class="app-post-name">{{comment.User.name}} </div> 
                    <div class="app-post-date">{{newDate(comment.createdAt)}}</div>
                </div>
                <div>
                    {{comment.content}}
                    <div v-if="`${comment.createdAt}` != `${comment.updatedAt}`"> Modifié le {{newDate(comment.updatedAt)}}</div>
                </div>
                <div v-if="`${comment.userid}`==`${$auth.user.id}`">
                    <button>Modifier</button>
                    <button>Supprimer</button>
                </div>
            </div>
        </div>
    </div>
        
</template>

<script>
import newDate from '~/utils/newDate'
export default {
    middleware:'auth',
  methods: {
      newDate,
  },
    props:{
    comments: {
      type: Array,
      default: []
    }
  },
}
</script>