<template>
  <div>
    <h1>Home PAGE</h1>
    <h5 @click="$router.push('/about')">ABOUT {{txtGeneric}}</h5>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  data() {
    return {
      textGeneric: "Oi"
    };
  }
};
</script>
