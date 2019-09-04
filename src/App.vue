<template>
  <v-app id="inspire">
    
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item @click="setTitleToHome" :to="{path : '/'}">
          <v-list-item-action >
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="setTitleToScommesse" :to="{path : '/about'}">
          <v-list-item-action>
            <v-icon>mdi-matrix</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Le Mie Scommesse</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="setTitleToImpostazioni" :to="{path : '/help'}">
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Impostazioni</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{title}}</v-toolbar-title>
    </v-app-bar>

    <v-content>
      
      <v-container fluid>
        <router-view></router-view>
        <!-- <Home></Home> -->
      </v-container>
      
    </v-content>

    <v-footer app>
      <span>Calcolatore Sure Bet &copy; Luca Marino 2019 {{drawer}}</span>
    </v-footer>
    
  </v-app>
</template>

<script>
import Home from './views/Home.vue'
export default {
  props: {
    source: String
  },
  components: {
    Home
  },
  data: () => ({
    drawer: false,
    title: "Home"
  }),
  methods: {
    setTitleToHome() {
      this.drawer = !this.drawer;
      return (this.title = "Home");
    },
    setTitleToScommesse() {
      this.drawer = !this.drawer;
      return (this.title = "Le Mie Scommesse");
    },
    setTitleToImpostazioni() {
      this.drawer = !this.drawer;
      return (this.title = "Impostazioni");
    }
  },
  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>