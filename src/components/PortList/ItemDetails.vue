<template>
<v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="primary--text"
          :width="7"
          :size="70"
          v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
        <v-flex xs12>
            <v-card>
                <v-card-title>
                <h5>{{ listItem.title }}</h5>
                </v-card-title>
                <v-card-media 
                :src="listItem.imageUrl" 
                height="300px">
                </v-card-media>
                <v-card-text>
                    <div>Description</div>
                    <div>{{ listItem.description }}</div>
                </v-card-text>
                <v-card-actions>
                <template v-if="isCreator">
                    <app-edit :listItem="listItem"></app-edit>
                </template>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      listItem () {
        return this.$store.getters.listItem(this.id)
      },
      isAuth () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      isCreator () {
        if (!this.isAuth) {
          return false
        }
        return this.$store.getters.user.id === this.listItem.creatorId
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>