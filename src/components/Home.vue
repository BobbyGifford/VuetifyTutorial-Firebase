<template>
<v-container>
    <!-- <v-layout row wrap class="mb-2">
        <v-flex xs12 sm6 class="text-xs-center text-sm-left">
            <v-btn large router to="/about" class="info">About</v-btn>
        </v-flex>
            <v-flex xs12 sm6 class="text-xs-center text-sm-right">
            <v-btn large router to="/vue" class="info">Vue</v-btn>
        </v-flex>
    </v-layout> -->
    <v-layout>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="primary--text"
          :width="7"
          :size="70"
          v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap mt-2 v-if="!loading">
        <v-flex xs12>
            <v-carousel>
    <v-carousel-item
    style="cursor: pointer"
    v-for="display in displays" 
    v-bind:src="display.imageUrl" 
    :key="display.id"
    @click="toItem(display.id)">
    <div class="title">
        {{ display.title }}
    </div>
    </v-carousel-item>
  </v-carousel>
        </v-flex>
    </v-layout>
    <v-layout class="mt-2">
        <v-flex xs12 class="text-xs-center">
            <p>This is a carousel.</p>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
    export default {
  computed: {
        displays () {
          return this.$store.getters.listItems
        },
        loading () {
          return this.$store.getters.loading
        }
  },
  methods: {
        toItem (id) {
          this.$router.push('/listItem/' + id)
        }
  }
}
</script>

<style scoped>
    .title {
        position: absolute;
        bottom: 50px;
        background-color: rgba(0,0,0,0.5);
        color: white;
        font-size: 2em;
        padding: 20px;
    }
</style>
