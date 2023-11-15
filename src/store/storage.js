import { createStore } from 'vuex'

export default createStore({
    state : {
      userInfo: null,
      teamList: null,
      currentQuestion: null
    },

    getters : {
      teamInfo: (state) => (teamId) => {
        let result = {}
        if (state.teamList) {
          result = state.teamList.find(team => team.id == teamId) || result
        }
        return result
      }
    },

    mutations : {
      setUserInfo: (state, data) => {
        state.userInfo = data
      },
      
      setTeamList: (state, data) => {
        state.teamList = data
      },

      setCurrentQuestion: (state, data) => {
        state.currentQuestion = data
      }
    }
})