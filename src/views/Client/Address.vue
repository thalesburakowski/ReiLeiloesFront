<template>
  <div class="page">
    <h1 class="page-title">Endereços</h1>
    <div class="button-holder">
      <button
        class="btn-add-adrress button button-principal"
        @click="showModal = true, newAddress = true"
      >
        <span>
          <i class="fas fa-plus"></i>
        </span>
        &nbsp; Adicionar Endereço
      </button>
    </div>

    <!-- *********************************Listagem -->
    <div class="fields" v-for="address in addresses" key="address.id">
      <h2 class="title-form">{{address.name}}</h2>
      <div class="line-inputs">
        <label class="label-input">
          <input type="text" disabled :value="address.state">
          <div class="label-text valid-field">Estado</div>
        </label>
        <label class="label-input">
          <input type="text" disabled :value="address.city">
          <div class="label-text valid-field">Cidade</div>
        </label>
        <label class="label-input">
          <input type="text" disabled :value="address.zipcode">
          <div class="label-text valid-field">Cep</div>
        </label>
        <label class="label-input">
          <input type="text" disabled required :value="address.street">
          <div class="label-text valid-field">Rua</div>
        </label>
        <label class="label-input">
          <input type="text" disabled required :value="address.number">
          <div class="label-text valid-field">Número</div>
        </label>
        <label class="label-input">
          <input type="text" disabled :value="address.neighborhood">
          <div class="label-text valid-field">Bairro</div>
        </label>
        <label class="label-input">
          <input type="text" disabled required>
          <div class="label-text valid-field">Complemento</div>
        </label>
      </div>
      <div class="form__actions">
        <button class="button button-cancel" @click="deleteAddress(address)">EXCLUIR</button>
        <button
          class="button button-principal"
          @click="showModal = true, modalAddress = address, newAddress = false"
        >EDITAR</button>
      </div>
    </div>

    <div v-bind:class="{ show: showModal }" class="modal">
      <!-- Modal content -->
      <div class="modal-content w3-animate-zoom">
        <div class="fields form">
          <h2 v-if="newAddress" class="title-form">Novo Endereço</h2>
          <h2 v-else class="title-form">{{modalAddress.name}}</h2>
          <div class="line-inputs">
            <label class="label-input">
              <input type="text" required :value="modalAddress.state">
              <div class="label-text">Estado</div>
            </label>
            <label class="label-input">
              <input type="text" required :value="modalAddress.city">
              <div class="label-text">Cidade</div>
            </label>
            
            <label class="label-input">
              <input type="text" required :value="modalAddress.zipcode">
              <div class="label-text">Cep</div>
            </label>
            <label class="label-input">
              <input type="text" required :value="modalAddress.street">
              <div class="label-text">Rua</div>
            </label>
            
            <label class="label-input">
              <input type="text" required :value="modalAddress.number">
              <div class="label-text">Número</div>
            </label>
            <label class="label-input">
              <input type="text" required :value="modalAddress.neighborhood">
              <div class="label-text">Bairro</div>
            </label>
            
            <label class="label-input">
              <input type="text" required>
              <div class="label-text">Complemento</div>
            </label>
            <label v-if="newAddress" class="label-input">
              <input type="text" required>
              <div class="label-text">Nome</div>
            </label>
          </div>
          <div class="form__actions">
            <button
              class="button button-cancel"
              @click="showModal = false, modalAddress = {}"
            >CANCELAR</button>
            <button
              v-if="newAddress"
              class="button button-principal"
              @click="createAddress"
            >ADICIONAR</button>
            <button v-else class="button button-principal" @click="updateAddress">ATUALIZAR</button>
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
  name: 'Address',
  data() {
    return {
      showNewAddressFields: false,
      newAddress: false,
      showModal: false,
      addresses: [
        {
          id: 1,
          zipcode: '08000-201',
          street: 'Avenida PUalista',
          number: '1250',
          neighborhood: 'Consolação',
          state: 'São Paulo',
          city: 'São Paulo',
          name: 'Home',
        },
      ],
      modalAddress: {},
    }
  },
  components: {
    SweetAlert,
  },
  methods: {
    addAddress() {},
    deleteAddress() {
      SweetAlert.showConfirmationModal()
    },
    createAddress() {
      SweetAlert.showSuccessModal()
    },
    updateAddress() {},
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/modal.scss';

.show {
  display: block;
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
  // width: 80%;
  .line-inputs {
    grid-template-columns: repeat(3, 28%);
    grid-column-gap: 70px;
    grid-row-gap: 2rem;

    &--small {
      grid-template-columns: 30% 50%;
    }
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
</style>


