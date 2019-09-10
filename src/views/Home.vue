<template>
  <div>
    Ci sono {{betsCount}} scommessa
    <v-card class="mx-auto">
      <v-card-title>
        <div>Inserisci una nuova scommessa</div>
      </v-card-title>

      <v-card-actions>
        <div class="flex-grow-1"></div>

        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? 'mdi-minus' : 'mdi-plus' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-if="show">
          <v-stepper v-model="e6" vertical v-if="stepper">
            <v-stepper-step :complete="e6 > 1" step="1">
              Data
              <small>Inserisci la data dell'evento</small>
            </v-stepper-step>

            <v-stepper-content step="1">
              <v-row justify="center" class="mb-2">
                <v-date-picker v-model="picker" locale="it-IT" required></v-date-picker>
              </v-row>
              <v-row justify="center" class="mb-2">
                <!-- <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card> -->
                <v-btn color="success" @click="e6 = 2" class="mr-2">Continua</v-btn>
              </v-row>
            </v-stepper-content>

            <v-stepper-step :complete="e6 > 2" step="2">
              Squadre
              <small>Inserisci le squadre (casa/trasferta) e il pronostico</small>
            </v-stepper-step>

            <v-stepper-content step="2">
              <v-form>
                <v-row>
                  <v-col cols="6" sm="6" md="3">
                    <v-text-field label="Casa" v-model="home_team" required></v-text-field>
                  </v-col>
                  <v-col cols="6" sm="6" md="3">
                    <v-text-field label="Trasferta" v-model="away_team" required></v-text-field>
                  </v-col>
                  <v-col cols="6" sm="6" md="3">
                    <v-text-field label="Pronostico" v-model="pronostico_pre_gara" required></v-text-field>
                  </v-col>
                  <v-col cols="6" sm="6" md="3">
                    <v-text-field label="Quota" v-model="quota" type="number" required></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
              <v-row justify="center" class="mb-2">
                <v-btn color="success" @click="e6 = 3" class="mr-2">Continua</v-btn>
                <v-btn color="error" @click="e6 = 1" class="mr-2">Indietro</v-btn>
              </v-row>
            </v-stepper-content>

            <v-stepper-step :complete="e6 > 3" step="3">
              Pronostici di copertura
              <small>Inserisci i pronostici di copertura</small>
            </v-stepper-step>

            <v-stepper-content step="3">
              <v-form>
                <v-row>
                  <v-col cols="6" sm="6" md="3">
                    <v-text-field
                      label="Pronostico copertura 1"
                      v-model="copertura_1_pronostico"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" sm="6" md="3">
                    <v-text-field
                      label="Quota copertura 1"
                      v-model="copertura_1_quota"
                      type="number"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" sm="6" md="3">
                    <v-text-field
                      label="Pronostico copertura 2"
                      v-model="copertura_2_pronostico"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" sm="6" md="3">
                    <v-text-field
                      label="Quota copertura 2"
                      v-model="copertura_2_quota"
                      type="number"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
              <v-row justify="center" class="mb-2">
                <v-btn color="success" @click="e6 = 4" class="mr-2">Continua</v-btn>
                <v-btn color="error" @click="e6 = 2" class="mr-2">Indietro</v-btn>
              </v-row>
            </v-stepper-content>

            <v-stepper-step step="4">
              Investimento
              <small>Inserisci la cifra investita e salva la tua scommessa</small>
            </v-stepper-step>
            <v-stepper-content step="4">
              <v-col cols="6" sm="6" md="3">
                <v-text-field label="Investimento" v-model="importo" type="number" required></v-text-field>
              </v-col>
              <v-row justify="center" class="mb-2">
                <v-btn color="success" @click="aggiungiBet" class="mr-2">Salva</v-btn>
                <v-btn color="error" @click="e6 = 3" class="mr-2">Indietro</v-btn>
              </v-row>
            </v-stepper-content>
          </v-stepper>
        </div>
      </v-expand-transition>
    </v-card>
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar" :timeout="timeout">{{ text }}</v-snackbar>
    </div>
  </div>
</template>

<script>
import HelloWorld from "../components/HelloWorld";
import { mapGetters, mapState } from "vuex";
import store from "../store";
export default {
  components: {
    HelloWorld
  },
  computed: {
    bets() {
      return this.$store.state.bets;
    },
    betsCount() {
      return this.$store.getters.betsCount;
    },
    profitto() {
      return this.$store.getters.profitto;
    }
  },
  data() {
    return {
      e6: 0,
      picker: new Date().toISOString().substr(0, 10),
      home_team: null,
      away_team: null,
      pronostico_pre_gara: null,
      quota: null,
      copertura_1_pronostico: null,
      copertura_2_pronostico: null,
      copertura_1_quota: null,
      copertura_2_quota: null,
      importo: null,
      showQuoteModificate: false,
      snackbar: false,
      text: "Scommessa aggiunta",
      stepper: true,
      timeout: 2000,
      show: false
    };
  },
  methods: {
    aggiungiBet() {
      store.dispatch({
        type: "aggiungiBet",
        data: this.picker,
        home_team: this.home_team,
        away_team: this.away_team,
        pronostico_pre_gara: this.pronostico_pre_gara,
        quota: this.quota,
        importo: this.importo,
        vincita_netta: null,
        resa_netta: null,
        copertura_1: {
          pronostico: this.copertura_1_pronostico,
          quota: this.copertura_1_quota
        },
        copertura_2: {
          pronostico: this.copertura_2_pronostico,
          quota: this.copertura_2_quota
        },
        investimento: null
      });
      this.snackbar = !this.snackbar;
      this.show = !this.show;
      this.e6 = 0;
      this.picker = new Date().toISOString().substr(0, 10);
      this.home_team = null;
      this.away_team = null;
      this.pronostico_pre_gara = null;
      this.quota = null;
      this.copertura_1_pronostico = null;
      this.copertura_2_pronostico = null;
      this.copertura_1_quota = null;
      this.copertura_2_quota = null;
      this.importo = null;
    },

    calcolaGrandezze(bet) {
      store.dispatch({
        type: "calcolaGrandezze",
        id: bet.id
      });
    }
  }
  //   methods: {
  // ,

  //     setshowQuoteModificate() {
  //       return (this.showQuoteModificate = !this.showQuoteModificate);
  //     },

  //     modificaQuote(bet) {
  //       store.dispatch({
  //         type: "modificaQuote",
  //         id: bet.id,
  //         copertura_1_quota: this.copertura_1_quota,
  //         copertura_2_quota: this.copertura_2_quota
  //       });
  //       this.setshowQuoteModificate();
  //       this.calcolaGrandezze(bet);
  //     }
  //   }
};
</script>
