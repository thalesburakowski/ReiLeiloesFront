<template>
  <div class="page">
    <h1 class="page-title">Minha Carteira</h1>

    <span class="page__info" :key="wallet.credits">Você possui R$ {{wallet.credits}},00 na Carteira</span>
    <!-- <div class="wallet-info">
      <span class="page__info">Você possui R$ 150,00 Pendente</span>
      <button class="button button-principal" @click="withdraw">Transferir para Minha conta</button>
      <button class="button button-principal" @click="withdraw">Transferir Créditos</button>
    </div>-->
    <span class="main-grid">
      <span class="page__info">Transferir para sua conta bancária</span>
      <span class="page__info">Comprar créditos para sua carteira</span>
    </span>

    <span class="main-grid">
      <div class="fields">
        <div class="line-inputs">
          <div class="select">
            <Multiselect
              v-model="bankAccount"
              label="name"
              :options="bankAccounts"
              :multiple="false"
              :close-on-select="true"
              selectedLabel="Selecionado"
              placeholder="Selecione uma conta"
              selectLabel
              deselectLabel
            ></Multiselect>
          </div>

          <label class="label-input">
            <input type="text" required v-model="ammountBank">
            <div class="label-text">Valor</div>
          </label>
        </div>

        <div class="line-inputs" v-if="bankAccount.id === 0">
          <label class="label-input">
            <input type="text" required v-model="bankAccount.bank">
            <div class="label-text" :class="[bankAccount.bank ? 'valid-field' : '']">Banco</div>
          </label>
          <label class="label-input">
            <input type="text" required v-model="bankAccount.accountNumber">
            <div class="label-text" :class="[bankAccount.accountNumber ? 'valid-field' : '']">Conta</div>
          </label>
          <label class="label-input">
            <input type="text" required v-model="bankAccount.agencyNumber">
            <div class="label-text" :class="[bankAccount.agencyNumber ? 'valid-field' : '']">Agência</div>
          </label>
          <label class="label-input">
            <input type="text" required v-model="bankAccount.owner">
            <div class="label-text" :class="[bankAccount.owner ? 'valid-field' : '']">Titular</div>
          </label>
          <label class="label-input">
            <input type="text" required v-model="bankAccount.name">
            <div class="label-text" :class="[bankAccount.name ? 'valid-field' : '']">Nome da conta</div>
          </label>
          <label class="label-input">
            <input type="text" v-mask="'###.###.###-##'" required v-model="bankAccount.ownerCpf">
            <div
              class="label-text"
              :class="[bankAccount.ownerCpf ? 'valid-field' : '']"
            >CPF do titular</div>
          </label>
        </div>

        <div class="line-inputs" v-if="bankAccount.id !== 0">
          <label class="label-input">
            <input type="text" disabled v-model="bankAccount.bank">
            <div
              class="label-text label-text--active"
              :class="[bankAccount.bank ? 'valid-field' : '']"
            >Banco</div>
          </label>
          <label class="label-input">
            <input type="text" disabled v-model="bankAccount.accountNumber">
            <div
              class="label-text label-text--active"
              :class="[bankAccount.accountNumber ? 'valid-field' : '']"
            >Conta</div>
          </label>
          <label class="label-input">
            <input type="text" disabled v-model="bankAccount.agencyNumber">
            <div
              class="label-text label-text--active"
              :class="[bankAccount.agencyNumber ? 'valid-field' : '']"
            >Agência</div>
          </label>
          <label class="label-input">
            <input type="text" disabled v-model="bankAccount.ownerName">
            <div
              class="label-text label-text--active"
              :class="[bankAccount.ownerName ? 'valid-field' : '']"
            >Titular</div>
          </label>
          <label class="label-input">
            <input type="text" disabled v-model="bankAccount.name">
            <div
              class="label-text label-text--active"
              :class="[bankAccount.name ? 'valid-field' : '']"
            >Nome da conta</div>
          </label>
          <label class="label-input">
            <input type="text" v-mask="'###.###.###-##'" disabled v-model="bankAccount.ownerCpf">
            <div
              class="label-text label-text--active"
              :class="[bankAccount.ownerCpf ? 'valid-field' : '']"
            >CPF do titular</div>
          </label>
        </div>

        <div class="save">
          <button class="button button-principal" @click="withdraw">Transferir</button>
        </div>
      </div>

      <div class="fields">
        <div class="line-inputs">
          <div class="select">
            <Multiselect
              v-model="creditCard"
              label="name"
              :options="creditCards"
              :multiple="false"
              :close-on-select="true"
              selectedLabel="Selecionado"
              placeholder="Selecione um cartão"
              selectLabel
              deselectLabel
            ></Multiselect>
          </div>
          <label class="label-input">
            <input type="text" required v-model="ammountCreditCard">
            <div class="label-text">Valor</div>
          </label>
        </div>

        <div class="line-inputs" v-if="creditCard.id == 0">
          <label class="label-input">
            <input type="text" required v-model="creditCard.owner">
            <div class="label-text">Titular</div>
          </label>
          <label class="label-input">
            <input type="text" required v-model="creditCard.number">
            <div class="label-text">Número</div>
          </label>
          <label class="label-input">
            <input type="text" v-mask="'##/##'" required v-model="creditCard.expireDate">
            <div class="label-text">Vencimento</div>
          </label>

          <label class="label-input">
            <input type="text" required v-model="creditCard.securityCode">
            <div class="label-text">Código</div>
          </label>

          <label class="label-input">
            <input type="text" required v-model="creditCard.name">
            <div class="label-text">Nome do cartão</div>
          </label>
        </div>

        <div class="line-inputs" v-if="creditCard.id != 0">
          <label class="label-input">
            <input type="text" disabled v-model="creditCard.owner">
            <div class="label-text label-text--active">Titular</div>
          </label>
          <label class="label-input">
            <input type="text" disabled v-model="creditCard.number">
            <div class="label-text label-text--active">Número</div>
          </label>
          <label class="label-input">
            <input type="text" v-mask="'##/##'" disabled v-model="creditCard.expireDate">
            <div class="label-text label-text--active">Vencimento</div>
          </label>

          <label class="label-input">
            <input type="text" disabled v-model="creditCard.securityCode">
            <div class="label-text label-text--active">Código</div>
          </label>

          <label class="label-input">
            <input type="text" disabled v-model="creditCard.name">
            <div class="label-text label-text--active">Nome do cartão</div>
          </label>
        </div>

        <div class="save">
          <button class="button button-principal" @click="deposit">Comprar</button>
        </div>
      </div>
    </span>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import SweetAlert from '../../components/SweetAlert'

import WalletAPI from '@/api/Wallet'
import CreditCardAPI from '@/api/Card'
import BankAccountAPI from '@/api/BankAccount'
import ProfileAPI from '@/api/Profile'

export default {
  name: 'Wallet',
  components: { Multiselect, SweetAlert },
  data() {
    return {
      bankAccount: {
        owner: '',
        accountNumber: '',
        agencyNumber: '',
        bank: '',
        ownerCpf: '',
        name: 'Selecionar conta',
      },
      creditCard: {
        name: 'Selecione um cartão',
        owner: '',
        number: '',
        expireDate: '',
        securityCode: '',
      },
      user: {},
      profile: {},
      ammountCreditCard: '',
      ammountBank: '',
      bankAccounts: [],
      creditCards: [],
      wallet: {},
    }
  },
  mounted() {
    this.loadInfo()
  },
  methods: {
    async loadInfo() {
      await this.getInfo()
      this.loadCreditCards()
      this.loadBankAccount()
      this.loadCredits()
    },
    async getInfo() {
      this.user = JSON.parse(localStorage.getItem('user'))
      this.profile = JSON.parse(localStorage.getItem('profile'))
      if (!this.profile) {
        await SweetAlert.showFailModal(
          'Você deve preencher seus dados pessoais antes de prosseguir!'
        )
        this.$router.push('/dados')
      }
    },
    async loadCreditCards() {
      this.creditCards = await CreditCardAPI.getAll(this.profile.id)
      this.formatCreditCards()
      this.creditCards.push({ name: 'Novo cartão', id: 0 })
    },
    async loadBankAccount() {
      this.bankAccounts = await BankAccountAPI.getBank(this.profile.id)
      if (this.bankAccounts.length === 0)
        this.bankAccounts.push({ name: 'Cadastrar conta', id: 0 })
    },
    async loadCredits() {
      const response = await WalletAPI.getCredits(this.profile.id)
      this.wallet = response
    },
    formatCreditCards() {
      this.creditCards.forEach(creditCard => {
        let formatted = creditCard.expireDate.split('-')
        formatted = formatted[1] + '/' + formatted[2]
        formatted = formatted.split('T')[0]
        creditCard.expireDate = formatted
      })
    },
    async deposit() {
      const response = await WalletAPI.deposit(this.formatDataCreditCard())
      if (response.success) {
        SweetAlert.showSuccessModal()
        this.loadCreditCards()
        this.loadCredits()
      } else {
        SweetAlert.showFailModal(response.message)
      }
    },
    async withdraw() {
      const response = await WalletAPI.withdraw(this.formatDataBankAccount())
      if (response.success) {
        SweetAlert.showSuccessModal()
        this.loadCredits()
        this.loadBankAccount()
      } else {
        SweetAlert.showFailModal(response.message)
      }
    },
    formatDataBankAccount() {
      let data = this.bankAccount
      data.profileId = this.profile.id
      data.value = this.ammountBank
      if (this.bankAccount.id == 0) {
        data.newBankAccount = true
      } else {
        data.newBankAccount = false
      }
      delete data.id
      return data
    },
    formatDataCreditCard() {
      let data = {}
      data.name = this.creditCard.name
      data.owner = this.creditCard.owner
      data.number = this.creditCard.number
      data.securityCode = this.creditCard.securityCode
      if (this.creditCard.id == 0) {
        data.newCreditCard = true
      } else {
        data.newCreditCard = false
      }
      data.expireDate = this.formatDate(this.creditCard.expireDate)
      data.value = this.ammountCreditCard
      data.profileId = this.profile.id
      return data
    },
    formatDate(date) {
      console.log(date)

      if (!date) return null
      date = date.split('/').join('/27/')
      console.log(date)

      let newDate = new Date(date)
      let formattedDate = newDate.toISOString()
      return formattedDate
    },
  },
}
</script>

<style lang="scss" scoped>
.fields {
  margin-top: 1rem;
  text-align: left;

  .line-inputs {
    grid-template-columns: repeat(3, 29%);
    grid-column-gap: 70px;
    grid-row-gap: 2rem;

    &--small {
      grid-template-columns: 30% 50%;
    }
  }
}
.button {
  text-transform: uppercase;
}
.page {
  text-align: left;

  .fields {
    .line-inputs {
      grid-template-columns: repeat(2, 45%);
      grid-column-gap: 70px;
      margin-bottom: 1rem;
    }

    .save {
      justify-content: flex-end;
      // margin-right: 2rem;
    }
  }

  &__info {
    font-size: 1.5rem;

    &--card {
      display: inline;
    }
  }
}

.label-text--active {
  transform: translateY(-1rem);
}

.valid-field {
  transform: translateY(-1rem) !important;
}

.main-grid {
  display: grid;
  grid-template-columns: repeat(2, 47%);
  grid-column-gap: 70px;
  grid-row-gap: 2rem;
  margin-top: 2rem;
}

.second-grid {
  display: grid;
  grid-template-columns: repeat(2, 47%);
  grid-column-gap: 70px;
  grid-row-gap: 2rem;
  margin-top: 2rem;
}
</style>

<style lang="scss">
.multiselect__option--highlight {
  outline: none;
  color: #fff;
  background: linear-gradient(90deg, #f0462d 0%, #ffb914 100%) !important;
}
</style>