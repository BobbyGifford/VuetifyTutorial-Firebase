<template>
<v-container>
    <v-layout row v-if="error">
        <v-flex xs12 sm6 offset-sm-3>
            <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
        </v-flex>
    </v-layout>
    <v-form @submit.prevent="signUp">
    <v-layout>
        <v-flex xs12 sm6 offset-sm-3>
            <h4>Create Account</h4>
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
    <v-layout row v-if="this.password.length > 0">
        <v-flex xs12>
            <v-text-field
            name="confirm"
            label="Confirm password"
            id="confirm"
            v-model="confirm"
            type="password"
            :rules="[verifyLength]"
            required></v-text-field>
        </v-flex>
    </v-layout>
    <v-layout row>
        <v-flex xs>
            <v-btn type="submit" :disabled="loading" :loading="loading">Sign Up
                <span slot="loader" class="custom-loader">
                    <v-icon light>cached</v-icon>
                </span>
            </v-btn>
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
          confirm: '',
          verifyBool: false
        }
      },
      computed: {
        verifyLength () {
          return this.password !== this.confirm ? 'Passwords do not match' : true
        },
        user () {
          return this.$store.getters.user
        },
        error () {
          return this.$store.getters.error
        },
        loading () {
          return this.$store.getters.loading
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
        signUp () {
          this.$store.dispatch('signUpNew', {email: this.email, password: this.password})
        },
        onDismissed () {
          console.log('works')
          this.$store.dispatch('clearError')
        }
      }
}
</script>