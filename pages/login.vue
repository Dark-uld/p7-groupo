<template>
  <div>
    <h1>Se connecter</h1>
    <hr>

   

    <div class="">
      <div class="">
        <form action=""
          method="post"
          >

          <div class="">
            <label for="">Email</label>
            <input type="text" class=""
              :class="{ 'is-invalid': errors && errors.email }"
              v-model="email">
            
          </div>

          <div class="">
            <label for="">Password</label>
            <input type="password" class=""
              :class="{ 'is-invalid': errors && errors.password }"
              v-model="password">
            
          </div>

         

          <input type="submit" value="Login" class="">
          <nuxt-link to="/" class="">Cancel</nuxt-link>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
 
}
</script>