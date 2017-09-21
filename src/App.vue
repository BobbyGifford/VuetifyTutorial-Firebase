<template>
  <v-app dark>
    
    <v-navigation-drawer
      persistent
      v-model="drawer"
      dark
      enable-resize-watcher
      temporary
    >
      <v-list dense>
        <v-list-tile 
        v-for="item in navItems" :key="item.title"
        router 
        :to="item.link"
        >
          <v-list-tile-action>
            <v-icon> {{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="logout" v-if="authCheck">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Log Out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>

    <v-toolbar>
      <v-toolbar-side-icon 
      @click.stop="drawer = !drawer"
      class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">App Title</router-link>
        </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn fluid v-for="item in navItems" :key="item.title"
        router 
        :to="item.link">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
          </v-btn>
          <v-btn @click="logout" flat v-if="authCheck">
            <v-icon left datk>exit_to_app</v-icon>
            Logout
          </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        drawer: false
      }
    },
    computed: {
      navItems () {
        let navItems = [
          // { icon: 'motorcycle', title: 'Home', link: '/' },
          { icon: 'work', title: 'SignIn', link: '/signIn' },
          { icon: 'motorcycle', title: 'SignUp', link: '/signUp' }
        ]
        if (this.authCheck) {
          navItems = [
          // { icon: 'grade', title: 'Add', link: '/addItem' },
          // { icon: 'stars', title: 'Vue', link: '/vue' },
          { icon: 'list', title: 'List', link: '/fullList' }
          ]
        }
        return navItems
      },
      authCheck () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    },
    methods: {
      logout () {
        this.$store.dispatch('logout')
      }
    }
  }
</script>
