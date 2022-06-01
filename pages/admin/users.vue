<template>
    <div>
        <h2>
            Liste des utilisateurs
        </h2>
        <div class="app-post app-flex-col" v-for="(user,index) in users"  :key="index">
            {{user.id}}//{{user.name}}//{{user.email}}//{{newDate(user.createdAt)}}//{{newDate(user.updatedAt)}}

        </div>
    </div>
</template>
<script>
import newDate from "~/utils/newDate"
export default{
    async asyncData(context){
        const {data} = await  context.$axios.get('/admin/users')

        return {
            users : data
        }
    },
    methods: {
        newDate,
    }
}
</script>