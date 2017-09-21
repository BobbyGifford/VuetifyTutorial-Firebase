<template>
<v-container>
    <v-form @submit.prevent="signIn">
    <v-layout>
        <v-flex xs12 sm6 offset-sm-3>
            <h4>Sign In</h4>
        </v-flex>
    </v-layout>
    <v-layout row>
        <v-flex xs12>
            <v-text-field
            name="email"
            label="Enter email"
            id="email"
            v-model="email"
            type="email"
            required></v-text-field>
        </v-flex>
    </v-layout>
    <v-layout row>
        <v-flex xs12>
            <v-text-field
            name="password"
            label="Create new password"
            id="password"
            v-model="password"
            type="password"
            required></v-text-field>
        </v-flex>
    </v-layout>
    <v-layout row>
        <v-flex xs>
            <v-btn type="submit">Sign In</v-btn>
        </v-flex>
    </v-layout>
    </v-form>
</v-container>
</template>

<script>
    export default {
      data () {
        return {
          email: '',
          password: '',
          verifyBool: false
        }
      },
      computed: {
        user () {
          return this.$store.getters.user
        }
      },
      watch: {
        user (value) {
          if (value !== null && value !== undefined) {
            this.$router.push('/')
          }
        }
      },
      methods: {
        signIn () {
          this.$store.dispatch('userSignIn', {email: this.email, password: this.password})
          this.$store.dispatch('loadList')
        }
      }
}
</script>