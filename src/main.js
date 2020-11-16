import Vue from 'vue'
import App from './App.vue'

import '@/static/main.css'
import '@/static/markdown.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
