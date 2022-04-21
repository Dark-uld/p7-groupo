<template>
  <div>
    <h1>Créer un nouveau compte</h1>
    <hr>

    <div >
      <div >
        <form action=""
          method="post"
          >

          <div >
            <label for="">Name</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.name }"
              v-model="name">
           
          </div>

          <div >
            <label for="">Email</label>
            <input type="text" 
              :class="{ 'is-invalid': errors && errors.email }"
              v-model="email">
            
          </div>

          <div >
            <label for="">Password</label>
            <input type="password" class="form-control"
              :class="{ 'is-invalid': errors && errors.password }"
              v-model="password">
            
          </div>

          <input type="submit" value="Register">
          <nuxt-link to="/" >Cancel</nuxt-link>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
 
}
</script>