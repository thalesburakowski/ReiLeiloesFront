<template>
  <div id="app">
    <Header></Header>
    <div id="nav">
      <!-- <router-view> -->
      <!-- <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link> -->
      <router-view/>
    </div>
    <!-- <Footer></Footer> -->
  </div>
</template>
<script>
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="scss">
@import './assets/styles/reset';
@import './assets/styles/fonts';
@import './assets/styles/variables';
@import './assets/styles/geral';
@import './assets/styles/list';
#app {
  #nav {
    margin-top: $topbar-height;
  }
}
</style>
