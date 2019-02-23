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
        <div>
          <div>
            <label class="label-input">
              <input type="password" maxlength="80" required>
              <div class="label-text">Senha</div>
            </label>
          </div>
        </div>
      </div>
      <div class="save">
        <button class="button button-principal" @click="login">Login</button>
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
.page {
  .page-title {
    margin-left: 21vw;
  }
  .fields {
    margin-left: 20vw;
    width: 50%;
    .line-inputs {
      grid-template-columns: 100%;
      grid-gap: 2em;
    }
    .save {
      justify-content: flex-end;
      margin-right: 2rem;
    }
  }
}
</style>
