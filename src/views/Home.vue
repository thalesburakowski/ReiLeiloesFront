<template>
  <div class="page">
    <div class="title-new">
      <h1 class="page-title">Leilões</h1>
    </div>
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
    <div class="table">
      <div class="table-line">
        <div class="table-line-title" v-for="title in titles" :key="title">{{ title }}</div>
      </div>
      <div v-for="auction in auctions" :key="auction">
        <div class="table-line">
          <div class="item">{{ auction.name }}</div>
          <div class="item">{{ auction.category }}</div>
          <div class="item">{{ auction.starts }}</div>
          <div class="item">{{ auction.ends }}</div>
          <div class="item">{{ auction.value }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Multiselect from 'vue-multiselect'

export default {
  name: 'home',
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
      titles: ['Nome', 'Categoria', 'Início', 'Tempo Restante', 'Valor Atual'],
      auctions: [
        {
          name: 'Teste Leilão',
          category: 'Outros',
          starts: '20/20/2019',
          ends: '17 horas',
          value: 233.5,
        },
      ],
    }
  },
}
</script>

<style lang="scss">
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

.table-line {
  grid-template-columns: 25% 25% 20% 20% 10%;
  .item:nth-child(4) {
    padding-right: 2rem;
  }
}
</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
