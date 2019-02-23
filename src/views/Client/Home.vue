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
        v-for="auction in auctions"
        :key="auction.id"
        @click="clickAuction(auction)"
      >
        <span class="auction__img-holder">
          <img :src="auction.url" alt class="auction__img">
        </span>
        <div class="auction__name">{{ auction.name }}</div>
        <div class="auction__date">{{ auction.closingTime }}</div>
        <div class="auction__price">R$ {{ auction.price }}</div>
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
      auctions: [
        {
          id: 1,
          name: 'Smartwatch Samsung Gear',
          closingTime: 'Tempo restante - 12:20:23',
          price: '50,00',
          url:
            'https://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=10148606&qld=90&l=430&a=-1=1005256167',
        },
        {
          id: 2,
          name: 'Fone de Ouvido',
          closingTime: 'Tempo restante - 06:20:23',
          price: '60,00',
          url:
            'https://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=10505294&qld=90&l=430&a=-1',
        },

        {
          id: 3,
          name: 'Smartphone Galaxy J8',
          closingTime: 'Tempo restante - 12:20:23',
          price: '399,99',
          url:
            'https://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=10288158&qld=90&l=430&a=-1=1005640192',
        },
        {
          id: 4,
          name: 'Jump Force - PS4',
          closingTime: 'Tempo restante - 12:20:23',
          price: '9,99',
          url:
            'https://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=10506211&qld=90&l=430&a=-1=1006603491',
        },
        {
          id: 29,
          name: 'Fone De Ouvido Supra Auricular Philips ',
          closingTime: 'Tempo restante - 12:20:23',
          price: '50,00',
          url:
            'https://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=10148648&qld=90&l=430&a=-1=1005256288',
        },
        {
          id: 25,
          name: 'Mac Pro Apple Me253bz/A',
          closingTime: 'Tempo restante - 12:20:23',
          price: '2.000,00',
          url:
            'https://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=6761417&qld=90&l=430&a=-1=1006148497',
        },
        {
          id: 32,
          name: ' Câmera Digital Sony Action',
          closingTime: 'Tempo restante - 02:20:23',
          price: '129,99',
          url:
            'https://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=10148614&qld=90&l=430&a=-1=1005256186',
        },
        {
          id: 40,
          name: 'Caixa De Som Bluetooth',
          closingTime: 'Tempo restante - 12:20:23',
          price: '99,99',
          url:
            'https://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=10148413&qld=90&l=430&a=-1=1005255732',
        },
      ],
    }
  },
  methods: {
    clickAuction(auction) {
      // this.$router.push(`/mercadoria/:${auction.id}`);
      console.log('redirect')
    },
  },
  countingDown(time) {
    //
  },
}
</script>

<style lang="scss" scoped>
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
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem;
  grid-row-gap: 6rem;
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
    height: 15rem;
    width: 13rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    // box-shadow: 2px 5px 15px rgba(#ffb914, 0.2);
    margin: auto;
    margin-bottom: 1rem;

    &:hover {
      transition: all 0.2s;
      transform: scale(1.1);
    }
  }

  &__img {
    // min-width: 13rem;
    // min-height: 15rem;
    max-height: 14rem;
    max-width: 12rem;
    border-radius: 5px;
    // max-height: 17rem;
    // max-width: 15rem;
    flex-shrink: 0;
  }

  &__name {
    font-size: 1.5rem;
  }

  &__date {
    color: $red-light;
  }

  &__price {
    font-size: 1.5rem;
    color: $green;
  }
}
</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
