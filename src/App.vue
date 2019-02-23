<template>
  <div id="app">
    <Header></Header>
    <div id="nav">
      <!-- <router-view> -->
      <!-- <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>-->
      <router-view />
    </div>
    <!-- <Footer></Footer> -->
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import vueFilters from '@/globalFilter'
export default {
  name: 'App',
  components: {
    Header,
  },
}
</script>

<style lang="scss">
@import './assets/styles/reset';
@import './assets/styles/fonts';
@import './assets/styles/variables';
@import './assets/styles/geral';
@import './assets/styles/list';
@import './assets/styles/create-edit';

#app {
  #nav {
    margin-top: $topbar-height;
  }
  height: 100%;
  background: linear-gradient(to bottom, $background, #fff);
}
</style>
