<template>
  <div class="page">
    <h1 class="page-title">Meus dados</h1>
    <div class="fields">
      <div class="line-inputs">
        <label class="label-input">
          <input type="text" v-model="model.name" maxlength="80" required>
          <div class="label-text">Nome</div>
        </label>
        <label class="label-input">
          <input type="text" v-model="model.lastName" required>
          <div class="label-text">Sobrenome</div>
        </label>
        <label class="label-input">
          <input type="text" v-model="model.email" maxlength="80" required>
          <div class="label-text">Email</div>
        </label>
      </div>
      <div class="line-inputs">
        <label class="label-input">
          <input type="text" v-model="model.cpf" maxlength="80" required>
          <div class="label-text">CPF</div>
        </label>
        <label class="label-input">
          <input type="text" v-model="model.rg" maxlength="80" required>
          <div class="label-text">RG</div>
        </label>
        <label class="label-input">
          <input type="text" v-model="model.birthDate" v-mask="'##/##/####'" required>
          <div class="label-text">Data Nascimento</div>
        </label>
      </div>
      <div class="line-inputs">
        <label class="label-input">
          <input type="text" v-model="model.username" required>
          <div class="label-text">Nome de Usuário</div>
        </label>
      </div>
      <div class="save">
        <button class="button button-principal" @click="register">Cadastrar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'User',
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
}
</script>
<style lang="scss" scoped>
.page {
  .fields {
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
}
</style>
