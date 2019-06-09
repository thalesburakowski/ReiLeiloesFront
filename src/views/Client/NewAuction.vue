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
        <div class="line-inputs line-inputs--date">
          <span class="date-holder">
            <label class="label-input label-input--date">Inicio do leilão</label>
            <datepicker :language="ptBR" v-model="initialDate" v-validate="'required'"></datepicker>
          </span>

          <span class="date-holder" style="display: flex;">
            <label class="label-input label-input--date">Horário de inicio</label>
            <vue-timepicker v-model="time"></vue-timepicker>
          </span>
          <span class="date-holder">
            <label class="label-input label-input--date">Final do leilão</label>
            <datepicker :language="ptBR" v-model="closeDate" v-validate="'required'"></datepicker>
          </span>

          <span class="date-holder" style="display: flex;">
            <label class="label-input label-input--date">Horário final</label>
            <vue-timepicker v-model="timeFinal"></vue-timepicker>
          </span>

          <!-- <span class="date-holder">
            <label class="label-input label-input--date">
              <select name id>
                <option v-for="i in 24" :value="i" :key="i">{{i}}</option>
              </select>
              <div class="label-text">Horário</div>
            </label>
          </span>-->
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

        <div class="line-inputs">
          <label class="label-input">
            <input type="text" required v-model="imageUrl ">
            <div class="label-text">Link da imagem:</div>
          </label>
          <button class="button button-cancel" @click="addImage">Adicionar imagem</button>
        </div>

        <div v-if="auction.images.length > 0">
          Imagens selecionadas:
          <carousel class="carousel">
            <slide v-for="(image, index) in auction.images" :key="index">
              <img class="carousel__image" :src="image" alt>
            </slide>
          </carousel>
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

import Datepicker from 'vuejs-datepicker'
import { en, ptBR } from 'vuejs-datepicker/dist/locale'
import { Carousel, Slide } from 'vue-carousel'
import VueTimepicker from 'vue2-timepicker'

export default {
  name: 'NewAuction',
  components: {
    Multiselect,
    mixins: [Vue2Filters.mixin],
    Money,
    Datepicker,
    Carousel,
    Slide,
    VueTimepicker,
  },
  data() {
    return {
      user: {},
      profile: {},
      imageUrl: '',
      options: [],
      auction: {
        title: '',
        categories: [],
        description: '',
        height: '',
        width: '',
        depth: '',
        initialPrice: '',
        closePrice: '',
        initialDate: '',
        closeDate: '',
        images: [],
      },
      initialDate: '',
      closeDate: '',
      time: {
        HH: '',
        mm: '',
      },
      timeFinal: {
        HH: '',
        mm: '',
      },
      ptBR: ptBR,
      price: 0,
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
    this.getUserInfo()
  },
  methods: {
    async getCategories() {
      this.options = await CategoryAPI.getAll()
    },
    addImage() {
      if (this.imageUrl !== '') this.auction.images.push(this.imageUrl)
      this.imageUrl = ''
    },
    async createAuction() {
      this.formatDates()
      let categoriesIds = this.auction.categories.map(category => category.id)
      let response = await AuctionAPI.create({
        ...this.auction,
        categories: categoriesIds,
        profileId: this.profile.id,
      })

      if (response) {
        SweetAlertVue.showSuccessModal(
          'Assim que nosso administrador analisá-lo você será notificado.',
          'Cadastro Solicitado!'
        )
      }
    },
    formatDates() {
      let date = new Date(this.initialDate)
      date.setHours(this.time.HH, this.time.mm)
      this.auction.initialDate = date.toISOString()

      date = new Date(this.closeDate)
      date.setHours(this.timeFinal.HH, this.timeFinal.mm)
      this.auction.closeDate = date.toISOString()
    },
    async validate() {
      let isValid = await this.$validator.validate()

      if (isValid) {
        if (!this.auction.images.length > 0) {
          SweetAlert.showFailModal('Adicione uma imagem ao seu leilão')
        } else if (!this.validateDate) {
          SweetAlert.showFailModal('Insira datas válidas')
        } else {
          this.createAuction()
        }
      } else {
        SweetAlert.showFailModal('Preencha todos os campos!')
      }
    },
    async getUserInfo() {
      this.user = JSON.parse(localStorage.getItem('user'))
      this.profile = JSON.parse(localStorage.getItem('profile'))
      if (!this.profile) {
        await SweetAlert.showFailModal(
          'Você deve preencher seus dados pessoais antes de prosseguir!'
        )
        this.$router.push('/dados')
      }
    },
    validateDate() {
      let dateInitialAuction = new Date(this.initialDate)
      dateInitialAuction.setHours(this.time.HH, this.time.mm)
      let dateCloseAuction = new Date(this.closeDate)
      dateCloseAuction.setHours(this.timeFinal.HH, this.timeFinal.mm)
      let now = new Date(Date.now())
      if (dateInitialAuction.getTime() < now.getTime()) return false
      if (dateInitialAuction.getTime() > dateCloseAuction.getTime())
        return false
      return true
    },
  },
}
</script>

<style lang="scss" scoped>
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
      grid-template-columns: repeat(3, 1fr);
      grid-column-gap: 40px;
      grid-row-gap: 2rem;
      &--form {
        grid-template-columns: repeat(3, 1fr);
      }

      &--entire {
        grid-template-columns: 2fr 1fr;
      }

      &--date {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    .date-holder {
      position: relative;
    }

    .label-input--date {
      position: absolute;
      left: 0;
      font-size: 0.8rem;
      font-family: 'Roboto-Regular';
      top: -10px;
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

  .carousel__image {
    max-height: 200px;
  }

  .VueCarousel-slide {
    position: relative;
    height: 200px;
  }

  .VueCarousel {
    width: 50rem;
  }
}
</style>
<style>
.vdp-datepicker__calendar .cell.selected {
  background-color: #ffb914 !important;
}

.time-picker {
  width: 100%;
  border-bottom: solid 1px #cccccc;
  text-align: left;
}

.time-picker .dropdown ul li.active,
.time-picker .dropdown ul li.active:hover {
  background-color: #ffb914 !important;
}

.time-picker input.display-time {
  border: none;
}

.time-picker input.display-time {
  height: auto;
  padding-bottom: 0 !important;
  padding-left: 0 !important;
  width: auto;
}

.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).day:hover {
  border: 1px solid #ffb914;
}
</style>