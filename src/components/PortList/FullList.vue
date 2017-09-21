<template>
  <v-container>
      <v-layout>
          <v-flex xs12 md10 offset-md1>
              <v-card v-for="(item, index) in listItems" :key="item.id" class="mb-2">
                  <v-container fluid>
                      <v-layout row>
                          <v-flex xs5 md3>
                              <v-card-media 
                              :src="item.imageUrl"
                              height="125px"
                              ></v-card-media>
                          </v-flex>
                          <v-flex xs7 md9>
                              <v-card-title primary-title>
                                  <div>
                                      <h5 class="mb-0">{{ item.title }} </h5>
                                      <div>{{ item.description }}</div>
                                  </div>
                              </v-card-title>
                              <v-card-actions>
                                  <v-btn class="success ml-2" :to="'/listItem/' + item.id">
                                      View Item
                                  </v-btn>
                              </v-card-actions>
                          </v-flex>
                      </v-layout>
                  </v-container>
              </v-card>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
    export default {
  computed: {
        listItems () {
          return this.$store.getters.listItems
        }
      }
    }
</script>
