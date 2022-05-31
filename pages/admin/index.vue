<template>
<div>
    Admin Page
</div>
</template>
<script>

export default {
    middleware : ['auth','adminaccess'],
}
</script>