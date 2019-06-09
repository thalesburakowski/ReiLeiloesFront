<template>
  <div class="page">
    <h1 class="page-title">Análises</h1>
    <span class="fields fields--date">
      <div class="line-inputs line-inputs--date">
        <span class="date-holder">
          <label class="label-input label-input--date">Inicio do filtro</label>

          <datepicker
            :language="ptBR"
            v-model="initialDate"
            v-validate="'required'"
            format="dd/MMM/yyyy"
          ></datepicker>
        </span>
        <span class="date-holder">
          <label class="label-input label-input--date">Final do filtro</label>

          <datepicker
            :language="ptBR"
            v-model="finalDate"
            v-validate="'required'"
            format="dd/MMM/yyyy"
          ></datepicker>
        </span>
        <button
          class="button button-principal"
          style="margin-left: 10px;"
          @click="getAnalyzis"
        >GERAR GRÁFICOS</button>
      </div>
    </span>
    <div class="fields" v-if="search">
      <div class="analize" v-for="(item, index) in datas" :key="index">
        <h2 class="title-form">{{item.title}}</h2>
        <Chart :index="index" :labels="item.labels" :datasets="item.datasets" :type="item.type"></Chart>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from '@/components/Chart.vue'
import SweetAlert from '../../components/SweetAlert'
import AnalyzeAPI from '@/api/Analyzes.vue'

import Datepicker from 'vuejs-datepicker'
import { en, ptBR } from 'vuejs-datepicker/dist/locale'

export default {
  name: 'Analyzis',
  components: {
    Datepicker,
    Chart,
  },
  data() {
    return {
      datas: [],
      initialDate: '',
      finalDate: '',
      ptBR: ptBR,
      allAuctions: [],
      search: false,
    }
  },
  mounted() {
    // this.getAnalyzis()
  },

  methods: {
    async getAnalyzis() {
      if (this.validate()) {
        this.search = false
        let initial = new Date(this.initialDate).toISOString()
        let final = new Date(this.finalDate).toISOString()
        console.log(initial, final)
        this.allAuctions = await AnalyzeAPI.getlastMonth(initial, final)
        let other = await AnalyzeAPI.getByCategory(initial, final)
        this.search = true
        this.datas = [{ ...this.allAuctions }, { ...other }]
      }
    },

    validate() {
      if (this.initialDate && this.finalDate) {
        return true
      } else {
        SweetAlert.showFailModal('Escolha um período de tempo!')
        return false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 50px;
  grid-row-gap: 5rem;
  padding-bottom: 80px;

  &--date {
    padding-bottom: 1rem;
    margin-bottom: 2rem;
    & .line-inputs--date {
      display: flex;
      justify-content: space-around;
      // background-color: white;
      // padding: 2rem;
      // border-radius: 5px;
      // box-shadow: 2px 5px 15px #ccc;
    }
  }
}

.analize {
  // height: 400px;
  // width: 400px;
}

.title-form {
  font-size: 1.8rem;
  color: $text-color;
  margin-bottom: 1.5rem;
  text-align: left;
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
</style>

<style>
.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).month:hover {
  border: 1px solid #ffb914;
}

.vdp-datepicker__calendar .cell.selected {
  background-color: #ffb914 !important;
}
</style>

