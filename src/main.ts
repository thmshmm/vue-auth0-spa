import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Auth0Plugin } from './auth'

// Import the Auth0 configuration
import { domain, clientId } from '../auth_config.json'
import { RawLocation } from 'vue-router'

Vue.config.productionTip = false

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: (appState: { targetUrl: RawLocation }) => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    )
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
