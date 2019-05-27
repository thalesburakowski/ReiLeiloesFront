<template>
  <div class="page">
    <h1 class="page-title">Análises</h1>
    <div class="fields">
      <div class="line-inputs line-inputs--date">
        <span class="date-holder">
          <label class="label-input label-input--date">Inicio do filtro</label>
          <!-- :inline="true" -->
          <datepicker
            :language="ptBR"
            v-model="initialDate"
            v-validate="'required'"
            :minimumView="'month'"
            :maximumView="'month'"
            format="MMMM"
          ></datepicker>
        </span>
        <span class="date-holder">
          <label class="label-input label-input--date">Final do filtro</label>
          <!-- :inline="true" -->
          <datepicker
            :language="ptBR"
            v-model="finalDate"
            v-validate="'required'"
            :minimumView="'month'"
            :maximumView="'month'"
            format="MMMM"
          ></datepicker>
        </span>
      </div>

      <div class="analize" v-for="(item, index) in datas" :key="index">
        <h2 class="title-form">{{item.title}}</h2>
        <Chart :index="index" :labels="item.labels" :datasets="item.datasets" :type="item.type"></Chart>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from '@/components/Chart.vue'

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
    }
  },
  mounted() {
    this.getAnalyzis()
  },

  methods: {
    async getAnalyzis() {
      this.allAuctions = await AnalyzeAPI.getlastMonth()
      this.datas = [{ ...this.allAuctions }]
      // return [
      //   {
      //     type: 'line',
      //     title: 'Leilões realizados',
      //     labels: [
      //       'Jan',
      //       'Fev',
      //       'Mar',
      //       'Abr',
      //       'Mai',
      //       'Jun',
      //       'Jul',
      //       'Ago',
      //       'Set',
      //       'Out',
      //       'Nov',
      //       'Dez',
      //     ],
      //     datasets: [
      //       {
      //         label: 'Quantidade de leilões realizadas',
      //         data: [12, 19, 25, 18, 32, 30, 27, 25, 30, 45, 25, 42],
      //       },
      //       // {
      //       //   label: 'Vendas Produto 2',
      //       //   data: [42, 19, 23, 5, 21, 23, 55, 2, 3, 15, 5, 2],
      //       // },
      //       // {
      //       //   label: 'Vendas Produto 3',
      //       //   data: [12, 19, 43, 35, 12, 3, 5, 42, 43, 5, 5, 12],
      //       // },
      //     ],
      //   },
      //   {
      //     type: 'line',
      //     title: 'Leilões por Categorias',
      //     labels: [
      //       'Jan',
      //       'Fev',
      //       'Mar',
      //       'Abr',
      //       'Mai',
      //       'Jun',
      //       'Jul',
      //       'Ago',
      //       'Set',
      //       'Out',
      //       'Nov',
      //       'Dez',
      //     ],
      //     datasets: [
      //       {
      //         label: 'Livros',
      //         data: [12, 19, 3, 5, 2, 3, 5, 2, 3, 5, 5, 2],
      //       },
      //       {
      //         label: 'Tecnologia',
      //         data: [42, 19, 23, 5, 21, 23, 55, 2, 3, 15, 5, 2],
      //       },
      //       {
      //         label: 'Taylor Swift Fans',
      //         data: [30, 45, 46, 50, 58, 60, 63, 70, 72, 75, 80, 90],
      //       },
      //     ],
      //   },
      //   {
      //     type: 'bar',
      //     title: 'Venda de Produtos 3',
      //     labels: [
      //       'Jan',
      //       'Fev',
      //       'Mar',
      //       'Abr',
      //       'Mai',
      //       'Jun',
      //       'Jul',
      //       'Ago',
      //       'Set',
      //       'Out',
      //       'Nov',
      //       'Dez',
      //     ],
      //     datasets: [
      //       {
      //         label: 'Vendas Produto 1',
      //         data: [12, 19, 3, 5, 2, 3, 5, 2, 3, 5, 5, 2],
      //       },
      //       {
      //         label: 'Vendas Produto 2',
      //         data: [42, 19, 23, 5, 21, 23, 55, 2, 3, 15, 5, 2],
      //       },
      //       {
      //         label: 'Vendas Produto 3',
      //         data: [12, 19, 43, 35, 12, 3, 5, 42, 43, 5, 5, 2],
      //       },
      //     ],
      //   },
      //   {
      //     type: 'line',
      //     title: 'Venda de Produtos 4',
      //     labels: [
      //       'Jan',
      //       'Fev',
      //       'Mar',
      //       'Abr',
      //       'Mai',
      //       'Jun',
      //       'Jul',
      //       'Ago',
      //       'Set',
      //       'Out',
      //       'Nov',
      //       'Dez',
      //     ],
      //     datasets: [
      //       {
      //         label: 'Vendas Produto 1',
      //         data: [12, 19, 3, 5, 2, 3, 5, 2, 3, 5, 5, 2],
      //       },
      //       {
      //         label: 'Vendas Produto 2',
      //         data: [42, 19, 23, 5, 21, 23, 55, 2, 3, 15, 5, 2],
      //       },
      //       {
      //         label: 'Vendas Produto 3',
      //         data: [12, 19, 43, 35, 12, 3, 5, 42, 43, 5, 5, 2],
      //       },
      //     ],
      //   },
      // ]
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.fields {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-column-gap: 50px;
  grid-row-gap: 5rem;
  padding-bottom: 80px;
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

