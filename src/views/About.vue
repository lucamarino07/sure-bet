<template>
  <div>
    <v-container class="pa-2" fluid>
      <v-col v-for="(item, i) in bets" :key="i">
        <v-card color="#952175" dark>
          <v-list-item three-line>
            <v-list-item-content class="align-self-start">
              <v-list-item-title
                class="headline mb-2"
                v-text="item.home_team + ' - ' + item.away_team"
              ></v-list-item-title>

              <v-list-item-subtitle v-text="item.data"></v-list-item-subtitle>
              <v-list-item-subtitle>Pronostico: {{item.pronostico_pre_gara}}</v-list-item-subtitle>
              <v-list-item-subtitle>Quota: {{item.quota}}</v-list-item-subtitle>
              <v-list-item-subtitle>Profitto atteso: {{item.vincita_netta}} €</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    bets() {
      return this.$store.state.bets;
    }
  }
};
</script>

<style>
</style>
