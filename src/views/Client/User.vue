<template>
  <div class="page">
    <h1 class="page-title">Meus dados</h1>
    <div class="fields">
      <div class="line-inputs">
        <label class="label-input">
          <input type="text" v-model="model.name" maxlength="80" required>
          <div class="label-text">Nome</div>
        </label>
        <label class="label-input">
          <input type="text" v-model="model.lastName" required>
          <div class="label-text">Sobrenome</div>
        </label>
        <label class="label-input">
          <input type="text" v-model="model.email" maxlength="80" required>
          <div class="label-text">Email</div>
        </label>
      </div>
      <div class="line-inputs">
        <label class="label-input">
          <input type="text" v-model="model.cpf" maxlength="80" required>
          <div class="label-text">CPF</div>
        </label>
        <label class="label-input">
          <input type="text" v-model="model.rg" maxlength="80" required>
          <div class="label-text">RG</div>
        </label>
        <label class="label-input">
          <input type="text" v-model="model.birthDate" required>
          <div class="label-text">Data Nascimento</div>
        </label>
      </div>
      <div class="line-inputs">
        <label class="label-input">
          <input type="text" v-model="model.username" required>
          <div class="label-text">Nome de Usuário</div>
        </label>
      </div>
      <div class="form__actions">
        <button class="button button-cancel" @click="showModal = true">Alterar Senha</button>
        <button class="button button-principal" @click="register">Confirmar</button>
      </div>
    </div>
    <div :class="{ show: showModal }" class="modal">
      <!-- Modal content -->
      <div class="modal-content modal-content--small w3-animate-zoom">
        <div class="fields fields--no-shadow">
          <h2 class="title-form">Alterar senha</h2>
          <div class="line-inputs line-inputs--form">
            <label class="label-input">
              <input type="password" required>
              <div class="label-text">Nova senha</div>
            </label>
            <label class="label-input">
              <input type="password" required>
              <div class="label-text">Confirmar nova senha</div>
            </label>
          </div>
          <div class="form__actions">
            <button class="button button-cancel" @click="showModal = false">CANCELAR</button>
            <button class="button button-principal" @click="changePassword">ATUALIZAR</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SweetAlert from '../../components/SweetAlert'

export default {
  name: 'User',
  data() {
    return {
      showModal: false,
      model: {
        name: '',
        lastName: '',
        email: '',
        cpf: '',
        rg: '',
        bithDate: '',
        username: '',
      },
    }
  },
  components: { SweetAlert },
  methods: {
    async register() {
      const result = await SweetAlert.showConfirmationModal()
      if (result.value) {
        SweetAlert.showSuccessModal()
      }
    },

    async changePassword() {
      const result = await SweetAlert.showConfirmationModal()
      if (result.value) {
        SweetAlert.showSuccessModal()
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/modal.scss';
.page {
  .fields {
    .form__actions {
      display: flex;
      justify-content: flex-end;
    }
    .button {
      margin-right: 1rem;
    }

    .title-form {
      font-size: 1.8rem;
      color: $text-color;
      margin-bottom: 1.5rem;
      text-align: left;
    }
    .line-inputs {
      grid-template-columns: repeat(3, 28%);
      grid-column-gap: 70px;
      grid-row-gap: 2rem;
      &--form {
        grid-template-columns: repeat(2, 45%);
      }
    }
    .save {
      justify-content: flex-end;
      // margin-right: 2rem;
    }
  }
}
</style>
