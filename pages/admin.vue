<template>
<div>
    <h1>Page d'administration</h1>
    <nav>
      <ul>
        <li>
          <NuxtLink to="/admin/users">Users</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/admin/posts">Posts</NuxtLink>
        </li>
      </ul>
    </nav>
    <NuxtChild />
</div>
</template>
<script>

export default {
    middleware : ['auth','adminaccess'],
}
</script>