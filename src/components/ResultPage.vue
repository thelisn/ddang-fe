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
        <li class="correct-answer-user" v-for="(user, idx) in correctUserData" :key="idx">
          <div class="user-status" :class="getClass(user.team)"></div>
          <p class="user-name">{{ user.name }}</p>
        </li>
      </ul>

      <div class="wrong-answer-wrap">
        <div class="wrong-answer" v-for="(answer, idx) in answerData" :key="idx">
          <div class="wrong-number">{{ answer.number }}</div>
          <button class="wrong-text">{{ answer.text }}</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { state, socket } from "@/socket";
import router from "@/router";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { getUserInfo, getClass } from "@/utils";
import LisnHeader from "@/components/LisnHeader.vue"

export default {
  name: 'QuizPage',
  components: {
    LisnHeader
  },
  setup() {
    // 변수
    let checkAnswer = ref(null);
    const userInfo = ref(null);
    const answerData = ref(null);
    const correctAnswerData = ref(null);
    const correctUserData = ref(null);
    const questionData = ref(null);
    const correctAnswer = ref(null);
    const isLoading = ref(true);


    // 함수


    // Life Cycle
    onMounted(() => {
      userInfo.value = getUserInfo();

      socket.on('check-answer', (data) => {
        if (data.isCorrect === true) {
          checkAnswer.value = true;
        } else {
          checkAnswer.value = false;
        }
        console.log(data)

        correctUserData.value = data.correctUserData;
        questionData.value = data.questionData;
        correctAnswer.value = data.correctAnswer;
        answerData.value = data.answerData.filter((data) => data.number !== correctAnswer.value);
        correctAnswerData.value = data.answerData.filter((data) => data.number === correctAnswer.value)[0];
        console.log(correctAnswerData.value)
        isLoading.value = false;
      });

      socket.on('start-quiz', (data) => {
        // 사번을 파라미터로 보낸다
        socket.emit('join-quiz', userInfo.value);

        router.push('/quiz');
      });

      socket.on('show-end-winner', (data) => {
        router.push('/end');
      })
    
    });

    onBeforeUnmount(() => {
      socket.off('check-answer');
      socket.off('start-quiz');
      socket.off('show-end-winner');
    });

    return {
      getClass,
      checkAnswer,
      correctAnswer,
      answerData,
      correctUserData,
      questionData,
      correctAnswerData,
      isLoading

    }
  }
}
</script>
<style scoped lang="scss" src="@/assets/scss/component/pages/resultPage.scss"></style>