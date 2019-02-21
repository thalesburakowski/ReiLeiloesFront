import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import User from "./views/User.vue";
import Address from "./views/Address.vue";
import Auction from "./views/Auction.vue";
import BankAccount from "./views/BankAccount.vue";
import CreditCard from "./views/CreditCard.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import History from "./views/History.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Inicio",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/dados",
      name: "user",
      component: User
    },
    {
      path: "/endereco",
      name: "address",
      component: Address
    },
    {
      path: "/leilao",
      name: "auction",
      component: Auction
    },
    {
      path: "/conta-bancaria",
      name: "bankAccount",
      component: BankAccount
    },
    {
      path: "/cartao",
      name: "creditCard",
      component: CreditCard
    },
    {
      path: "/historico",
      name: "history",
      component: History
    },

  ]
});
