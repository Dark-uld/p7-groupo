<template>
<div class="app-body">
    <h1>Page Administrateur <br> pour gérer les utilisateurs et leurs contenus</h1>
    <nav>
      <ul class="app-flex-row">
        <li >
          <NuxtLink to="/admin/users" class="app-but app-butValid" title="Modérez les Utilisateurs">Utilisateurs</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/admin/posts" class="app-but app-butValid" title="Modérez les Posts">Posts</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/admin/comments" class="app-but app-butValid" title="Modérez les Commentaires">Commentaires</NuxtLink>
        </li>
      </ul>
    </nav>
    <NuxtChild />
</div>
</template>
<script>

export default {
    middleware : ['auth','adminaccess'],
    head(){
        return {
            title:"Page d'Administration",
            meta: [{
                name: 'description',
                content: `Gérer le contenu du site: des utilisateurs aux posts/commentaires`,
                hid: 'description'
            }]
        }
    },
}
</script>