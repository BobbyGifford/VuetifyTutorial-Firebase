import Vue from 'vue'
import Vuetify from 'vuetify'
import './stylus/main.styl'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import Alert from './components/Shared/Alert.vue'
import Edit from './components/PortList/Edit/EditItem.vue'

Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.component('app-alert', Alert)
Vue.component('app-edit', Edit)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadList')
  }
})
