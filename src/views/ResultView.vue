<template>
  <div v-if="isLoading">로딩중</div>
  <div v-else id="result-page">
    <LisnHeader />

    <QuestionSection :questionData="questionData" :checkAnswer="checkAnswer" />
    <div class="answer-area">
      <CorrectAnswer
        :correctAnswerData="correctAnswerData"
        :correctUserData="correctUserData"
      />
      <WrongAnswer :answerData="answerData" />
    </div>
  </div>
</template>

<script setup>
import { state, socket } from '@/socket';
import router from '@/router';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import LisnHeader from '@/components/LisnHeader.vue';
import QuestionSection from '@/components/result/QuestionSection.vue';
import CorrectAnswer from '@/components/result/CorrectAnswer.vue';
import WrongAnswer from '@/components/result/WrongAnswer.vue';
import { getUserInfo } from '@/utils';

// 변수
let checkAnswer = ref(null);
const userInfo = ref(null);
const answerData = ref(null);
const correctAnswerData = ref(null);
const correctUserData = ref(null);
const questionData = ref(null);
const correctAnswer = ref(null);
const isLoading = ref(true);

// Life Cycle
onMounted(() => {
  userInfo.value = getUserInfo();

  socket.on('check-answer', (data) => {
    checkAnswer.value = data.isCorrect;
    correctUserData.value = data.correctUserData;
    questionData.value = data.questionData;
    correctAnswer.value = data.correctAnswer;
    answerData.value = data.answerData.filter(
      (data) => data.number !== correctAnswer.value
    );
    correctAnswerData.value = data.answerData.find(
      (data) => data.number === correctAnswer.value
    );
    isLoading.value = false;
  });

  socket.on('start-quiz', () => {
    socket.emit('join-quiz', userInfo.value);
    router.push('/quiz');
  });

  socket.on('show-end-winner', () => {
    router.push('/end');
  });
});

onBeforeUnmount(() => {
  socket.off('check-answer');
  socket.off('start-quiz');
  socket.off('show-end-winner');
});
</script>

<style scoped lang="scss">
#result-page {
  background-color: #111;
  padding: 0 20px;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  .answer-area {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding-bottom: 20px;
  }
}
</style>
