import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

function findBetById(state, betId) {
  let bet = state.bets.find(bet => bet.id === betId);
  if (!bet) return null;
  return bet;
}

export default new Vuex.Store({
  state: {
    bets: [{
      id: 1,
      data: '05/08/2019',
      home_team: 'Sampdoria',
      away_team: 'Lazio',
      pronostico_pre_gara: '2',
      quota: 2.35,
      importo: 100,
      vincita_netta: null,
      resa_netta: null,
      copertura_1: {
        pronostico: '1',
        quota: 3.1,
        importo: null
      },
      copertura_2: {
        pronostico: 'X',
        quota: 3.3,
        importo: null
      },
      investimento: null

    }]
  },
  getters: {
    betsCount(state) {
      return state.bets.length;
    }
  },
  mutations: {

  },
  actions: {

  },
});
