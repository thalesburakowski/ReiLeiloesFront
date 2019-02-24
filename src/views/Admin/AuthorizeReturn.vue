<template>
  <div class="page">
    <div class="title-new">
      <h1 class="page-title">Pedidos de cancelamento de Leilões</h1>
    </div>
    <div class="table">
      <div class="table-line">
        <div class="table-line-title" v-for="title in titles" :key="title">{{ title }}</div>
        <div class="table-line-title action">Motivo</div>
      </div>
      <div v-for="request in devolutionRequests" :key="request.id">
        <div class="table-line" @click="showReason(request.id)">
          <div class="item">{{ request.client }}</div>
          <div class="item">{{ request.seller }}</div>
          <div class="item">{{ request.category }}</div>
          <div class="item">R$ {{ request.value | number }}</div>
          <div class="item">{{ request.reason }}</div>
          <div class="item">
            <div class="actions">
              <!-- <i class="icon edit fas fa-marker"></i> -->
              <i class="icon check fas fa-check" @click="showModal = true; accept = true"></i>
              <i class="icon trash fas fa-times" @click="showModal = true; accept = false"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div :class="{ show: showModal }" class="modal">
      <!-- Modal content -->
      <div class="modal-content modal-content--small w3-animate-zoom">
        <div class="fields">
          <h2 v-if="accept" class="title-form">Motivo para o cancelamento do leilão</h2>
          <h2 v-else class="title-form">Motivo para o não cancelamento do leilão</h2>
          <div class="line-inputs">
            <label class="label-input">
              <textarea placeholder="Digite o motivo " required></textarea>
            </label>
          </div>
          <div class="form__actions">
            <button class="button button-cancel" @click="showModal = false">CANCELAR</button>
            <button class="button button-principal" @click="createAddress">CONFIRMAR</button>
          </div>
        </div>
      </div>
    </div>

    <div :class="{ show: showReasonModal }" class="modal">
      <!-- Modal content -->
      <div class="modal-content modal-content--small w3-animate-zoom">
        <div class="fields">
          <h2 v-if="reason.title" class="title-form">{{reason.title}}</h2>
          <div class="line-inputs">
            <label class="label-input">
              <textarea :value="reason.text" required></textarea>
            </label>
          </div>
          <div class="form__actions">
            <button class="button button-cancel" @click="showReasonModal = false">CANCELAR</button>
            <button class="button button-principal" @click="createAddress">CONFIRMAR</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SweetAlert from '../../components/SweetAlert'

export default {
  name: 'AuthorizeReturn',
  data() {
    return {
      showModal: false,
      showReasonModal: false,
      accept: undefined,
      reason: {
        title: 'Me enviaram um tijolo!',
        text:
          'Olha só, eu achei totalmente desnecessário o que o leiloeiro fez, ele me enviou um tijolo!',
      },
      titles: ['Cliente', 'Leiloeiro', 'Mercadoria', 'Valor Vendido', 'Razão'],
      devolutionRequests: [
        {
          id: 1,
          client: 'Testezinho 1',
          seller: 'Teste Leilão 1',
          category: 'Obras de Arte',
          value: 450.5,
          reason: 'Aberto',
        },
        {
          id: 2,
          client: 'Testezinho 2',
          seller: 'Teste Leilão 2',
          category: 'Colecionaveis',
          value: 450.5,
          reason: 'Aberto',
        },
        {
          id: 3,
          client: 'Testezinho 3',
          seller: 'Teste Leilão 3',
          category: 'Brinquedos',
          value: 450.5,
          reason: 'Fechado',
        },
        {
          id: 4,
          client: 'Testezinho 4',
          seller: 'Teste Leilão 4',
          category: 'Outros',
          value: 450.5,
          reason: 'Fechado',
        },
      ],
    }
  },
  methods: {
    async showReason(id) {
      // this.$router.push(`/mercadoria/:${id}`);
      console.log('redirect', id)
      await SweetAlert.showSuccessModal()
      this.showReasonModal = true
    },
    async createAddress() {
      this.showModal = false
      await SweetAlert.showSuccessModal()
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
  box-shadow: 2px 5px 15px #ccc;
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
