<template>
  <div class="page">
    <h1 class="page-title">Meus Endereços</h1>
    <div class="button-holder">
      <button
        class="btn-add-adrress button button-principal"
        @click="showModal = true, newAddress = true, cleanModel()"
      >
        <span>
          <i class="fas fa-plus"></i>
        </span>
        &nbsp; Adicionar Endereço
      </button>
    </div>

    <!-- *********************************Listagem -->
    <div class="fields form" v-for="address in addresses" :key="address.id">
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
          <input type="text" disabled :value="address.zipCode">
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
          <input type="text" disabled required :value="address.neighboorhood">
          <div class="label-text valid-field">Bairro</div>
        </label>
        <label class="label-input">
          <input type="text" disabled :value="address.complement">
          <div class="label-text valid-field">Complemento</div>
        </label>
      </div>
      <div class="form__actions">
        <button class="button button-cancel" @click="deleteAddress(address.id)">EXCLUIR</button>
        <button
          class="button button-principal"
          @click="showModal = true, assingToModalAddress(address), newAddress = false"
        >EDITAR</button>
      </div>
    </div>

    <div :class="{ show: showModal }" class="modal">
      <!-- Modal content -->
      <div class="modal-content w3-animate-zoom">
        <div class="fields fields--no-shadow">
          <h2 v-if="newAddress" class="title-form">Novo Endereço</h2>
          <!-- <h2 v-else class="title-form">{{modalAddress.name}}</h2> -->
          <div class="line-inputs">
            <label class="label-input">
              <input type="text" required v-model="modalAddress.state" :disabled="!newAddress">
              <div class="label-text" :class="[!newAddress ? 'valid-field' : '']">Estado</div>
            </label>
            <label class="label-input">
              <input type="text" required v-model="modalAddress.city" :disabled="!newAddress">
              <div class="label-text" :class="[!newAddress ? 'valid-field' : '']">Cidade</div>
            </label>

            <label class="label-input">
              <input type="text" required v-model="modalAddress.zipCode" :disabled="!newAddress">
              <div class="label-text" :class="[!newAddress ? 'valid-field' : '']">Cep</div>
            </label>
            <label class="label-input">
              <input type="text" required v-model="modalAddress.street" :disabled="!newAddress">
              <div class="label-text" :class="[!newAddress ? 'valid-field' : '']">Rua</div>
            </label>

            <label class="label-input">
              <input type="text" required v-model="modalAddress.number" :disabled="!newAddress">
              <div class="label-text" :class="[!newAddress ? 'valid-field' : '']">Número</div>
            </label>
            <label class="label-input">
              <input
                type="text"
                required
                v-model="modalAddress.neighboorhood"
                :disabled="!newAddress"
              >
              <div class="label-text" :class="[!newAddress ? 'valid-field' : '']">Bairro</div>
            </label>

            <label class="label-input">
              <input type="text" v-model="modalAddress.complement" :disabled="!newAddress">
              <div class="label-text" :class="[!newAddress ? 'valid-field' : '']">Complemento</div>
            </label>
            <label class="label-input">
              <input type="text" v-model="modalAddress.name" required>
              <div class="label-text">Nome</div>
            </label>
          </div>
          <div class="form__actions">
            <button class="button button-cancel" @click="showModal = false, cleanModel">CANCELAR</button>
            <button
              v-if="newAddress"
              class="button button-principal"
              @click="createAddress"
            >ADICIONAR</button>
            <button
              v-else
              class="button button-principal"
              @click="updateAddress(modalAddress)"
            >ATUALIZAR</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SweetAlert from '../../components/SweetAlert'
import AddressAPI from '@/api/Address'

export default {
  name: 'Address',
  data() {
    return {
      showNewAddressFields: false,
      newAddress: false,
      showModal: false,
      addresses: [],
      modalAddress: {
        zipCode: '',
        street: '',
        number: '',
        neighboorhood: '',
        state: '',
        city: '',
        name: '',
        complement: '',
      },
      profile: {},
    }
  },
  components: {
    SweetAlert,
  },
  mounted: function() {
    this.loadInfo()
  },
  methods: {
    async loadInfo() {
      await this.getInfo()
      this.getAddress()
    },
    getInfo() {
      this.profile = JSON.parse(localStorage.getItem('profile'))
    },
    cleanModel() {
      this.modalAddress = {
        zipCode: '',
        street: '',
        number: '',
        neighboorhood: '',
        state: '',
        city: '',
        name: '',
        complement: '',
      }
    },
    assingToModalAddress(address) {
      this.modalAddress = Object.assign(this.modalAddress, address)
    },
    async getAddress() {
      const response = await AddressAPI.getAddress(this.profile.id)
      if (response.msg) await SweetAlert.showFailModal(response.msg)
      this.addresses = response.entities
    },
    async addAddress() {
      this.showModal = false
      await SweetAlert.showSuccessModal()
    },
    async deleteAddress(id) {
      const result = await SweetAlert.showConfirmationModal()
      if (result.value) {
        this.getAddress()
        const response = await AddressAPI.delete(id)
        if (response.msg) await SweetAlert.showFailModal(response.msg)
        else await SweetAlert.showSuccessModal()
      }
    },
    async createAddress() {
      this.showModal = false
      const response = await AddressAPI.create({
        ...this.modalAddress,
        profileId: this.profile.id,
      })
      if (response.msg) await SweetAlert.showFailModal(response.msg)
      else await SweetAlert.showSuccessModal()
      this.getAddress()
      this.cleanModel()
    },
    async updateAddress(modalAddress) {
      const response = await AddressAPI.updateAddress({
        id: modalAddress.id,
        name: modalAddress.name,
        profileId: this.profile.id,
      })
      if (response.msg) await SweetAlert.showFailModal(response.msg)
      else await SweetAlert.showSuccessModal()
      this.getAddress()
      this.showModal = false
      await SweetAlert.showSuccessModal()
    },
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
    grid-template-columns: repeat(3, 29%);
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

.valid-field-modal {
  transform: translateY(1rem) !important;
}

.valid-field-modal-2 {
  transform: translateY(1rem) !important;
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


