<template>
  <div v-if="isLoading">로딩중</div>
  <div v-else id="result-page">
    <LisnHeader />
    <section class="result-container">
      <div class="question-area">
        <p class="question-number">Q{{ questionData.number }}.</p>
        <p class="question-text">{{ questionData.question }}</p>
      </div>
      <div class="inform-text">
        <p v-if="checkAnswer" class="inform-correct">정답입니다!</p>
        <p v-if="!checkAnswer" class="inform-wrong">틀렸습니다 ...</p>
      </div>

      <div class="correct-answer-wrap">
        <span class="answer-number">{{ correctAnswerData.number }}</span>
        <button class="selected-text">{{ correctAnswerData.text }}</button>
      </div>

      <ul class="user-wrap">
        <li class="correct-answer-user" v-for="(user, idx) in correctAnswerData.userData" :key="idx">
          <div class="user-status" :class="getClass(user.team)"></div>
          <p class="user-name">{{ user.name }}</p>
        </li>
      </ul>

      <div class="wrong-answer-wrap">
        <div
          v-for="(answer, idx) in answerData"
          class="wrong-answer"
          :class="userAnswer === answer.number && 'is-select'"
          :key="idx"
        >
          <div class="wrong-number">{{ answer.number }}</div>
          <button class="wrong-text">{{ answer.text }}</button>

          <div v-if="Object.keys(answer.userData).length" class="user-state-wrap">
            <ul v-for="(users, key, index) of answer.userData" :key="`users-${index}`">
              <li v-for="(_, userIndex) of users" :key="`user-${userIndex}`">
                <div class="circle" :class="getClass(key)" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { socket } from "@/socket";
import router from "@/router";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { getUserInfo, getClass } from "@/utils";
import LisnHeader from "@/components/LisnHeader.vue";

// 변수
let checkAnswer = ref(null);
const userInfo = ref(null);
const questionData = ref(null);
const answerData = ref(null);
const correctAnswerData = ref(null);
const userAnswer = ref(null);
const isLoading = ref(true);

// 함수

// Life Cycle
onMounted(() => {
  userInfo.value = getUserInfo();

  socket.on("check-answer", (data) => {
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
  });

  socket.on("start-quiz", (data) => {
    // 사번을 파라미터로 보낸다
    socket.emit("join-quiz", userInfo.value);
    router.push({ path: "/quiz", state: { isRouter: true } });
  });

  socket.on("show-end-winner", (data) => {
    router.push({ path: "/end", state: { isRouter: true, userData: data.userData } });
  });
});

onBeforeUnmount(() => {
  socket.off("check-answer");
  socket.off("start-quiz");
  socket.off("show-end-winner");
});
</script>
<style scoped lang="scss" src="@/assets/scss/component/pages/resultPage.scss"></style>
