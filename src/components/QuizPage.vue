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
import { getUserInfo } from "@/utils";
import axios from 'axios';

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
    const isData = ref(null);
    const userInfo = ref(null);

    // 함수
    const selectAnswer = (idx) => {     
      console.log(idx); 
      selectedAnswer.value = idx;
      
      // 사용자가 선택한 답, 문제번호, 사번을 파라미터로 넘김
      socket.emit('select-answer', {
        answer: selectedAnswer.value,  // 사용자가 선택한 답
        number: questionNumber.value,  // 문제 번호
        userInfo: userInfo.value // 사용자 정보
      });
    };

    // Life Cycle
    onMounted(() => {
      userInfo.value = getUserInfo();

      socket.on('join-quiz', (data) => {
        console.log(data)
        answers.value = data.answers;
        question.value = data.question;
        questionNumber.value = data.number;
        isAlive.value = data.isAlive;
        isData.value = true;
        selectedAnswer.value = data.selectedAnswer;
      });

      socket.on('show-answer', (data) => {
        // 사번, 문제 넘버, 답안을 파라미터로 넘긴다
        socket.emit('check-answer', {
          userInfo: userInfo.value,
          number: data.currentQuestion,
          correctAnswer: data.correctAnswer
        });

        router.push('/result');
      });

      setTimeout(async () => {
        if (!isData.value) {
          await axios.get('/api/quiz', {
            params: {
              userInfo: userInfo.value
            }
          }).then(res => {
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
      isAlive,
    }
  }
}
</script>
<style scoped lang="scss" src="@/assets/scss/component/pages/QuizPage.scss"></style>