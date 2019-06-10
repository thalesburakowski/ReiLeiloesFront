<template>
  <div class="page">
    <div class="title-new">
      <h1 class="page-title">Devolução de mercadorias</h1>
    </div>
    <div class="table">
      <div class="table-line">
        <div class="table-line-title" v-for="title in titles" :key="title">{{ title }}</div>
      </div>
      <div v-for="(request, index) in auctions" :key="index">
        <div class="table-line">
          <div class="item">{{ request.auction.winner.name }}</div>
          <div class="item">{{ request.auction.owner.name }}</div>
          <div class="item">{{ request.auction.title }}</div>
          <div class="item">R$ {{ request.auction.actualPrice | number }}</div>
          <div class="item">
            <div class="actions">
              <i class="icon check fas fa-check" @click="devolution(request)"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SweetAlert from '../../components/SweetAlert'
import AuctionAPI from '@/api/Auction'

export default {
  name: 'RegisterDevolution',
  data() {
    return {
      auctions: [],
      requestObj: {},
      reasonResponse: '',
      titles: [
        'Cliente',
        'Leiloeiro',
        'Mercadoria',
        'Valor Vendido',
        'Marcar como devolvido',
      ],
    }
  },
  mounted() {
    this.getAuctions()
  },
  methods: {
    async getAuctions() {
      this.auctions = (await AuctionAPI.getAwaitingDevolution()).auctionCancellationRequests
    },
    async devolution(auction) {
      let data = {
        reasonResponse: this.reasonResponse,
        status: true,
        auctionId: auction.auction.id,
        auctionCancellationId: auction.id,
      }
      const response = await AuctionAPI.responseRequesAnnulament(data)
      console.log(response)

      if (!response.active) {
        SweetAlert.showSuccessModal()
        this.getAuctions()
      } else {
        SweetAlert.showFailModal()
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/modal.scss';
.page {
  & .page-title {
    margin-left: 0;
  }
}
.table-line {
  grid-template-columns: 2fr 2fr 2fr 1fr 1fr;
  .item:first-child {
    padding-left: 1rem;
  }
}

.form {
  margin-bottom: 2rem;
}

.title-form {
  font-size: 1.8rem;
  color: $text-color;
  margin-bottom: 1.5rem;
  text-align: left;
}

.form__actions {
  display: flex;
  justify-content: flex-end;
}

.button {
  margin-right: 1rem;
}
</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
