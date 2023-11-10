import { createStore } from "vuex";

// state, getters, mutations, actions, modules
export default createStore({
    state : {
      name: '',
      eiNumber: '',
      teamName: '',
      isAdmin: null,
    },
    getters : {},
    mutations : {
      setUserInfo(state, data) {
        state.name = data.name;
        state.eiNumber = data.eiNumber;
        state.teamName = data.team;
        state.isAdmin = data.isAdmin;
      }
    },
});