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
const checkAnswer = ref(null);
const userInfo = ref(null);
const answerData = ref(null);
const correctAnswerData = ref(null);
const correctUserData = ref(null);
const questionData = ref(null);
const userAnswer = ref(null);
const isLoading = ref(true);

// Life Cycle
onMounted(() => {
  userInfo.value = getUserInfo();

  socket.on('check-answer', (data) => {
    questionData.value = data.questionData;
    answerData.value = data.answerData
      .filter((v) => v.number !== data.correctAnswer)
      .map((v) => {
        return {
          ...v,
          userData: Object.groupBy(v.userData, ({ team }) => team),
        };
      });

    correctAnswerData.value = data.answerData.filter(
      (v) => v.number === data.correctAnswer
    )[0];
    userAnswer.value = data.userAnswer;
    checkAnswer.value = data.isCorrect;

    isLoading.value = false;
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
