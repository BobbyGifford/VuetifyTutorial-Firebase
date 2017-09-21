<template>
  <v-alert error dismissible @input="close" :value="true">{{ text }}</v-alert>
</template>

<script>
    export default {
      props: ['text'],
      methods: {
        close () {
          this.$emit('dismissed')
        }
      }
    }
</script>