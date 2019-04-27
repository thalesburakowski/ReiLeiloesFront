<template>
  <div class="page">
    <div class="page-advanced-search">
      <div class="page-advanced-search-label">Pesquisa Avançada</div>
      <div class="page-advanced-search-select">
        <Multiselect
          v-model="value"
          :options="options"
          :multiple="true"
          label="name"
          :close-on-select="false"
          placeholder="Pesquise por categorias"
          selectLabel
          deselectLabel
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
          <img :src="auction.images ?  auction.images[0] : ''" alt class="auction__img">
        </span>
        <div class="auction__name">{{ auction.title }}</div>
        <div class="auction__date">Até: {{ auction.closeDate | formatDate }} às 23:59</div>
        <div class="auction__price">{{auction.actualPrice | number}}</div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Multiselect from 'vue-multiselect'
import AuctionAPI from '@/api/Auction'
import CategoryAPI from '@/api/Category'
import { Money } from 'v-money'

export default {
  name: 'Home',
  components: { Multiselect, Money },
  data() {
    return {
      value: null,
      options: [],
      auctions: [],
      price: 0,
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: false,
      },
    }
  },
  mounted() {
    this.getAuctions()
    this.getCategories()
  },
  methods: {
    async getCategories() {
      this.options = await CategoryAPI.getAll()
    },
    async getAuctions() {
      this.auctions = await AuctionAPI.getApproved()
    },
    clickAuction(auction) {
      // this.$router.push(`/mercadoria/:${auction.id}`);
      this.$router.push(`/leilao/${auction.id}`)
    },
  },
  countingDown(time) {},
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

  .money {
    outline: 0;
    background-color: transparent;
    font-size: 1.5rem;
    color: $green;
    border: none;
    max-width: 200px;
    text-align: center;
  }
}
</style>


<style lang="scss">
.multiselect__option--highlight {
  outline: none;
  color: #fff;
  background: linear-gradient(90deg, #f0462d 0%, #ffb914 100%) !important;
}
.multiselect__tag {
  background: linear-gradient(90deg, #f0462d 0%, #ffb914 100%) !important;
}

.multiselect__tag-icon:after {
  color: white !important;
  font-size: 1rem !important;
  margin-top: -2px !important;
}

.multiselect__tag-icon:focus,
.multiselect__tag-icon:hover {
  background: #f0462d !important;
  color: white !important;
}
</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
