<template>
  <div class="page">
    <h1 class="page-title">Cadastro</h1>
    <div class="fields">
      <div class="line-inputs">
        <div>
          <label class="label-input">
            <input type="text" name="email" required v-model="email">
            <div class="label-text">E-mail</div>
          </label>
        </div>
      </div>
      <div class="line-inputs">
        <label class="label-input">
          <input type="password" maxlength="80" name="password" required v-model="password">
          <div class="label-text">Senha</div>
        </label>
      </div>
      <div class="line-inputs">
        <label class="label-input">
          <input
            type="password"
            name="confirm-password"
            maxlength="80"
            required
            v-model="confirmPassword"
          >
          <div class="label-text">Confirme sua senha</div>
        </label>
      </div>
      <div class="save">
        <router-link to="/login" class="link">Já tem uma conta? Faça o login</router-link>
        <button
          class="button button-principal"
          style="margin-left: 10px;"
          name="register"
          @click="register"
        >Cadastrar</button>
      </div>
    </div>
  </div>
</template>

<script>
import UserAPI from '@/api/User'
import SweetAlert from '../../components/SweetAlert'

export default {
  name: 'Register',
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
    }
  },
  methods: {
    async register() {
      const response = await UserAPI.create({
        Email: this.email,
        Password: this.password,
        ConfirmationPassword: this.confirmPassword,
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
