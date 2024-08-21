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
      <button class="userBtn" :disabled="!currentQuestion" :class="getClass()" @click="joinQuiz">
        {{ currentQuestion ? "입장" : "대기중" }}
      </button>
    </div>

    <div class="btn-area" v-if="isAdmin">
      <button class="userBtn" @click="joinAdminQuiz" :class="getClass()">Admin</button>
    </div>
  </div>
</template>

<script setup>
import { socket } from "@/socket";
import { useStore } from "vuex";
import { getClass, getUserInfo } from "@/utils";
import { onBeforeUnmount, onMounted, ref } from "vue";

import router from "@/router";
import axios from "axios";

import LisnHeader from "./LisnHeader.vue";

// 변수
const store = useStore();
const currentQuestion = ref(null);
const teamData = ref(null);
const isAdmin = ref(null);
const checkHeight = ref(false);
const isData = ref(false);
const userInfo = ref(null);

// 함수
const joinQuiz = () => {
  if (!currentQuestion.value) return false;

  // 사번을 파라미터로 보낸다
  socket.emit("join-quiz", userInfo.value);
  router.push({ path: "/quiz", state: { isRouter: true } });
};

const joinAdminQuiz = () => {
  socket.emit("join-admin-quiz");
  router.push({ path: "/admin", state: { isRouter: true } });
};

// Life Cycle
onMounted(() => {
  userInfo.value = getUserInfo();

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

  socket.on("start-quiz", (data) => {
    currentQuestion.value = data;
  });

  socket.on("show-answer", (data) => {
    currentQuestion.value = null;
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

    isAdmin.value = JSON.parse(localStorage.getItem("userInfo")).isAdmin;
  });

  setTimeout(async () => {
    if (!isData.value) {
      await axios.get("/api/waiting").then((res) => {
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
  socket.off("start-quiz");
  socket.off("show-answer");
  socket.off("rejoin");
});
</script>

<style lang="scss" scoped src="@/assets/scss/component/pages/WaitingRoom.scss"></style>
