<template>
  <div>
    Ci sono {{betsCount}} scommessa {{casa}}
    <v-stepper v-model="e6" vertical>
      <v-stepper-step :complete="e6 > 1" step="1">
        Data
        <small>Inserisci la data dell'evento</small>
      </v-stepper-step>

      <v-stepper-content step="1">
        <v-row justify="center" class="mb-2">
          <v-date-picker v-model="picker" locale="it-IT"></v-date-picker>
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
              <v-text-field label="Casa" v-model="home_team"></v-text-field>
            </v-col>
            <v-col cols="6" sm="6" md="3">
              <v-text-field label="Trasferta" v-model="away_team"></v-text-field>
            </v-col>
            <v-col cols="6" sm="6" md="3">
              <v-text-field label="Pronostico" v-model="pronostico_pre_gara"></v-text-field>
            </v-col>
            <v-col cols="6" sm="6" md="3">
              <v-text-field label="Quota" v-model="quota" type="number"></v-text-field>
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
              <v-text-field label="Pronostico copertura 1" v-model="copertura_1_pronostico"></v-text-field>
            </v-col>
            <v-col cols="6" sm="6" md="3">
              <v-text-field label="Quota copertura 1" v-model="copertura_1_quota" type="number"></v-text-field>
            </v-col>
            <v-col cols="6" sm="6" md="3">
              <v-text-field label="Pronostico copertura 2" v-model="copertura_2_pronostico"></v-text-field>
            </v-col>
            <v-col cols="6" sm="6" md="3">
              <v-text-field label="Quota copertura 2" v-model="copertura_2_quota" type="number"></v-text-field>
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
      <v-stepper-content step="4"><v-col cols="6" sm="6" md="3">
              <v-text-field label="Investimento" v-model="importo" type="number"></v-text-field>
            </v-col>
            <v-row justify="center" class="mb-2">
        <v-btn color="success" @click="e6 = 1" class="mr-2">Salva</v-btn>
        <v-btn color="error" @click="e6 = 3" class="mr-2">Indietro</v-btn>
            </v-row>
      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<script>
import HelloWorld from "../components/HelloWorld";
import { mapGetters } from "vuex";
export default {
  components: {
    HelloWorld
  },
  computed: mapGetters(["betsCount"]),
  data() {
    return {
      e6: 1,
      picker: new Date().toISOString().substr(0, 10),
      home_team: null,
      away_team: null,
      pronostico_pre_gara: null,
      quota: null,
      copertura_1_pronostico: null,
      copertura_2_pronostico: null,
      copertura_1_quota: null,
      copertura_2_quota: null,
      importo: null
    };
  }
};
</script>
