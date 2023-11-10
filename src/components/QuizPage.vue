<template>
  <div id="quiz-page">
    <LisnHeader />
    <section class="lisn-quiz-list">
      <div class="question-area">
        <p class="question-number">Q{{ questionNumber }}.</p>
        <p class="question-text">{{ question }}</p>
      </div>

      <div class="answer-area" :class="!isAlive ? 'dead' : null">
        <ul>
          <li class="answer-list" v-for="(answer, idx) in answers" :key="idx">
            <span class="answer-number">{{ idx + 1 }}</span>
            <button class="answer-button" :class="[getClass(), (selectedAnswer === idx + 1 ? 'selected' : selectedAnswer ? 'not-selected' : null)]" @click="selectAnswer(idx+1)">{{ answer.text }}</button>
          </li>
        </ul>
      </div>

    </section>
  </div>
</template>

<script>
import { state, socket } from "@/socket";
import { getClass } from "@/utils";
import router from "@/router";
import { onBeforeUnmount, onMounted, ref } from "vue";
import LisnHeader from "@/components/LisnHeader.vue"

export default {
  name: 'QuizPage',
  components: {
    LisnHeader
  },

  setup() {
    // 변수
    const questionNumber = ref(null);
    const question = ref(null);
    const answers = ref(null);
    const selectedAnswer = ref(false);
    const isAlive = ref(null);

    // 함수
    const selectAnswer = (idx) => {
      let einumber = JSON.parse(localStorage.getItem('userInfo')).einumber;

      selectedAnswer.value = idx;

      // 사용자가 선택한 답, 문제번호, 사번을 파라미터로 넘김
      socket.emit('select-answer', {
        answer: 3,
        einumber,
        number: 2
      });
    };

    // Life Cycle
    onMounted(() => {
      socket.on('join-quiz', (data) => {
        answers.value = data.answers;
        question.value = data.question;
        questionNumber.value = data.number;
        isAlive.value = data.isAlive;
      });

      socket.on('show-answer', (data) => {
        // 사번, 문제 넘버, 답안을 파라미터로 넘긴다
        socket.emit('check-answer', {
          einumber: 'JA000887',
          number: 2,
          correctAnswer: data
        });

        router.push('/result');
      });
    });

    onBeforeUnmount(() => {
      socket.off('join-quiz');
      socket.off('show-answer');
    });

    return {
      selectAnswer,
      getClass,
      answers,
      question,
      questionNumber,
      selectedAnswer,
      isAlive
    }
  }
}
</script>
<style scoped lang="scss" src="@/assets/scss/component/pages/QuizPage.scss"></style>