<template>
  <div class="page">
    <h1 class="page-title">Login</h1>
    <div class="fields">
      <div class="line-inputs">
        <div>
          <label class="label-input">
            <input type="text" required>
            <div class="label-text">Usuario</div>
          </label>
        </div>
      </div>
      <div class="line-inputs">
        <label class="label-input">
          <input type="password" maxlength="80" required>
          <div class="label-text">Senha</div>
        </label>
      </div>
      <div class="save">
        <router-link to="/cadastrar" class="link">Não tem uma conta? Faça o cadastro</router-link>
        <button class="button button-principal" style="margin-left: 10px;" @click="login">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {}
  },
  methods: {
    login() {
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.page {
  .page-title {
    margin-left: 30vw;
  }
  .fields {
    box-shadow: 2px 5px 15px #ccc;
    margin-left: 29vw;
    width: 35%;
    .line-inputs {
      grid-template-columns: 100%;
      grid-gap: 2em;
    }
    .save {
      justify-content: space-between;
    }
  }
}
</style>
