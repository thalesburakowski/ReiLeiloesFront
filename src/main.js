import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VeeValidate from 'vee-validate';
import VueMask from 'v-mask'
import Vue2Filters from 'vue2-filters'
import money from 'v-money'

Vue.use(money, {precision: 2});
Vue.use(Vue2Filters);

Vue.use(VeeValidate);
Vue.use(VueMask);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
