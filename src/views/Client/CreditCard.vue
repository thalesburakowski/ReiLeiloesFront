<template>
  <div class="page">
    <h1 class="page-title">Cartões</h1>

    <div v-if="!creditCards" class="warnig-message warnig-message--card">
      <h3 class="warnig-message__title">Você ainda não possui um cartão cadastrado</h3>
      <p
        class="warnig-message__description"
      >Isso impede você de comprar créditos. Cadastre um agora e use 100% do nosso site!</p>

      <div class="button-holder">
        <button
          class="btn-add-adrress button button-principal"
          @click="showModal = true, newCreditCard = true"
        >
          <span>
            <i class="fas fa-plus"></i>
          </span>
          &nbsp; Cadastrar Cartão
        </button>
      </div>
    </div>

    <div v-else class="button-holder">
      <button
        class="btn-add-adrress button button-principal"
        @click="showModal = true, newCreditCard = true"
      >
        <span>
          <i class="fas fa-plus"></i>
        </span>
        &nbsp; Cadastrar Cartão
      </button>
    </div>

    <!-- *********************************Listagem -->
    <span class="main-grid">
      <div class="fields form" v-for="creditCard in creditCards" :key="creditCard.id">
        <h2 class="title-form">{{creditCard.name}}</h2>
        <div class="line-inputs">
          <!-- <label class="label-input">
          <input type="text" disabled :value="creditCard.name">
          <div class="label-text valid-field">Titular</div>
          </label>-->
          <label class="label-input">
            <input type="text" disabled :value="creditCard.number">
            <div class="label-text valid-field">Número</div>
          </label>
          <label class="label-input">
            <input type="text" disabled :value="creditCard.expiryDate">
            <div class="label-text valid-field">Vencimento</div>
          </label>
          <label class="label-input">
            <input type="text" disabled required :value="creditCard.securityCode">
            <div class="label-text valid-field">Código</div>
          </label>
        </div>
        <div class="form__actions">
          <button class="button button-cancel" @click="deletecreditCard(creditCard)">EXCLUIR</button>
          <button
            class="button button-principal"
            @click="showModal = true, modalcreditCard = creditCard, newCreditCard = false"
          >EDITAR</button>
        </div>
      </div>
    </span>

    <div :class="{ show: showModal }" class="modal">
      <!-- Modal content -->
      <div class="modal-content w3-animate-zoom">
        <div class="fields fields--no-shadow">
          <h2 v-if="newCreditCard" class="title-form">Novo Cartão</h2>
          <h2 v-else class="title-form">{{modalcreditCard.name}}</h2>
          <div class="line-inputs">
            <label v-if="newCreditCard" class="label-input">
              <input type="text" required :value="modalcreditCard.name">
              <div class="label-text">Titular</div>
            </label>
            <label class="label-input">
              <input type="text" required :value="modalcreditCard.number">
              <div class="label-text">Número</div>
            </label>
            <label class="label-input">
              <input type="text" required :value="modalcreditCard.expiryDate">
              <div class="label-text">Vencimento</div>
            </label>
            
            <label class="label-input">
              <input type="text" required :value="modalcreditCard.securityCode">
              <div class="label-text">Código</div>
            </label>
          </div>
          <div class="form__actions">
            <button
              class="button button-cancel"
              @click="showModal = false, modalcreditCard = {}"
            >CANCELAR</button>
            <button
              v-if="newCreditCard"
              class="button button-principal"
              @click="createcreditCard"
            >CADASTRAR</button>
            <button v-else class="button button-principal" @click="updatecreditCard">ATUALIZAR</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SweetAlert from '../../components/SweetAlert'
import Swal from 'sweetalert2'
export default {
  name: 'creditCard',
  data() {
    return {
      shownewCreditCardFields: false,
      newCreditCard: false,
      showModal: false,
      creditCards: false,
      modalcreditCard: {},
    }
  },
  components: {
    SweetAlert,
  },
  methods: {
    async addcreditCard() {
      this.showModal = false
      await SweetAlert.showSuccessModal()
    },
    async deletecreditCard() {
      let result = await SweetAlert.showConfirmationModal()
      if (result.value) {
        SweetAlert.showSuccessModal()
      }
    },
    async createcreditCard() {
      this.showModal = false
      ;(this.creditCards = [
        {
          id: 1,
          name: 'Paulinha da Silva',
          number: '***.****.***.789',
          expiryDate: '10/21',
          securityCode: '**9',
        },
        {
          id: 2,
          name: 'Rogério da Silva',
          number: '***.****.***.789',
          expiryDate: '10/21',
          securityCode: '**9',
        },
        {
          id: 3,
          name: 'Saulo da Silva',
          number: '***.****.***.789',
          expiryDate: '10/21',
          securityCode: '**9',
        },
      ]),
        await SweetAlert.showSuccessModal()
    },
    async updatecreditCard() {
      this.showModal = false
      await SweetAlert.showSuccessModal()
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/modal.scss';
@import '@/assets/styles/warning-message.scss';

.show {
  display: block;
}

.main-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 2rem;
}

.button-holder {
  display: flex;
  justify-content: flex-start;
  margin-top: 0.5rem;
}
.btn-add-adrress {
  font-size: 14px;

  & i {
    font-size: 12px;
  }
}

.fields {
  margin-top: 1rem;
  text-align: left;

  .line-inputs {
    grid-template-columns: 44% 43%;
    grid-column-gap: 70px;
    grid-row-gap: 2rem;
  }
}

.valid-field {
  transform: translateY(-1rem) !important;
}

.form {
  margin-bottom: 2rem;
}

.title-form {
  font-size: 1.8rem;
  color: $text-color;
  margin-bottom: 1.5rem;
}

.form__actions {
  display: flex;
  justify-content: flex-end;
}

.button {
  margin-right: 1rem;
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 0 20px;
  border: 1px solid #888;
  width: 50%;
  border-radius: 0.5rem;
}
</style>


