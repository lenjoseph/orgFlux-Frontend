import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import {
  apolloProvider
} from './graphql/apollo'

Vue.use(BootstrapVue);
Vue.config.productionTip = false;

new Vue({
  apolloProvider,
  router,
  store,
  render: h => h(App)
}).$mount('#app')