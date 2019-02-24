<template>
  <div class="page">
    <h1 class="page-title">Sua Carteira</h1>

    <span class="page__info">Você possui R$ 150,00 de Créditos</span>
    <span class="main-grid">
      <div class="fields">
        <div class="save">
          <button class="button button-principal" @click="register">Transferir Créditos</button>
        </div>
      </div>

      <div class="fields">
        <!-- <div class="line-inputs">
        <label class="label-input">
          <input type="text" v-model="model.name" maxlength="80" required>
          <div class="label-text">Nome</div>
        </label>
        </div>-->
        <div class="save">
          <button class="button button-principal" @click="register">Inserir Créditos</button>
        </div>
      </div>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Wallet',
  data() {
    return {
      model: {
        name: '',
        lastName: '',
        email: '',
        cpf: '',
        rg: '',
        bithDate: '',
        username: '',
      },
    }
  },
  methods: {
    register() {},
  },
}
</script>
<style lang="scss" scoped>
.page {
  text-align: left;

  .fields {
    box-shadow: 2px 5px 15px #ccc;
    .line-inputs {
      grid-template-columns: repeat(3, 28%);
      grid-column-gap: 70px;
      grid-row-gap: 2rem;
    }
    .save {
      justify-content: flex-end;
      // margin-right: 2rem;
    }
  }

  &__info {
    font-size: 1.5rem;
  }
}

.main-grid {
  display: grid;
  grid-template-columns: repeat(2, 47%);
  grid-column-gap: 70px;
  grid-row-gap: 2rem;
  margin-top: 2rem;
}
</style>
