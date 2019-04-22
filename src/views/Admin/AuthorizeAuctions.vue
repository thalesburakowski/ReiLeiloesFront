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
          <div class="item" @click="clickAuction(auction.id)">{{ auction.authorName }}</div>
          <div class="item" @click="clickAuction(auction.id)">{{ auction.name }}</div>
          <div class="item" @click="clickAuction(auction.id)">{{ auction.category }}</div>
          <div class="item" @click="clickAuction(auction.id)">R$ {{ auction.start | number }}</div>
          <div class="item" @click="clickAuction(auction.id)">R$ {{ auction.finish | number }}</div>
          <div class="item">
            <div class="actions">
              <!-- <i class="icon edit fas fa-marker"></i> -->
              <i class="icon check fas fa-check" @click="authorizeAuction(true)"></i>
              <i class="icon trash fas fa-times" @click="showModal = true"></i>
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
              <textarea placeholder="Digite o motivo " required></textarea>
            </label>
          </div>
          <div class="form__actions">
            <button class="button button-cancel" @click="showModal = false">CANCELAR</button>
            <button class="button button-principal" @click="authorizeAuction(false)">CONFIRMAR</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SweetAlert from '../../components/SweetAlert'
import AuctionAPI from '@/api/Auction'
import SweetAlertVue from '../../components/SweetAlert.vue'

export default {
  name: 'AuthorizeAuctions',
  data() {
    return {
      showModal: false,
      options: [
        'Obras de arte',
        'Colecionaveis',
        'Brinquedos',
        'Automotivo',
        'Outros',
      ],
      titles: [
        'Leiloeiro',
        'Nome',
        'Categoria',
        'Valor Inicial',
        'Valor Arremate',
      ],
      auctions: [
        {
          id: 1,
          authorName: 'Testezinho 1',
          name: 'Teste Leilão 1',
          category: 'Obras de Arte',
          start: 123.5,
          finish: 450.5,
          status: 'Aberto',
        },
      ],
    }
  },
  mounted() {
    this.getAuctions()
  },
  methods: {
    async getAuctions() {
      let response = await AuctionAPI.getAllPendent()
    },
    clickAuction(id) {
      this.$router.push(`/leilao`)
      console.log('redirect', id)
    },
    async authorizeAuction(accept) {
      const result = await SweetAlert.showConfirmationModal(
        `Deseja mesmo ${accept ? 'aceitar' : 'rejeitar'} o leilão?`
      )
      if (result.value) {
        SweetAlert.showSuccessModal()
      }
      this.showModal = false
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
  grid-template-columns: 15% 35% 20% 10% 10% 10%;
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
