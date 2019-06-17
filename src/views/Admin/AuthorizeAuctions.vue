<template>
  <div class="page">
    <div class="title-new">
      <h1 class="page-title">Autorização de Leilões</h1>
    </div>
    <div class="table">
      <div class="table-line">
        <div class="table-line-title" v-for="title in titles" :key="title">{{ title }}</div>
        <div class="table-line-title action">Ações</div>
      </div>
      <div v-for="auction in auctions" :key="auction.id">
        <div class="table-line">
          <!-- <div class="item" @click="clickAuction(auction.id)">{{ auction.authorName }}</div> -->
          <div class="item" @click="clickAuction(auction.id)">{{ auction.title }}</div>
          <!-- <div class="item" @click="clickAuction(auction.id)">{{ auction.category }}</div> -->
          <div class="item" @click="clickAuction(auction.id)">R$ {{ auction.initialPrice | number }}</div>
          <div class="item" @click="clickAuction(auction.id)">R$ {{ auction.closePrice | number }}</div>
          <div class="item">
            <div class="actions">
              <!-- <i class="icon edit fas fa-marker"></i> -->
              <i class="icon check fas fa-check" @click="authorizeAuction(auction)"></i>
              <i
                class="icon trash fas fa-times"
                @click="showModal = true, reprovedAuction.id = auction.id"
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
          <h2 class="title-form">Motivo para o não aceite do leilão</h2>
          <div class="line-inputs">
            <label class="label-input">
              <textarea placeholder="Digite o motivo " required v-model="reprovedAuction.reason"></textarea>
            </label>
          </div>
          <div class="form__actions">
            <button class="button button-cancel" @click="showModal = false">CANCELAR</button>
            <button class="button button-principal" @click="reproveAuction()">CONFIRMAR</button>
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
  name: 'AuthorizeAuctions',
  data() {
    return {
      showModal: false,
      titles: ['Nome', 'Valor Inicial', 'Valor Arremate'],
      auctions: [],
      reprovedAuction: {
        reason: '',
        id: '',
      },
    }
  },
  mounted() {
    this.getAuctions()
  },
  methods: {
    async getAuctions() {
      this.auctions = await AuctionAPI.getAllPendent()
    },
    clickAuction(id) {
      this.$router.push(`/leilao/${id}`)
    },
    async authorizeAuction(auction) {
      const result = await SweetAlert.showConfirmationModal(
        'Deseja mesmo aceitar o leilão?'
      )
      if (result.value) {
        let response = await AuctionAPI.approved({
          approved: true,
          reason: '',
          auctionId: auction.id,
        })
        if (response.approved) {
          this.showModal = false
          SweetAlert.showSuccessModal('Leilão aprovado com sucesso!')
          this.getAuctions()
        } else {
          this.showModal = false
          SweetAlert.showFailModal('Não foi possível aprovar esse leilão!')
        }
      }
    },
    async reproveAuction() {
      if (!this.reprovedAuction.reason) {
        SweetAlert.showFailModal('Preencha o motivo do não aceite!')
        return
      }
      const result = await SweetAlert.showConfirmationModal(
        'Deseja mesmo rejeitar o leilão?'
      )
      if (result.value) {
        let response = await AuctionAPI.approved({
          approved: false,
          reason: this.reprovedAuction.reason,
          auctionId: this.reprovedAuction.id,
        })
        this.reprovedAuction.reason = ''
        this.reprovedAuction.id = ''
        if (!response.approved) {
          this.showModal = false
          SweetAlert.showSuccessModal('Leilão reprovado com sucesso!')
          this.getAuctions()
        } else {
          SweetAlert.showFailModal('Não foi possível rejeitar esse leilão!')
          this.showModal = false
        }
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/modal.scss';
@import '@/assets/styles/variables.scss';

.page {
  & .page-title {
    margin-left: 0;
  }
}
.table-line {
  grid-template-columns: 40% 20% 20% 20%;

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


