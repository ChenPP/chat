import Vue from 'vue';
import moment from 'moment';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

moment.locale('zh-tw'); // 配置中文
Vue.config.productionTip = false;
Vue.prototype.$moment = moment;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
