import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import itemData from './itemData'
import loadingError from './loading-error'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    listItems: auth,
    itemData: itemData,
    loadingError: loadingError
  }
})
