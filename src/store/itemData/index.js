import * as firebase from 'firebase'

export default {
  state: {
    listItems: [
        { imageUrl: 'https://static.pexels.com/photos/5049/forest-trees-fog-foggy.jpg', id: 'example1', title: 'Example 1', description: 'Item 1' },
        { imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Brown_Tree_In_The_Forest-48694.JPG', id: 'example2', title: 'Example 2', description: 'Item 2' }
    ]
  },
  mutations: {
    setItemList (state, payload) {
      state.listItems = payload
    },
    editListItem (state, payload) {
      const editItem = state.listItems.find(item => {
        return item.id === payload.id
      })
      if (payload.title) {
        editItem.title = payload.title
      }
      if (payload.description) {
        editItem.description = payload.description
      }
    },
    createItem (state, payload) {
      state.listItems.push(payload)
    }
  },
  actions: {
    loadList ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('listItems').once('value')
      .then((data) => {
        const listItems = []
        const obj = data.val()
        for (let key in obj) {
          listItems.push({
            id: key,
            title: obj[key].title,
            description: obj[key].description,
            imageUrl: obj[key].imageUrl,
            creatorId: obj[key].creatorId
          })
        }
        commit('setItemList', listItems)
        commit('setLoading', false)
      })
      .catch((error) => {
        console.log(error)
        commit('setLoading', false)
      })
    },
    createItem ({commit, getters}, payload) {
      const newItem = {
        title: payload.title,
        description: payload.description,
        creatorId: getters.user.id
      }
      let imageUrl
      let key
      firebase.database().ref('listItems').push(newItem)
      .then((data) => {
        key = data.key
        return key
      })
      .then(key => {
        const filename = payload.image.name
        const ext = filename.slice(filename.lastIndexOf('.'))
        return firebase.storage().ref('items/' + key + ext).put(payload.image)
      })
      .then(imageData => {
        imageUrl = imageData.metadata.downloadURLs[0]
        return firebase.database().ref('listItems').child(key).update({imageUrl: imageUrl})
      })
      .then(() => {
        commit('createItem', {...newItem, imageUrl: imageUrl, id: key})
      })
      .catch((error) => {
        console.log(error)
      })
    },
    editListItem ({commit}, payload) {
      commit('setLoading', true)
      const editObj = {}
      if (payload.title) {
        editObj.title = payload.title
      }
      if (payload.description) {
        editObj.description = payload.description
      }
      firebase.database().ref('listItems').child(payload.id).update(editObj)
      .then(() => {
        commit('setLoading', false)
        commit('editListItem', payload)
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
      })
    }
  },
  getters: {
    listItems (state) {
      return state.listItems
    },
    carouselItems (getters) {
      return getters.listItems.slice(0, 7)
    },
    listItem (state) {
      return (itemId) => {
        return state.listItems.find((searchItem) => {
          return searchItem.id === itemId
        })
      }
    }
  }
}
