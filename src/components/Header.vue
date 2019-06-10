<template>
  <div class="header">
    <div class="topbar">
      <router-link to="/" class="topbar-logo-holder">
        <img src="../assets/imgs/logo.jpg" class="topbar-logo" alt>
      </router-link>
      <div class="topbar-search">
        <input type="text" class="topbar-search-input" v-model="searchBarValue">
        <button class="topbar-search__button" @click="search">
          <i class="fas fa-search"></i>
        </button>
      </div>
      <div class="topbar__icon">
        <!-- <i class="far fa-bell"></i>
        <span class="topbar__icon__notify"></span>-->
      </div>
      <div class="topbar__icon" name="menu" @click="userMenu = !userMenu">
        <i class="fas fa-user-circle"></i>
      </div>
    </div>

    <!-- <div class="notify-menu" v-if="notifyMenu">
      <span class="notify-menu__holder-links">
        <router-link
          to="/"
          class="notify-menu__link"
          v-for="notify in notifies"
          :key="notify.id"
        >{{notify.auctionName}} - {{notify.message}}</router-link>
      </span>
    </div>-->

    <div class="user-menu" v-if="userMenu">
      <span class="user-menu__holder-links">
        <router-link
          v-if="login  && !admin"
          to="/dados"
          name="profile"
          class="user-menu__link"
        >Informações Pessoais</router-link>
        <!-- <router-link to="/conta-bancaria" class="user-menu__link">Conta Bancária</router-link> -->
        <router-link v-if="login && !admin" to="/historico" class="user-menu__link">Histórico</router-link>
        <router-link v-if="login  && !admin" to="/endereco" class="user-menu__link">Endereços</router-link>
        <!-- <router-link to="/cartao" class="user-menu__link">Cartões</router-link> -->
        <router-link v-if="login  && !admin" to="/carteira" class="user-menu__link">Carteira</router-link>
        <router-link
          v-if="login  && !admin"
          to="/novo-leilao"
          class="user-menu__link"
        >Cadastrar Leilão</router-link>
        <router-link v-if="admin" to="/autorizacao-leiloes" class="user-menu__link">ADMIN - Leilões</router-link>
        <router-link
          v-if="admin"
          to="/autorizacao-troca"
          class="user-menu__link"
        >ADMIN - Pedidos de Troca</router-link>
        <router-link
          v-if="admin"
          to="/devolucao-mercadoria"
          class="user-menu__link"
        >ADMIN - Devoluções</router-link>
        <router-link v-if="admin" to="/analise" class="user-menu__link">ADMIN - Gráficos</router-link>
        <!-- <router-link v-if="admin" to="/cadastrar-admin" class="user-menu__link">ADMIN - Cadastrar</router-link> -->
        <a href="#" v-if="login" class="user-menu__link" name="logout" @click="logout()">Sair</a>
        <router-link v-if="!login" to="/login" class="user-menu__link">Entrar</router-link>
        <router-link v-if="!login" to="/cadastrar" class="user-menu__link">Cadastrar</router-link>
      </span>
    </div>
  </div>
</template>

<script>
import AuctionAPI from '@/api/Auction'

import { EventBus } from '@/main'
export default {
  name: 'Header',
  data() {
    return {
      userMenu: false,
      login: false,
      admin: false,
      searchBarValue: '',
    }
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    logout() {
      localStorage.removeItem('user')
      localStorage.removeItem('profile')
      this.login = false
      this.admin = false
      this.$router.push('/login')
    },
    getInfo() {
      let user = JSON.parse(localStorage.getItem('user'))
      if (!user) {
        this.login = false
      } else {
        this.login = true
        if (user.flgAdmin) {
          this.admin = true
        }
      }
    },
    async search() {
      this.$root.$data.searchBarValue = this.searchBarValue
      EventBus.$emit('search', true)
      this.$router.push('/home')
    },
  },
  watch: {
    $route(to, from) {
      this.userMenu = false
      this.getInfo()
    },
  },
}
</script>

<style lang="scss" scoped>
.topbar-search__button {
  cursor: pointer;
}

@import '@/assets/styles/variables.scss';
.topbar {
  display: grid;
  position: fixed;
  z-index: 999;
  top: 0;
  grid-template-columns: 30% 40% 10% 10%;
  height: $topbar-height;
  width: 100%;
  background: #222;

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
      border-radius: 4px;
      height: 2rem;
      font-size: 1rem;
    }

    &__button {
      background: transparent;
      border: none;
      margin-left: -2rem;
      outline: 0;
      font-size: 1.2rem;
      color: $text-color;
    }
  }
  &__icon {
    display: flex;
    justify-content: flex-end;
    align-self: center;
    color: white;
    font-size: 1.8rem;
    cursor: pointer;

    &__notify {
      height: 12px;
      width: 12px;
      background-color: #ffb914;
      border-radius: 50%;
      position: relative;
      right: 25px;
    }
  }
}

.user-menu {
  background-color: transparent;
  top: $topbar-height;
  right: 4%;
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
    padding: 12px 0;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #ccc;

    &:hover {
      font-size: 1.1rem;
      color: #454545;
    }
  }
}

.notify-menu {
  background-color: transparent;
  top: $topbar-height;
  right: 0;
  position: fixed;
  z-index: 999;
  box-shadow: 2px 5px 10px #888;

  &__holder-links {
    background-color: white;
    width: 23rem;
    display: flex;
    align-self: flex-end;
    align-items: center;
    flex-direction: column;
    padding: 0 1rem;
  }

  &__link {
    text-decoration: none;
    color: #222;
    font-size: 1rem;
    width: 100%;
    text-align: left;
    border-bottom: 1px solid #ccc;
    padding: 1rem;

    &:hover {
      font-size: 1.05rem;
      color: #454545;
    }
  }
}
</style>
