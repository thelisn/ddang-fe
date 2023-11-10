<template>
  <div id="waiting-room">
    <LisnHeader />

    <ul class="team-container">
      <li class="team-wrap" v-for="team in teamData" :class="getClass(team[0].team)" :key="team">
        <p class="team-title">{{ team[0].team }}</p>
        <ul class="user-wrap">
          <li class="user-data" v-for="member in team" :key="member">
            <div class="user-status" :class="getClass(member.team)"></div>
            <p class="user-name">{{ member.name }}</p>
          </li>
        </ul>
      </li>
    </ul>
    <div class="btn-area" v-if="!isAdmin">
      <button v-if="!currentQuestion" class="userBtn waiting" @click="joinQuiz">대기중</button>
      <button v-if="currentQuestion" class="userBtn" @click="joinQuiz" :class="getClass()">입장</button>
    </div>

    <div class="btn-area" v-if="isAdmin">
      <button class="userBtn" @click="joinAdminQuiz" :class="getClass()">Admin</button>
    </div>
    <!-- <p>{{ name1 }}</p>
    <input type="text" v-model="name1"> -->

  </div>

</template>

<script>
import LisnHeader from "./LisnHeader.vue";
import { state, socket } from "@/socket";
import { useStore } from "vuex";
import { getClass } from "@/utils";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import router from "@/router";

export default {
  name: "WaitingRoom",
  components: {
    LisnHeader,
  },
  setup() {
    // 변수
    const store = useStore();
    const currentQuestion = ref(null);
    const teamData = ref(null);
    const isAdmin = ref(null);
    const checkHeight = ref(false);                       

    // 함수
    const joinQuiz = () => {
      // 사번을 파라미터로 보낸다
      const sendEinumber = JSON.parse(localStorage.getItem('userInfo')).einumber;
      socket.emit('join-quiz', sendEinumber);
      router.push('/quiz');
    }

    const joinAdminQuiz = () => {
      socket.emit('join-admin-quiz');
      router.push('/admin');
    }

    // Life Cycle
    onMounted(() => {
      socket.on('login', (data) => {
        currentQuestion.value = data.currentQuestion;

        let teams = {};

        data.teamData.forEach((person) => {
          const { team } = person;
          if (!teams[team]) {
            teams[team] = [];
          }
          teams[team].push(person);
        });

        teamData.value = teams;

        isAdmin.value = data.userData.isAdmin;
      });

      socket.on('start-quiz', (data) => {
        console.log(data)
      });

      socket.on('rejoin', (data) => {
        currentQuestion.value = data.currentQuestion;
        let teams = {};

        data.teamData.forEach((person) => {
          const { team } = person;
          if (!teams[team]) {
            teams[team] = [];
          }
          teams[team].push(person);
        });

        teamData.value = teams;
      
        isAdmin.value = JSON.parse(localStorage.getItem('userInfo')).isAdmin;
      });
    });

    onBeforeUnmount(() => {
      socket.off('login');
      socket.off('start-quiz');
      socket.off('rejoin');
    });

    return {
      joinQuiz,
      joinAdminQuiz,
      currentQuestion,
      getClass,
      teamData,
      isAdmin,
      checkHeight,
    }
  }
}
</script>

<style lang="scss" scoped src="@/assets/scss/component/pages/WaitingRoom.scss">
</style>