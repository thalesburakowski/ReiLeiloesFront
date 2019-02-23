<template>
  <div class="page">
    <h1 class="page-title">Conta Bancária</h1>

    <div v-if="!bankAccount" class="warnig-message">
      <h3 class="warnig-message__title">Você ainda não possui uma conta bancária cadastrada</h3>
      <p
        class="warnig-message__description"
      >Isso impede você de participar e de criar leilões. Cadastre uma agora e use 100% do nosso site!</p>
    </div>

    <div class="fields form">
      <div class="line-inputs">
        <label class="label-input">
          <input type="text" required :value="bankAccount.bank">
          <div class="label-text" :class="[bankAccount.bank ? 'valid-field' : '']">Banco</div>
        </label>
        <label class="label-input">
          <input type="text" required :value="bankAccount.accountNumber">
          <div class="label-text" :class="[bankAccount.accountNumber ? 'valid-field' : '']">Conta</div>
        </label>
        <label class="label-input">
          <input type="text" required :value="bankAccount.agencyNumber">
          <div class="label-text" :class="[bankAccount.agencyNumber ? 'valid-field' : '']">Agência</div>
        </label>
        <label class="label-input">
          <input type="text" required :value="bankAccount.owner">
          <div class="label-text" :class="[bankAccount.owner ? 'valid-field' : '']">Titular</div>
        </label>
      </div>
      <div class="form__actions">
        <button class="button button-cancel" v-if="bankAccount" @click="deleteBankAccount">EXCLUIR</button>
        <button class="button button-principal" v-if="bankAccount" @click="updateBankAccount">EDITAR</button>
        <button
          class="button button-principal"
          v-if="!bankAccount"
          @click="createBankAccount"
        >CADASTRAR</button>
      </div>
    </div>
  </div>
</template>

<script>
import SweetAlert from '../../components/SweetAlert'
export default {
  name: 'BankAccount',
  data() {
    return {
      bankAccount: false,
    }
  },
  methods: {
    async deleteBankAccount() {
      let result = await SweetAlert.showConfirmationModal()
      if (result.value) {
        await SweetAlert.showSuccessModal()
      }
    },
    async createBankAccount() {
      this.bankAccount = {
        owner: 'Paulinha da Silva',
        accountNumber: '1231654',
        agencyNumber: '123-3',
        bank: 'Banco do Brasil',
      }
      await SweetAlert.showSuccessModal()
    },
    async updateBankAccount() {
      await SweetAlert.showSuccessModal()
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/warning-message.scss';

.fields {
  text-align: left;
  width: 50%;
  .line-inputs {
    grid-template-columns: repeat(2, 44%);
    grid-column-gap: 70px;
    grid-row-gap: 2rem;
  }
}

.valid-field {
  transform: translateY(-1rem) !important;
}

.form {
  margin-bottom: 2rem;
  box-shadow: 2px 5px 15px #ccc;
}

.form__actions {
  margin-top: 3rem;
  display: flex;
  justify-content: flex-end;
}

.button {
  margin-right: 1rem;
}
</style>
