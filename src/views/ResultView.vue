<template>
  <div v-if="isLoading">로딩중</div>
  <div v-else id="result-page">
    <LisnHeader />

    <QuestionSection :questionData="questionData" :checkAnswer="checkAnswer" />

    <div class="answer-area">
      <CorrectAnswer :correctAnswerData="correctAnswerData" />
      <WrongAnswer :answerData="answerData" :userAnswer="userAnswer" />
    </div>
  </div>
</template>

<script setup>
import { socket } from "@/socket";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { getUserInfo } from "@/utils";
import router from "@/router";
import axios from "axios";

import LisnHeader from "@/components/LisnHeader.vue";
import QuestionSection from "@/components/result/QuestionSection.vue";
import CorrectAnswer from "@/components/result/CorrectAnswer.vue";
import WrongAnswer from "@/components/result/WrongAnswer.vue";

// 변수
const checkAnswer = ref(null);
const userInfo = ref(null);
const answerData = ref(null);
const correctAnswerData = ref(null);
const questionData = ref(null);
const userAnswer = ref(null);
const isLoading = ref(true);
const isData = ref(false);

// Life Cycle
onMounted(() => {
  userInfo.value = getUserInfo();
  socket.on("check-answer", (data) => {
    getResultData(data);
  });

  socket.on('start-quiz', (data) => {
    // 사번을 파라미터로 보낸다
    socket.emit('join-quiz', userInfo.value);
    router.push({ path: '/quiz', state: { isRouter: true } });
  });

  socket.on('show-end-winner', (data) => {
    router.push({
      path: '/end',
      state: { isRouter: true, userData: data.userData },
    });
  });

  socket.on("re-start-quiz", () => {
    router.push({ path: "/waiting", state: { isRouter: true } });
  });

  // 새로고침 시 실행
  setTimeout(async () => {
    if (!isData.value) {
      const { data } = await axios.get("/api/result", { params: { userInfo: userInfo.value } });
      getResultData(data);
    }
  }, 500);
});

onBeforeUnmount(() => {
  socket.off("check-answer");
  socket.off("start-quiz");
  socket.off("show-end-winner");
  socket.off("re-start-quiz");
});

const getResultData = (data) => {
  questionData.value = data.questionData;
  answerData.value = data.answerData
    .filter((v) => v.number !== data.correctAnswer)
    .map((v) => {
      return {
        ...v,
        userData: Object.groupBy(v.userData, ({ team }) => team),
      };
    });

  correctAnswerData.value = data.answerData.filter((v) => v.number === data.correctAnswer)[0];
  userAnswer.value = data.userAnswer;
  checkAnswer.value = data.isCorrect;

  isLoading.value = false;
  isData.value = true;
};
</script>

<style scoped lang="scss">
#result-page {
  display: flex;
  flex-direction: column;
  gap: 38px;
  padding: 0 20px;
  min-height: 100dvh;
  background-color: #111;
  overflow: hidden;
  .answer-area {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 40px;
    flex: 1;
    padding-bottom: 32px;
  }
}
</style>
