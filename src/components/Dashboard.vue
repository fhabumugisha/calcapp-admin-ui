<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <p>
      <router-link to="/projects">Projects</router-link> |
      <router-link to="/users">Users</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
