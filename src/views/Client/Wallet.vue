<template>
  <div class="page">
    <h1 class="page-title">Minha Carteira</h1>

    <span class="page__info">Você possui R$ 150,00 na Carteira</span>
    <!-- <div class="wallet-info">
      <span class="page__info">Você possui R$ 150,00 Pendente</span>
      <button class="button button-principal" @click="withdraw">Transferir para Minha conta</button>
      <button class="button button-principal" @click="withdraw">Transferir Créditos</button>
    </div>-->
    <span class="main-grid">
      <span class="page__info">Transferir para uma conta bancária</span>
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

        <div class="line-inputs" v-if="bankAccount.id == 0">
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
            <input type="text" required :value="creditCard.owner">
            <div class="label-text">Titular</div>
          </label>
          <label class="label-input">
            <input type="text" required :value="creditCard.number">
            <div class="label-text">Número</div>
          </label>
          <label class="label-input">
            <input type="text" required :value="creditCard.expiryDate">
            <div class="label-text">Vencimento</div>
          </label>

          <label class="label-input">
            <input type="text" required :value="creditCard.securityCode">
            <div class="label-text">Código</div>
          </label>

          <label class="label-input">
            <input type="text" required :value="creditCard.name">
            <div class="label-text">Nome do cartão</div>
          </label>
        </div>

        <div class="save">
          <button class="button button-principal" @click="deposit">Inserir</button>
        </div>
      </div>
    </span>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import SweetAlert from '../../components/SweetAlert'

// import UserAPI from '@/api/User'
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
        name: 'Selecione uma conta',
      },
      creditCard: {
        name: 'Selecione um cartão',
        owner: '',
        number: '',
        expiryDate: '',
        securityCode: '',
      },
      user: {
        id: null,
      },
      ammountCreditCard: '',
      ammountBank: '',
      bankAccounts: [],
      creditCards: [],
    }
  },
  mounted() {
    this.loadCreditCards()
    this.loadBankAccounts()
    // this.loadCredits();
    console.log('mounted')
  },
  methods: {
    async loadCreditCards() {
      //profile.id
      // const result = await CreditCardAPI.getAll(this.user.profileId)
      this.creditCards.push({ name: 'Novo cartão', id: 0 })
    },
    async loadBankAccounts() {
      //profile.id
      // const result = await BankAccountAPI.getAll(this.user.profileId)
      this.bankAccounts = await BankAccountAPI.getAll(1)
      this.bankAccounts.push({ name: 'Nova conta', id: 0 })
    },
    async loadCredits() {
      const response = await WalletAPI.getCredits(this.user.profileId)
    },
    async deposit() {
      let data = this.creditCard
      data.newCreditCard = false
      if (this.creditCard.id == 0) {
        data.newCreditCard = true
      }
      data.value = this.ammountCreditCard
      data.profileId = JSON.parse(localStorage.getItem('profile')).id
      console.log(data)

      const response = await WalletAPI.deposit(data)
    },
    async withdraw() {
      const response = await WalletAPI.withdraw(this.user.profileId)
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