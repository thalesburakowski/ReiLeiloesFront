<template>
import { watch } from 'fs';
  <div>
    <div class="topbar">      
      <router-link to="/" class="topbar-title">
        Rei leilões
      </router-link>      
      <div class="topbar-search">
        <input type="text" class="topbar-search-input">
        <button class="topbar-search__button">
          <i class="fas fa-search"></i>
        </button>
      </div>
      <div class="topbar__icon"  @click="userMenu= !userMenu"><i class="fas fa-user-circle"></i></div>
    </div>
    
    <div class="user-menu" v-if="userMenu">
      <span class="user-menu__holder-links">
        <router-link to="/dados" class="user-menu__link" @click="userMenu= !userMenu">
        Meus Dados
      </router-link>
      <router-link to="/cartao" class="user-menu__link">
        Meus Cartões
      </router-link>
      <router-link to="/endereco" class="user-menu__link">
        Meus  Endereços
      </router-link>
      <router-link to="/conta-bancaria" class="user-menu__link">
        Minha Conta Bancária
      </router-link>
      <router-link to="/historico" class="user-menu__link">
        Meu histórico
      </router-link>
      <router-link to="/logout" class="user-menu__link">
        Sair
      </router-link>
      </span>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
 data() {
    return {
    userMenu: false,
    }
  },
  // watch: {
  //   '$route' (to, from) {
  //     this.userMenu = false;
  //   }
  // }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
.topbar {
  display: grid;
  position: fixed;
  top: 0;
  grid-template-columns: 20% 60% 20%;
  height: $topbar-height;
  width: 100%;
  background: rgb(65, 30, 90);
  background: linear-gradient(
    250deg,
    rgba(65, 30, 90, 1) 0%,
    rgba(40, 10, 60, 1) 100%
  );
  &-title {
    margin-left: 2vw;
    padding-left: 1em;
    font-size: 1.5rem;
    font-family: "Roboto-Regular";
    align-self: center;
    text-transform: uppercase;
    color: white;
    text-decoration: none;
  }
  &-search {
    display: flex;
    justify-content: center;
    align-items: center;
    .topbar-search-input {
      padding-left: .5rem;
      width: 95%;
      background-color: white;
      border-radius: 8px;
    }

    &__button{
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

.user-menu{
  background-color: transparent;
  top: $topbar-height;
  right: 4rem;
  position: absolute;
  z-index: 999;

  &__holder-links{
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
