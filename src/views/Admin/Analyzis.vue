<template>
  <div class="page">
    <h1 class="page-title">Análises</h1>
    <div class="fields">
      <div class="analize" v-for="(item, index) in datas" :key="index">
        <h2 class="title-form">{{item.title}}</h2>
        <Chart :index="index" :labels="item.labels" :datasets="item.datasets" :type="item.type"></Chart>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from '@/components/Chart.vue'
export default {
  name: 'Analyzis',
  data() {
    return {
      datas: [],
    }
  },
  mounted() {
    this.datas = this.getAnalyzis()
  },
  components: {
    Chart,
  },
  methods: {
    getAnalyzis() {
      return [
        {
          type: 'line',
          title: 'Leilões realizados',
          labels: [
            'Jan',
            'Fev',
            'Mar',
            'Abr',
            'Mai',
            'Jun',
            'Jul',
            'Ago',
            'Set',
            'Out',
            'Nov',
            'Dez',
          ],
          datasets: [
            {
              label: 'Quantidade de leilões realizadas',
              data: [12, 19, 25, 18, 32, 30, 27, 25, 30, 45, 25, 42],
            },
            // {
            //   label: 'Vendas Produto 2',
            //   data: [42, 19, 23, 5, 21, 23, 55, 2, 3, 15, 5, 2],
            // },
            // {
            //   label: 'Vendas Produto 3',
            //   data: [12, 19, 43, 35, 12, 3, 5, 42, 43, 5, 5, 12],
            // },
          ],
        },
        {
          type: 'line',
          title: 'Leilões por Categorias',
          labels: [
            'Jan',
            'Fev',
            'Mar',
            'Abr',
            'Mai',
            'Jun',
            'Jul',
            'Ago',
            'Set',
            'Out',
            'Nov',
            'Dez',
          ],
          datasets: [
            {
              label: 'Livros',
              data: [12, 19, 3, 5, 2, 3, 5, 2, 3, 5, 5, 2],
            },
            {
              label: 'Tecnologia',
              data: [42, 19, 23, 5, 21, 23, 55, 2, 3, 15, 5, 2],
            },
            {
              label: 'Taylor Swift Fans',
              data: [30, 45, 46, 50, 58, 60, 63, 70, 72, 75, 80, 90],
            },
          ],
        },
        {
          type: 'bar',
          title: 'Venda de Produtos 3',
          labels: [
            'Jan',
            'Fev',
            'Mar',
            'Abr',
            'Mai',
            'Jun',
            'Jul',
            'Ago',
            'Set',
            'Out',
            'Nov',
            'Dez',
          ],
          datasets: [
            {
              label: 'Vendas Produto 1',
              data: [12, 19, 3, 5, 2, 3, 5, 2, 3, 5, 5, 2],
            },
            {
              label: 'Vendas Produto 2',
              data: [42, 19, 23, 5, 21, 23, 55, 2, 3, 15, 5, 2],
            },
            {
              label: 'Vendas Produto 3',
              data: [12, 19, 43, 35, 12, 3, 5, 42, 43, 5, 5, 2],
            },
          ],
        },
        {
          type: 'line',
          title: 'Venda de Produtos 4',
          labels: [
            'Jan',
            'Fev',
            'Mar',
            'Abr',
            'Mai',
            'Jun',
            'Jul',
            'Ago',
            'Set',
            'Out',
            'Nov',
            'Dez',
          ],
          datasets: [
            {
              label: 'Vendas Produto 1',
              data: [12, 19, 3, 5, 2, 3, 5, 2, 3, 5, 5, 2],
            },
            {
              label: 'Vendas Produto 2',
              data: [42, 19, 23, 5, 21, 23, 55, 2, 3, 15, 5, 2],
            },
            {
              label: 'Vendas Produto 3',
              data: [12, 19, 43, 35, 12, 3, 5, 42, 43, 5, 5, 2],
            },
          ],
        },
      ]
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.fields {
  display: grid;
  grid-template-columns: repeat(3, 30%);
  grid-column-gap: 50px;
  grid-row-gap: 5rem;
  padding-bottom: 80px;
}

.analize {
  height: 400px;
  width: 400px;
}

.title-form {
  font-size: 1.8rem;
  color: $text-color;
  margin-bottom: 1.5rem;
  text-align: left;
}
</style>
