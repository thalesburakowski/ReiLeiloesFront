<template>
  <div class="page">
    <h1 class="page-title">Cadastro de Administradores</h1>
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
      <div class="line-inputs">
        <label class="label-input">
          <input type="password" maxlength="80" required>
          <div class="label-text">Confirme sua senha</div>
        </label>
      </div>
      <div class="save">
        <button
          class="button button-principal"
          style="margin-left: 10px;"
          @click="register"
        >Cadastrar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminRegister',
  data() {
    return {}
  },
  methods: {
    register() {
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
    margin-left: 29vw;
    width: 35%;
    .line-inputs {
      grid-template-columns: 100%;
      grid-gap: 2em;
    }
    .save {
      justify-content: flex-end;
    }
  }
}
</style>
