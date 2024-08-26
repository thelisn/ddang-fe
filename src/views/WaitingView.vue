<template>
  <div id="waiting-room">
    <LisnHeader />
    <TeamList
      :teamData="teamData"
      :currentQuestion="currentQuestion"
      :isAdmin="isAdmin"
    />
    <ActionButton
      :isAdmin="isAdmin"
      :currentQuestion="currentQuestion"
      @joinQuiz="joinQuiz"
      @joinAdminQuiz="joinAdminQuiz"
    />
  </div>
</template>

<script setup>
import { socket } from "@/socket";
import { getUserInfo } from "@/utils";
import { ref, onMounted, onBeforeUnmount } from "vue";
import router from "@/router";
import axios from "axios";

import LisnHeader from "@/components/LisnHeader.vue";
import TeamList from "@/components/waiting/TeamList.vue";
import ActionButton from "@/components/waiting/ActionButton.vue";

// 변수
const currentQuestion = ref(null);
const teamData = ref(null);
const isAdmin = ref(null);
const isData = ref(false);
const userInfo = ref(getUserInfo());

// 함수
const joinQuiz = () => {
  if (!currentQuestion.value) return false;
  socket.emit('join-quiz', userInfo.value);
  router.push({ path: '/quiz', state: { isRouter: true } });
};

const joinAdminQuiz = () => {
  socket.emit('join-admin-quiz');
  router.push({ path: '/admin', state: { isRouter: true } });
};

// Life Cycle
onMounted(() => {

  socket.on("login", (data) => {
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
    isData.value = true;
  });

  socket.on("rejoin", (data) => {
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

  socket.on("start-quiz", (data) => {
    currentQuestion.value = data;
  });

  socket.on("show-answer", () => {
    currentQuestion.value = null;
  });

  socket.on("show-end-winner", () => {
    currentQuestion.value = null;
  });

  setTimeout(async () => {
    if (!isData.value) {
      await axios.get('/api/waiting').then((res) => {
        isAdmin.value = userInfo.value.isAdmin;

        if (res.data.currentQuestion) {
          currentQuestion.value = res.data.currentQuestion;
        }

        let teams = {};
        res.data.userData.forEach((person) => {
          const { team } = person;

          if (!teams[team]) {
            teams[team] = [];
          }

          teams[team].push(person);
        });

        teamData.value = teams;
      });
    }
  }, 500);
});

onBeforeUnmount(() => {
  socket.off("login");
  socket.off("rejoin");
  socket.off("start-quiz");
  socket.off("show-answer");
  socket.off("show-end-winner");
});
</script>

<style lang="scss" scoped>
#waiting-room {
  height: calc(100dvh - 100px);
  background-color: #111;
  padding: 0 20px 120px;
}
</style>
