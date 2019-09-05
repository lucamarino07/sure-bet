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
    },
    profitto(state) {
      let profitto = 0;
      state.bets.forEach(
        function(bet) {
          profitto = profitto + bet['vincita_netta'];
          
        }
      )
      return profitto
    }
  },
  mutations: {
    calcolaGrandezze(state, payload) {
      let bet = findBetById(state, payload.id);
      if (bet) {
        let inverso_quota = 1 / bet.quota
        let inverso_quota_c1 = 1 / bet.copertura_1.quota
        let inverso_quota_c2 = 1 / bet.copertura_2.quota
        let resa_netta = 1 - ((inverso_quota + inverso_quota_c1 + inverso_quota_c2))
        bet.resa_netta = parseFloat(resa_netta.toFixed(4) * 100);
        let importo1 = (bet.quota * bet.importo) / (bet.copertura_1.quota)
        bet.copertura_1.importo = parseFloat(importo1.toFixed(2))
        let importo2 = (bet.quota * bet.importo) / (bet.copertura_2.quota)
        bet.copertura_2.importo = parseFloat(importo2.toFixed(2))
        let investimento = bet.importo + importo1 + importo2
        bet.investimento = parseFloat(investimento.toFixed(2))
        let vincita_netta = investimento * resa_netta
        bet.vincita_netta = parseFloat(vincita_netta.toFixed(2))
      }
    },
    modificaQuote(state, payload) {
      let bet = findBetById(state, payload.id);
      if (bet) {
        bet.copertura_1.quota = payload.quota_pronostico1;
        bet.copertura_2.quota = payload.quota_pronostico2;
      }
    },
    aggiungiBet(state, payload) {
      let bet = {
        id: state.bets.length + 1,
        data: payload.data,
        home_team: payload.home_team,
        away_team: payload.away_team,
        pronostico_pre_gara: payload.pronostico_pre_gara,
        quota: payload.quota,
        importo: payload.importo,
        vincita_netta: null,
        resa_netta: null,
        copertura_1: {
          pronostico: payload.copertura_1.pronostico,
          quota: payload.copertura_1.quota
        },
        copertura_2: {
          pronostico: payload.copertura_2.pronostico,
          quota: payload.copertura_2.quota,
        },
        investimento: null
      }
      state.bets.push(bet);
    }
  },
  actions: {
    calcolaGrandezze(context, payload) {
      context.commit('calcolaGrandezze', payload);
    },
    modificaQuote(context, payload) {
      context.commit('modificaQuote', payload);
    },
    aggiungiBet(context, payload) {
      context.commit('aggiungiBet', payload)
    }
  },
});
