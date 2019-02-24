import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Client/Home.vue'
import User from './views/Client/User.vue'
import Address from './views/Client/Address.vue'
import Auction from './views/Client/Auction.vue'
import BankAccount from './views/Client/BankAccount.vue'
import CreditCard from './views/Client/CreditCard.vue'
import Login from './views/Login.vue'
import Register from './views/Client/Register.vue'
import AdminRegister from './views/Admin/Register.vue'
import History from './views/Client/History.vue'
import Wallet from './views/Client/Wallet.vue'
import AuthorizeAuctions from './views/Admin/AuthorizeAuctions.vue'
import AuthorizeReturn from './views/Admin/AuthorizeReturn.vue'
import Analyzis from './views/Admin/Analyzis.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Inicio',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/cadastrar',
      name: 'register',
      component: Register,
    },
    {
      path: '/cadastrar-admin',
      name: 'registerAdmin',
      component: AdminRegister,
    },
    {
      path: '/dados',
      name: 'user',
      component: User,
    },
    {
      path: '/endereco',
      name: 'address',
      component: Address,
    },
    {
      path: '/leilao',
      name: 'auction',
      component: Auction,
    },
    {
      path: '/conta-bancaria',
      name: 'bankAccount',
      component: BankAccount,
    },
    {
      path: '/cartao',
      name: 'creditCard',
      component: CreditCard,
    },
    {
      path: '/historico',
      name: 'history',
      component: History,
    },
    {
      path: '/autorizacao-leiloes',
      name: 'AuthorizeAuctions',
      component: AuthorizeAuctions,
    },
    {
      path: '/autorizacao-troca',
      name: 'AuthorizeAuctions',
      component: AuthorizeReturn,
    }, 
    {
      path: '/carteira',
      name: 'Wallet',
      component: Wallet,
    },
    {
      path: '/analise',
      name: 'Analyzis',
      component: Analyzis,
    },
  ],
})
