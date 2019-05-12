<template>
  <div class="page">
    <div class="title-new">
      <h1 class="page-title">Pedidos de cancelamento de Leilões</h1>
    </div>
    <div class="table">
      <div class="table-line">
        <div class="table-line-title" v-for="title in titles" :key="title">{{ title }}</div>
      </div>
      <div v-for="request in auctions" :key="request.id">
        <div class="table-line">
          <div class="item">{{ request.auction.winner.name }}</div>
          <div class="item">{{ request.auction.owner.name }}</div>
          <div class="item">{{ request.auction.title }}</div>
          <div class="item">R$ {{ request.auction.actualPrice | number }}</div>
          <div class="item" @click="showReason(request)">{{ request.reasonRequest }}</div>
          <div class="item">
            <div class="actions">
              <i
                class="icon check fas fa-check"
                @click="showModal = true; accept = true; requestObj = request"
              ></i>
              <i
                class="icon trash fas fa-times"
                @click="showModal = true, accept = false, requrequestObjest = request"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div :class="{ show: showModal }" class="modal">
      <!-- Modal content -->
      <div class="modal-content modal-content--small w3-animate-zoom">
        <div class="fields fields--no-shadow">
          <h2 v-if="accept" class="title-form">Motivo para o cancelamento do leilão</h2>
          <h2 v-else class="title-form">Motivo para o não cancelamento do leilão</h2>
          <div class="line-inputs">
            <label class="label-input">
              <textarea placeholder="Digite o motivo" v-model="reasonResponse" required></textarea>
            </label>
          </div>
          <div class="form__actions">
            <button class="button button-cancel" @click="showModal = false">CANCELAR</button>
            <button class="button button-principal" @click="sendResponse">CONFIRMAR</button>
          </div>
        </div>
      </div>
    </div>

    <div :class="{ show: showReasonModal }" class="modal">
      <!-- Modal content -->
      <div class="modal-content modal-content--small w3-animate-zoom">
        <div class="fields fields--no-shadow">
          <h2 v-if="reason.title" class="title-form">{{reason.title}}</h2>
          <div class="line-inputs">
            <label class="label-input">
              <textarea :value="reason.text" disabled></textarea>
            </label>
          </div>
          <div class="form__actions">
            <button class="button button-principal" @click="showReasonModal = false">ENTENDI</button>
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
  name: 'AuthorizeReturn',
  data() {
    return {
      showModal: false,
      showReasonModal: false,
      accept: undefined,
      auctions: [],
      requestObj: {},
      reasonResponse: '',
      reason: {
        title: 'Razão para o pedido de cancelamento',
        text: '',
      },
      titles: [
        'Cliente',
        'Leiloeiro',
        'Mercadoria',
        'Valor Vendido',
        'Razão',
        'Ações',
      ],
    }
  },
  mounted() {
    this.getAuctions()
  },
  methods: {
    async getAuctions() {
      this.auctions = (await AuctionAPI.getRequestAnnulments()).auctionCancellationRequests
    },
    async showReason(request) {
      this.reason.text = request.reasonRequest
      this.showReasonModal = true
    },
    async sendResponse() {
      if (this.reasonResponse.length < 5) {
        SweetAlert.showFailModal('Insira um motivo válido')
        return
      }
      this.showModal = false
      let data = {
        reasonResponse: this.reasonResponse,
        status: this.accept,
        auctionCancellationId: this.requestObj.id,
      }
      const response = await AuctionAPI.responseRequesAnnulament(data)
      if (response) {
        SweetAlert.showSucessModal()
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
  grid-template-columns: 15% 15% 20% 10% 30% 10%;
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
