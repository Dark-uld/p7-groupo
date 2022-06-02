<template>
    <div>
        <h2>
            Liste des utilisateurs
        </h2>
        <PremUser :users="users"/>
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