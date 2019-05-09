<template>
  <div class="page">
    <div class="title-new">
      <h1 class="page-title">Meu Histórico</h1>
    </div>
    <div class="tabs">
      <div class="tabs__button" @click="tab = 'AUCTIONED'">
        <div class="tabs__button__icon">
          <i class="fas fa-money-bill-wave"></i>
        </div>
        <p class="tabs__button__text">Arrematados</p>
      </div>
      <div class="tabs__button" @click="tab = 'CREATED'">
        <div class="tabs__button__icon">
          <i class="fas fa-gavel"></i>
        </div>
        <p class="tabs__button__text">Criados</p>
      </div>
    </div>
    <div class="table" v-if="tab === 'AUCTIONED'">
      <span class="table-complete-first-line">
        <div class="table-line">
          <div class="table-line-title" v-for="title in titlesAuctioned" :key="title">{{ title }}</div>
          <div class="table-line-title action">Ações</div>
        </div>
      </span>

      <div v-for="auction in auctioned" :key="auction.id">
        <div class="table-line" @click="clickAuction(auction.id)">
          <div class="item">{{ auction.title }}</div>
          <div class="item">R$ {{ auction.finalPrice | number }}</div>
          <div class="item">{{ auction.status }}</div>
          <div class="item">
            <div class="actions">
              <i class="icon sad far fa-frown"></i>
              <i class="icon edit fas fa-check"></i>
              <i class="icon trash far fa-trash-alt"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="table" v-if="tab === 'CREATED'">
      <span class="table-complete-first-line">
        <div class="table-line">
          <div class="table-line-title" v-for="title in titlesCreated" :key="title">{{ title }}</div>
          <div class="table-line-title action">Excluir</div>
        </div>
      </span>

      <div v-for="auction in created" :key="auction.id">
        <div class="table-line" @click="clickAuction(auction.id)">
          <div class="item">{{ auction.title }}</div>
          <div class="item">R$ {{ auction.finalPrice | number }}</div>
          <div class="item">{{ auction.status }}</div>
          <div class="item">
            <div class="actions">
              <i class="icon edit fas fa-check"></i>
            </div>
          </div>
          <div class="item">
            <div class="actions">
              <i class="icon trash far fa-trash-alt"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileAPI from '@/api/Profile'
import CategoryAPI from '@/api/Category'

export default {
  name: 'History',
  data() {
    return {
      profile: {},
      options: [],
      tab: 'AUCTIONED',
      titlesAuctioned: ['Nome', 'Valor de arremate', 'Status'],
      titlesCreated: [
        'Nome',
        'Valor de arremate',
        'Status',
        'Marcar como enviado',
      ],
      auctioned: [],
      created: [
        {
          title: 'Exemplo mocado',
          id: 1,
          closePrice: 250,
          status: 'Arrematado',
        },
      ],
    }
  },
  mounted() {
    this.loadInfo()
  },
  methods: {
    clickAuction(id) {
      // this.$router.push(`/mercadoria/:${id}`);
      console.log('redirect', id)
    },
    async loadInfo() {
      await this.getUserInfo()
      this.getHistory()
      this.getCategories()
    },
    async getUserInfo() {
      this.profile = JSON.parse(await localStorage.getItem('profile'))
    },
    async getHistory() {
      this.auctioned = await ProfileAPI.getHistory(this.profile.id)
    },
    async getCategories() {
      this.options = await CategoryAPI.getAll()
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.page {
  & .page-title {
    margin-left: 0;
  }
}
.table-line {
  grid-template-columns: 35% 20% 20% 12% 10%;
  .item:first-child {
    padding-left: 1rem;
  }
}

.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  &__button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
    height: 90px;
    width: 90px;
    border-radius: 14px;
    background-color: rgba(255, 185, 20, 0.7);
    box-shadow: 5px 5px 15px #ccc;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      transform: translateY(-10px);
    }

    &__icon {
      color: $text-color;
      font-size: 28px;
      margin-bottom: 10px;
    }

    &__text {
      color: $text-color;
      font-size: 14px;
    }
  }
}
</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
