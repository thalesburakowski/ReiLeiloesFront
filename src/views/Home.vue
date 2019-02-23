<template>
  <div class="page">
    <div class="page-advanced-search">
      <div class="page-advanced-search-label">Pesquisa Avançada</div>
      <div class="page-advanced-search-select">
        <Multiselect
          v-model="value"
          :options="options"
          :multiple="true"
          :close-on-select="false"
          placeholder="Pesquise por categorias"
          selectLabel="Pressione Enter para selecionar"
          deselectLabel="Pressione Enter para remover"
        ></Multiselect>
      </div>
    </div>
    <div class="grid">
      <div
        class="auction"
        v-for="product in products"
        :key="product.id"
        @click="clickProduct(product)"
      >
        <span class="auction__img-holder">
          <img :src="product.url" alt class="auction__img" />
        </span>
        <div class="auction__name">{{ product.name }}</div>
        <div class="auction__date">Lances até {{ product.finalDate }}</div>
        <div class="auction__price">R$ {{ product.price }}</div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Multiselect from 'vue-multiselect'

export default {
  name: 'Home',
  components: { Multiselect },
  data() {
    return {
      value: null,
      options: [
        'Obras de arte',
        'Colecionaveis',
        'Brinquedos',
        'Automotivo',
        'Outros',
      ],
      products: [
        {
          id: 1,
          name: 'Cadeira',
          finalDate: '01/03/2019',
          price: '19,99',
          url:
            'https://www.cadeirasparaescritorio.ind.br/media/product/29b/cadeira-eames-dkr-4-pes-em-madeira-assento-estofado-amarelo-306.jpg',
        },
        {
          id: 2,
          name: 'Oscar',
          finalDate: '05/03/2019',
          price: '199,99',
          url:
            'https://images-americanas.b2w.io/produtos/01/00/sku/10660/6/10660641_1GG.jpg',
        },
        {
          id: 3,
          name: 'Várias Canetas',
          finalDate: '21/03/2019',
          price: '9,99',
          url:
            'https://images-submarino.b2w.io/produtos/01/00/sku/12910/5/12910575_1GG.jpg',
        },
      ],
    }
  },
  methods: {
    clickProduct(product) {
      // this.$router.push(`/mercadoria/:${product.id}`);
      console.log('redirect')
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/variables.scss';
.page-advanced-search {
  display: flex;
  justify-content: flex-end;
  margin: 1rem;
  .page-advanced-search-label {
    display: flex;
    justify-content: center;
    align-self: center;
    font-family: 'Dosis-Medium';
    margin-right: 2rem;
  }
  .page-advanced-search-select {
    width: 25vw;
  }
}

.grid {
  margin-top: 5rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
  justify-items: center;
}

.auction {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  flex-direction: column;

  & > * {
    margin-bottom: 0.8rem;
    cursor: pointer;
  }

  &__img-holder {
    height: 300px;
    width: 250px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    box-shadow: 2px 5px 10px #888888;
    margin-bottom: 1.2rem;

    &:hover {
      transition: all 0.2s;
      transform: scale(1.1);
    }
  }

  &__img {
    min-width: 250px;
    min-height: 300px;
    max-height: 400px;
    max-width: 300px;
  }

  &__name {
    font-size: 2rem;
  }

  &__date {
  }

  &__price {
    font-size: 1.5rem;
    color: $green;
  }
}
</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
