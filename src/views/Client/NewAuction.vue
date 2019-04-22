<template>
  <div>
    <div class="page">
      <h1 class="page-title">Cadastro de leilão</h1>
      <div class="fields">
        <div class="line-inputs">
          <label class="label-input">
            <input
              type="text"
              maxlength="80"
              v-model="auction.title"
              required
              v-validate="'required'"
            >
            <div class="label-text">Título do leilão</div>
          </label>
          <label class="label-input holder-money">
            <money
              class="input-money"
              required
              v-model="auction.initialPrice"
              v-validate="'required|min_value:1'"
              v-bind="money"
              style="outline:0"
            ></money>
            <div class="label-text label-money">Preço inicial</div>
          </label>
          <label class="label-input holder-money">
            <money
              class="input-money"
              required
              v-model="auction.closePrice"
              v-validate="'required|min_value:1'"
              v-bind="money"
              style="outline:0"
            ></money>
            <div class="label-text">Preço de arremate</div>
          </label>
        </div>

        <div class="line-inputs">
          <label class="label-input">
            <input
              type="text"
              maxlength="80"
              required
              v-model="auction.height"
              v-validate="'required'"
              v-mask="'######'"
            >
            <div class="label-text">Altura (em cm)</div>
          </label>
          <label class="label-input">
            <input
              type="text"
              required
              v-model="auction.width"
              v-validate="'required'"
              v-mask="'######'"
            >
            <div class="label-text">Largura (em cm)</div>
          </label>
          <label class="label-input">
            <input
              type="text"
              required
              v-model="auction.depth"
              v-validate="'required'"
              v-mask="'######'"
            >
            <div class="label-text">Profundidade (em cm)</div>
          </label>
        </div>

        <div class="line-inputs line-inputs--entire">
          <label class="label-input">
            <textarea
              type="text"
              placeholder="Descrição da mercadoria "
              v-model="auction.description"
              v-validate="'required'"
            />
          </label>

          <div class="page-advanced-search-select">
            <Multiselect
              v-model="auction.categories"
              v-validate="'required'"
              :options="options"
              :multiple="true"
              :close-on-select="false"
              placeholder="Pesquise por categorias"
              label="name"
              selectLabel
              deselectLabel
            ></Multiselect>
          </div>
        </div>

        <div class="form__actions">
          <!-- <button class="button button-cancel" name="inativar-conta">Inativar Conta</button> -->
          <button class="button button-principal" @click="validate">CADASTRAR</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Multiselect from 'vue-multiselect'
import Vue2Filters from 'vue2-filters'
import { Money } from 'v-money'
import SweetAlert from '../../components/SweetAlert'
import CategoryAPI from '@/api/Category'
import AuctionAPI from '@/api/Auction'
import SweetAlertVue from '../../components/SweetAlert.vue'

export default {
  name: 'NewAuction',
  components: { Multiselect, mixins: [Vue2Filters.mixin], Money },
  data() {
    return {
      user: {},
      profile: {},
      options: [
        'Obras de arte',
        'Colecionaveis',
        'Brinquedos',
        'Automotivo',
        'Outros',
      ],
      auction: {
        title: '',
        categories: [],
        description: '',
        height: '',
        width: '',
        depth: '',
        initialPrice: '',
        closePrice: '',
      },

      price: 123.45,
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: false /* doesn't work with directive */,
      },
    }
  },
  mounted() {
    this.getCategories()
    // this.getUserInfo()
  },
  methods: {
    async getCategories() {
      this.options = await CategoryAPI.getAll()
    },
    async createAuction() {
      let categoriesIds = this.auction.categories.map(category => category.id)

      let response = await AuctionAPI.create({
        ...this.auction,
        categories: categoriesIds,
      })

      if (response) {
        SweetAlertVue.showSuccessModal(
          'Assim que nosso administrador analisá-lo você será notificado.',
          'Cadastro Solicitado!'
        )
      }
    },
    async validate() {
      let isValid = await this.$validator.validate()
      console.log(isValid)

      if (isValid) {
        this.createAuction()
      } else {
        SweetAlert.showFailModal('Preencha todos os campos!')
      }
    },
    getUserInfo() {
      this.user = JSON.parse(localStorage.getItem('user'))
      this.profile = JSON.parse(localStorage.getItem('profile'))
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/modal.scss';
.page {
  textarea {
    resize: none;
  }
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
      justify-content: flex-start;
      grid-template-columns: repeat(3, 28%);
      grid-column-gap: 40px;
      grid-row-gap: 2rem;
      &--form {
        grid-template-columns: repeat(3, 30%);
      }

      &--entire {
        grid-template-columns: 59% 28%;
      }
    }

    .holder-money {
      display: flex;
      flex-direction: column;
      padding-top: 10px;
    }

    .holder-money .label-text {
      margin-top: -2rem;
    }

    .input-money {
      border-top: none;
      border-left: none;
      border-right: none;
    }

    .save {
      justify-content: flex-end;
    }
  }
}
</style>
