<template>
  <div class="header">
    <div class="topbar">
      <router-link to="/" class="topbar-logo-holder">
        <img src="../assets/imgs/logo.jpg" class="topbar-logo" alt>
      </router-link>
      <div class="topbar-search">
        <input type="text" class="topbar-search-input">
        <button class="topbar-search__button">
          <i class="fas fa-search"></i>
        </button>
      </div>
      <div class="topbar__icon" @click="userMenu= !userMenu">
        <i class="fas fa-user-circle"></i>
      </div>
    </div>

    <div class="user-menu" v-if="userMenu">
      <span class="user-menu__holder-links">
        <router-link to="/dados" class="user-menu__link">Meus Dados</router-link>
        <router-link to="/cartao" class="user-menu__link">Meus Cartões</router-link>
        <router-link to="/endereco" class="user-menu__link">Meus Endereços</router-link>
        <router-link to="/conta-bancaria" class="user-menu__link">Minha Conta Bancária</router-link>
        <router-link to="/historico" class="user-menu__link">Meu histórico</router-link>
        <a href="#" class="user-menu__link" @click="logout()">Sair</a>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      userMenu: false,
    }
  },
  methods: {
    logout() {
      this.$router.push('/login')
    },
  },
  watch: {
    $route(to, from) {
      this.userMenu = false
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
.topbar {
  display: grid;
  position: fixed;
  z-index: 999;
  top: 0;
  grid-template-columns: 30% 40% 30%;
  height: $topbar-height;
  width: 100%;
  background: #222;
  // background: linear-gradient(
  //   250deg,
  //   rgba(65, 30, 90, 1) 0%,
  //   rgba(40, 10, 60, 1) 100%
  // );
  // &-title {
  //   margin-left: 2vw;
  //   padding-left: 1em;
  //   font-size: 1.5rem;
  //   font-family: 'Roboto-Regular';
  //   align-self: center;
  //   text-transform: uppercase;
  //   color: white;
  //   text-decoration: none;
  // }
  &-logo-holder {
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  &-logo {
    height: 12rem;
  }

  &-search {
    display: flex;
    justify-content: center;
    align-items: center;

    .topbar-search-input {
      padding-left: 0.5rem;
      width: 95%;
      background-color: white;
      border-radius: 8px;
      height: 2rem;
    }

    &__button {
      background: transparent;
      border: none;
      margin-left: -2rem;
      outline: 0;
    }
  }
  &__icon {
    display: flex;
    justify-content: flex-end;
    margin-right: 9rem;
    align-self: center;
    color: white;
    font-size: 2rem;
  }
}

.user-menu {
  background-color: transparent;
  top: $topbar-height;
  right: 4rem;
  position: fixed;
  z-index: 999;
  box-shadow: 2px 5px 10px #888;

  &__holder-links {
    background-color: white;
    width: 12rem;
    display: flex;
    align-self: flex-end;
    align-items: center;
    flex-direction: column;
  }

  &__link {
    text-decoration: none;
    color: #222;
    font-size: 1rem;
    margin: 5px;
  }
}
</style>
