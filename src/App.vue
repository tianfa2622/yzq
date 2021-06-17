<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
  export default {
    name: 'App'
  }
</script>

<style lang="scss">
  #app {
    width: 100vw;
    height: 100vh;
    background: url('/src/assets/login/u0.png') no-repeat center center;
    background-size: 100% 100%;
  }
</style>
