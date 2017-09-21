<template>
  <v-container>
      <v-layout row class="mt-4">
          <v-flex xs12 sm6 offset-sm3>
              <h4>Create new Item</h4>
          </v-flex>
      </v-layout>
      </layout>
      <v-layout>
          <v-flex sm12>
              <form @submit.prevent="createNewItem">
                  <v-layout row>
                      <v-flex xs12 sm6 offset-sm3>
                          <v-text-field
                          name="title"
                          label="Title"
                          id="title"
                          v-model="title"
                          required>
                          </v-text-field>
                      </v-flex>
                  </v-layout>
                  <v-layout row>
                      <v-flex xs12 sm6 offset-sm3>
                          <h6>Upload Image</h6>
                      </v-flex>
                  </v-layout>
                  <v-layout row>
                      <v-flex xs12 sm6 offset-sm3>
                          <input type="file" accept="image/*" @change="fileChosen">
                      </v-flex>
                  </v-layout>
                  <v-layout row class="mt-3">
                      <v-flex xs12 sm6 offset-sm3>
                          <img :src="image" height="150">
                      </v-flex>
                  </v-layout>
                  <v-layout row>
                      <v-flex xs12 sm6 offset-sm3>
                          <v-text-field
                          name="desc"
                          label="Description"
                          id="desc"
                          v-model="description"
                          multi-line
                          required>
                          </v-text-field>
                      </v-flex>
                  </v-layout>
                  <v-layout row>
                      <v-flex xs12 sm6 offset-sm3>
                          <v-btn class="success" :disabled="!formIsValid" type="submit">Create Item</v-btn>
                          </v-flex>
                  </v-layout>
              </form>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
    export default {
      data () {
        return {
          title: '',
          image: '',
          description: '',
          imageData: null
        }
      },
      computed: {
        formIsValid () {
          return this.title !== '' &&
          this.imageUrl !== '' &&
          this.description !== ''
        }
      },
      methods: {
        createNewItem () {
          if (!this.formIsValid) {
            return
          }
          if (!this.imageData) {
            return
          }
          const newItem = {
            title: this.title,
            description: this.description,
            image: this.imageData
          }
          this.$store.dispatch('createItem', newItem)
          this.$router.push('/fullList')
        },
        fileChosen (event) {
          const files = event.target.files
          let fileName = files[0].name
          if (fileName.lastIndexOf('.') <= 0) {
            return alert('Not valid file.')
          }
          const fileReader = new FileReader()
          fileReader.addEventListener('load', () => {
            this.image = fileReader.result
          })
          fileReader.readAsDataURL(files[0])
          this.imageData = files[0]
        }
      }
}
</script>
