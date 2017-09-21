<template>
  <v-dialog width="350px" persistent v-model="toggleDialog">
      <v-btn slot="activator">
          <v-icon>edit</v-icon>
      </v-btn>
      <v-card>
          <v-container>
              <v-layout>
                  <v-flex xs12>
                      <v-card-title>Edit this item</v-card-title>
                  </v-flex>
              </v-layout>
              <v-divider></v-divider>
              <v-layout>
                  <v-flex xs12>
                      <v-card-text>
                          <v-text-field
                          name="title"
                          label="Title"
                          id="title"
                          v-model="newTitle"
                          required>
                          </v-text-field>
                          <v-text-field
                          name="desc"
                          label="Description"
                          id="desc"
                          multi-line
                          v-model="newDesc"
                          required>
                          </v-text-field>
                      </v-card-text>
                  </v-flex>
              </v-layout>
              <v-divider></v-divider>
              <v-layout row>
                  <v-flex xs12>
                      <v-card-actions>
                          <v-btn class="info" @click="save">Save</v-btn>
                          <v-btn class="info" @click="toggleDialog = false">Close</v-btn>
                      </v-card-actions>
                  </v-flex>
              </v-layout>
          </v-container>
      </v-card>
  </v-dialog>
</template>

<script>
    export default {
      props: ['listItem'],
      data () {
        return {
          toggleDialog: false,
          newTitle: this.listItem.title,
          newDesc: this.listItem.description
        }
      },
      methods: {
        save () {
          if (this.newTitle.trim() === '' || this.newDesc.trim() === '') {
            return
          }
          this.toggleDialog = false
          this.$store.dispatch('editListItem', {
            id: this.listItem.id,
            title: this.newTitle,
            description: this.newDesc})
        }
      }
    }
</script>