<template>
  <div class="container">
  
    <template v-if="userInfo">
      <h2 class="team-name">{{ userInfo.name }}</h2>
    </template> 

    <template v-if="teamList">
      <div class="list-container" v-for="(team, i) in teamList" :key="i">
        <h3 class="team-name">{{ team.teamName }}</h3>
        <div class="user-list-box">
          <ul class="user-area">
            <li>
              <div class="user-status waiting"
                  :style="{ backgroundColor: team.color, borderColor: team.color }"></div>
              <p class="userName small">
11
              </p>  
            </li>
            <li>
              <div class="user-status playing"
                  :style="{ backgroundColor: team.color, borderColor: team.color }"></div>
              <p class="userName small">
22
              </p>
            </li>
            <li>
              <div class="user-status none"
                  :style="{ backgroundColor: team.color, borderColor: team.color }"></div>
              <p class="userName small">
33
              </p>
            </li>
          </ul>
        </div>
      </div>
    </template> 
  </div>
  <button>Admin 입장</button>
  <button class="bottom-btn" type="submit" @click="joinQuiz">입장</button>

</template>

<script>
import { state, socket } from "@/socket";
import { useRouter, useRoute } from 'vue-router';
import { useStore } from "vuex";
import { computed } from "vue";
import { onMounted } from "vue";
import axios from "axios";

export default {
  name: "UserList",
  components: {
    
  },

  setup() {
    // 변수 
    const router = useRouter();
    const store = useStore();

    // 함수
    const joinQuiz = () => {
      let data = {
        einumber: 'JA000882',
        isAdmin: false
      }
      socket.emit('join-quiz', data);
    }

    // Life Cycle
    onMounted(() => {
      // if (!store.state.userInfo) {
      //   router.push('/');
      //   return
      // }

      // axios.get('/api/user')
      //   .then(response => {
      //     let teamList = response.data
      //     store.commit("setTeamList", teamList)
      //     let myTeam = teamList[store.state.userInfo.teamNumber]
      //     store.commit("setUserInfo", {
      //       ...store.state.userInfo,
      //       teamName: myTeam.teamName,
      //       teamColor: myTeam.color
      //     });
      //   })
      })

    const name = computed(() => store.state.name);
    const eiNumber = computed(() => store.state.eiNumber);
    const teamNumber = computed(() => store.state.teamNumber);
    const teamName = computed(() => store.state.teamName);
    const teamColor = computed(() => store.state.teamColor);
    // const checkTeamName = computed(() => store.state.checkTeamName);
    const userInfo = computed(() => store.state.userInfo);
    const teamList = computed(() => store.state.teamList);

    return {
      name,
      eiNumber,
      teamNumber,
      teamName,
      teamColor,
      // checkTeamName,
      userInfo,
      teamList,
      joinQuiz
    }
  },

  data() {
    return {
      questionNumber: null,
      question: null,
      // lisnTeams: [
      //   {
      //     name: "양재팀"
          
      //   },
      //   {
      //     name: "스포크팀"
      //   },
      //   {
      //     name: "디채팀"
      //   },
      //   {
      //     name: "모니모팀"
      //   },
      //   {
      //     name: "깍두기팀"
      //   },
      // ],

      // teamYangjae: [],
    }
  },
  // mounted() {
  //   // socket.on('receive-question', (obj) => {
  //   //   this.questionNumber = obj.questionNum;
  //   //   this.question = obj.question;
  //   // });
  // },
  // unmounted() {
  //   socket.off('receive-question');
  // },
  // computed: {
  //   userName() {
  //     return state.userName;
  //   }
  // },
  methods: {
    // sendAnswer(num) {
    //   socket.emit('send-answer', num);
    // }
  }
}
</script>

<style lang="scss" scoped src="@/assets/scss/component/UserList.scss">

</style>