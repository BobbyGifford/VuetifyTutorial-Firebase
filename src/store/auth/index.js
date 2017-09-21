import * as firebase from 'firebase'

export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    signUpNew ({commit}, payload) {
      commit('setLoading', true)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          commit('clearError')
          const newUser = {
            id: user.uid,
            listItems: []
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          console.log(error)
          commit('setLoading', false)
          commit('setError', error)
        }
      )
    },
    userSignIn ({commit}, payload) {
      commit('setLoading', true)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          commit('clearError')
          const newUser = {
            id: user.uid,
            listItems: []
          }
          commit('setUser', newUser)
          location.reload()
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, listItems: []})
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
      location.reload()
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
}
