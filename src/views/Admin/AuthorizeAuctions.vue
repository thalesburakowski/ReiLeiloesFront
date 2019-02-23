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
        <div class="table-line" @click="clickAuction(auction.id)">
          <div class="item">{{ auction.authorName }}</div>
          <div class="item">{{ auction.name }}</div>
          <div class="item">{{ auction.category }}</div>
          <div class="item">R$ {{ auction.start | number }}</div>
          <div class="item">R$ {{ auction.finish | number }}</div>
          <div class="item">
            <div class="actions">
              <!-- <i class="icon edit fas fa-marker"></i> -->
              <i class="icon check fas fa-check"></i>
              <i class="icon trash fas fa-times"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthorizeAuctions',
  data() {
    return {
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
        {
          id: 2,
          authorName: 'Testezinho 2',
          name: 'Teste Leilão 2',
          category: 'Colecionaveis',
          start: 423.5,
          finish: 450.5,
          status: 'Aberto',
        },
        {
          id: 3,
          authorName: 'Testezinho 3',
          name: 'Teste Leilão 3',
          category: 'Brinquedos',
          start: 534.5,
          finish: 450.5,
          status: 'Fechado',
        },
        {
          id: 4,
          authorName: 'Testezinho 4',
          name: 'Teste Leilão 4',
          category: 'Outros',
          start: 123.5,
          finish: 450.5,
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
  grid-template-columns: 15% 35% 20% 10% 10% 10%;
  .item:first-child {
    padding-left: 1rem;
  }
}
</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
