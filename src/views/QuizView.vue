<template>
  <div id="quiz-page">
    <LisnHeader />
    <section class="lisn-quiz-list">
      <QuestionArea :questionNumber="questionNumber" :question="question" />
      <AnswerArea
        :answers="answers"
        :selectedAnswer="selectedAnswer"
        :isAlive="isAlive"
        :userAnswerInfo="userAnswerInfo"
        @answer-selected="selectAnswer"
      />
    </section>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import { getUserInfo } from "@/utils";
import { socket } from "@/socket.js";
import router from "@/router";
import axios from "axios";

import LisnHeader from "@/components/LisnHeader.vue";
import QuestionArea from "@/components/quiz/QuestionArea.vue";
import AnswerArea from "@/components/quiz/AnswerArea.vue";

const questionNumber = ref(null);
const question = ref(null);
const answers = ref(null);
const selectedAnswer = ref(false);
const isAlive = ref(null);
const isData = ref(null);
const userInfo = ref(null);
const userAnswerInfo = ref({});

const selectAnswer = (idx) => {
  selectedAnswer.value = idx;
  socket.emit("select-answer", {
    answer: selectedAnswer.value,
    number: questionNumber.value,
    userInfo: userInfo.value,
  });
};

onMounted(() => {
  userInfo.value = getUserInfo();
  socket.on("join-quiz", (data) => {
    answers.value = data.answers;
    question.value = data.question;
    questionNumber.value = data.number;
    isAlive.value = data.isAlive;
    isData.value = true;
    selectedAnswer.value = data.selectedAnswer;
    userAnswerInfo.value = Object.groupBy(data.userAnswerInfo, ({ team }) => team);
  });
  socket.on("select-answer", (data) => {
    userAnswerInfo.value = Object.groupBy(data, ({ team }) => team);
  });

  socket.on("show-answer", (data) => {
    socket.emit("check-answer", {
      userInfo: userInfo.value,
      number: data.currentQuestion,
      correctAnswer: data.correctAnswer,
    });
    router.push({ path: "/result", state: { isRouter: true } });
  });

  setTimeout(async () => {
    if (!isData.value) {
      await axios
        .get("/api/quiz", {
          params: {
            userInfo: userInfo.value,
          },
        })
        .then((res) => {
          answers.value = res.data.answers;
          question.value = res.data.question;
          questionNumber.value = res.data.number;
          isAlive.value = res.data.isAlive;

          if (res.data.selectedAnswer) {
            selectedAnswer.value = res.data.selectedAnswer;
          }
        });
    }
  }, 500);
});

onBeforeUnmount(() => {
  socket.off("join-quiz");
  socket.off("show-answer");
  socket.off("select-answer");
});
</script>

<style scoped lang="scss">
#quiz-page {
  position: relative;
  background-color: #111;
  padding: 0 20px;
  min-height: 100vh;
  overflow: hidden;
}
</style>
