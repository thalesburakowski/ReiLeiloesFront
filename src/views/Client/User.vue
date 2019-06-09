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
        <!-- <label class="label-input">
          <input type="text" v-model="model.email" maxlength="80" required>
          <div class="label-text">Email</div>
        </label>-->
        <label class="label-input">
          <input type="text" v-model="model.cpf" maxlength="80" v-mask="'###.###.###-##'" required>
          <div class="label-text">CPF</div>
        </label>
      </div>
      <div class="line-inputs">
        <label class="label-input">
          <input type="text" v-model="model.rg" maxlength="80" required>
          <div class="label-text">RG</div>
        </label>
        <label class="label-input">
          <input type="text" v-model="model.birthDate" v-mask="'##/##/####'" required>
          <div class="label-text">Data Nascimento</div>
        </label>
        <label class="label-input">
          <input type="text" v-model="model.nickName" required>
          <div class="label-text">Nome de Usuário</div>
        </label>
      </div>

      <div class="form__actions">
        <button
          class="button button-cancel"
          name="inativar-conta"
          @click="inativateAccount"
        >Inativar Conta</button>
        <button class="button button-cancel" @click="showModal = true">Alterar Senha</button>
        <button class="button button-principal" v-if="!model.id" @click="register">Confirmar</button>
      </div>
    </div>
    <div :class="{ show: showModal }" class="modal">
      <!-- Modal content -->
      <div class="modal-content modal-content--small w3-animate-zoom">
        <div class="fields fields--no-shadow">
          <h2 class="title-form">Alterar senha</h2>
          <div class="line-inputs line-inputs--form">
            <label class="label-input">
              <input type="password" required v-model="modelPassword.password">
              <div class="label-text">Senha atual</div>
            </label>
            <label class="label-input">
              <input type="password" required v-model="modelPassword.newPassword">
              <div class="label-text">Nova senha</div>
            </label>
            <label class="label-input">
              <input type="password" required v-model="modelPassword.confirmationPassword">
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
import UserAPI from '@/api/User'
import ProfileAPI from '@/api/Profile'
import moment from 'moment'

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
        birthDate: '',
        nickName: '',
      },
      modelPassword: {
        password: '',
        newPassword: '',
        confirmationPassword: '',
      },
    }
  },
  components: { SweetAlert },
  mounted: function() {
    this.getProfile()
  },
  methods: {
    async getProfile() {
      const userId = JSON.parse(localStorage.getItem('user')).id
      const response = await ProfileAPI.getProfile(userId)
      if (response.entities) {
        response.entities[0].birthDate = new Date(
          response.entities[0].birthDate
        )
          .toLocaleString('en-GB', { timeZone: 'UTC' })
          .split(',')[0]
        this.model = response.entities[0]
      } else {
        SweetAlert.showFailModal(response.msg)
      }
    },
    async register() {
      const result = await SweetAlert.showConfirmationModal(
        'Realmente deseja cadastrar esses dados? Depois eles não poderão ser alterados!'
      )
      if (result.value) {
        const userId = JSON.parse(localStorage.getItem('user')).id
        let BirthDate = this.model.birthDate.split('/')
        BirthDate = new Date(
          `${BirthDate[2]}-${BirthDate[1]}-${BirthDate[0]}`
        ).toISOString()
        const response = await ProfileAPI.create({
          ...this.model,
          BirthDate,
          userId,
        })
        if (!response.msg) {
          this.model = response.entities
          SweetAlert.showSuccessModal()
        } else {
          SweetAlert.showFailModal(response.msg)
        }
      }
    },
    async inativateAccount() {
      const result = await SweetAlert.showConfirmationModal(
        'Você deseja realmente inativar sua conta?'
      )
      console.log(result)
      if (result.value) {
        const userId = JSON.parse(localStorage.getItem('user')).id
        const response = await UserAPI.delete(userId)
        if (response.entities) {
          SweetAlert.showSuccessModal()
        } else {
          SweetAlert.showFailModal(response.msg)
        }
      }
    },

    async changePassword() {
      const result = await SweetAlert.showConfirmationModal()
      if (result.value) {
        const user = JSON.parse(localStorage.getItem('user'))
        const { email: Email, id: Id } = user
        const userData = { ...this.modelPassword, Email, Id }
        const response = await UserAPI.changePassword(userData)
        if (response.entities) {
          SweetAlert.showSuccessModal()
        } else {
          SweetAlert.showFailModal(response.msg)
        }
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
      grid-column-gap: 40px;
      grid-row-gap: 2rem;
      &--form {
        grid-template-columns: repeat(3, 30%);
      }
    }
    .save {
      justify-content: flex-end;
      // margin-right: 2rem;
    }
  }
}
</style>