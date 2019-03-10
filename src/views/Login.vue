<template>
  <div class="page">
    <h1 class="page-title">Login</h1>
    <div class="fields">
      <div class="line-inputs">
        <div>
          <label class="label-input">
            <input type="text" required v-model="email">
            <div class="label-text">E-mail</div>
          </label>
        </div>
      </div>
      <div class="line-inputs">
        <label class="label-input">
          <input type="password" maxlength="80" required v-model="password">
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
import UserAPI from '@/api/User'
import SweetAlert from '../components/SweetAlert'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async login() {
      const response = await UserAPI.login({
        Email: this.email,
        Password: this.password,
      })
      if (response.entities) {
        localStorage.setItem('user', JSON.stringify(response.entities[0]))
        this.$router.push('/')
      } else SweetAlert.showFailModal(response.msg)
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
      justify-content: space-between;
    }
  }
}
</style>
