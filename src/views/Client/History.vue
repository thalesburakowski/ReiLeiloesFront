<template>
  <div class="page">
    <div class="title-new">
      <h1 class="page-title">Seus Leilões</h1>
    </div>
    <div class="table">
      <div class="table-line">
        <div class="table-line-title" v-for="title in titles" :key="title">{{ title }}</div>
        <div class="table-line-title action">Excluir</div>
      </div>
      <div v-for="auction in auctions" :key="auction.id">
        <div class="table-line" @click="clickAuction(auction.id)">
          <div class="item">{{ auction.name }}</div>
          <div class="item">{{ auction.category }}</div>
          <div class="item">R$ {{ auction.value | number }}</div>
          <div class="item">{{ auction.status }}</div>
          <div class="item">
            <div class="actions">
              <!-- <i class="icon fas fa-qrcode"></i> -->
              <!-- <i class="icon edit fas fa-marker"></i> -->
              <i class="icon trash far fa-trash-alt"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'History',
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
      titles: ['Nome', 'Categoria', 'Valor Atual', 'Status'],
      auctions: [
        {
          id: 1,
          name: 'Teste Leilão 1',
          category: 'Obras de Arte',
          value: 123.5,
          status: 'Aberto',
        },
        {
          id: 2,
          name: 'Teste Leilão 2',
          category: 'Colecionaveis',
          value: 423.5,
          status: 'Aberto',
        },
        {
          id: 3,
          name: 'Teste Leilão 3',
          category: 'Brinquedos',
          value: 534.5,
          status: 'Fechado',
        },
        {
          id: 4,
          name: 'Teste Leilão 4',
          category: 'Outros',
          value: 123.5,
          status: 'Fechado',
        },
      ],
    }
  },
  methods: {
    clickAuction(id) {
      // this.$router.push(`/mercadoria/:${id}`);
      console.log('redirect', id)
    },
  },
}
</script>
<style lang="scss">
.page {
  & .page-title {
    margin-left: 0;
  }
}
.table-line {
  grid-template-columns: 35% 25% 20% 10% 10% 10%;
  .item:first-child {
    padding-left: 1rem;
  }
}
</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
