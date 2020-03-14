<template>
  <div>
    <div>
      <img id="avatar" :src="$auth.user.picture" />
      <h2>{{ $auth.user.name }}</h2>
      <p>{{ $auth.user.email }}</p>
    </div>
    <div>
      <pre>{{ JSON.stringify($auth.user, null, 2) }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
#avatar {
  max-width: 80px;
  border-radius: 50%;
  /* Prevent background color leak outs */
  -webkit-background-clip: padding-box; 
  -moz-background-clip:    padding; 
  background-clip:         padding-box;
}
</style>>
