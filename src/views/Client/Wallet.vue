<template>
  <div class="page">
    <h1 class="page-title">Minha Carteira</h1>

    <span class="page__info">Você possui R$ 150,00 de Créditos</span>
    <span class="main-grid">
      <div class="fields">
        <div class="line-inputs">
          <div class="select">
            <Multiselect
              v-model="valueConta"
              :options="optionsConta"
              :multiple="false"
              :close-on-select="true"
              selectedLabel="Selecionado"
              placeholder="Selecione uma Conta Bancária"
              selectLabel
              deselectLabel
            ></Multiselect>
          </div>
          <label class="label-input">
            <input type="text" required>
            <div class="label-text">Valor</div>
          </label>
        </div>
        <div class="save">
          <button class="button button-principal" @click="register">Transferir Créditos</button>
        </div>
      </div>

      <div class="fields">
        <!-- <div class="line-inputs">
        <label class="label-input">
          <input type="text" v-model="model.name" maxlength="80" required>
          <div class="label-text">Nome</div>
        </label>
        </div>-->
        <div class="line-inputs">
          <div class="select">
            <Multiselect
              v-model="valueCartao"
              :options="optionsCartao"
              :multiple="false"
              :close-on-select="true"
              selectedLabel="Selecionado"
              placeholder="Selecione um Cartão para a Compra"
              selectLabel
              deselectLabel
            ></Multiselect>
          </div>
          <label class="label-input">
            <input type="text" required>
            <div class="label-text">Valor</div>
          </label>
        </div>
        <div class="save">
          <button class="button button-principal" @click="register">Inserir Créditos</button>
        </div>
      </div>
    </span>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import SweetAlert from '../../components/SweetAlert'

export default {
  name: 'Wallet',
  components: { Multiselect, SweetAlert },
  data() {
    return {
      valueConta: null,
      valueCartao: null,
      optionsConta: [
        'Minha conta Itaú',
        'Minha Conta Nubank',
        'Conta da mamãe',
        'Automotivo',
        'Outros',
      ],
      optionsCartao: [
        'Meu cartão Nubank',
        'Meu cartão Itau',
        'Cartão que roubei do zé',
      ],
    }
  },
  methods: {
    async register() {
      const result = await SweetAlert.showConfirmationModal()
      if (result.value) {
        SweetAlert.showSuccessModal()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
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
  }
}

.main-grid {
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
