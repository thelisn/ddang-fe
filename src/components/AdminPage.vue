<template>
  <div id="admin-page">
    <div class="header">
      <p class="title">LISN QUIZ</p>
      <div class="admin-user">
        <p class="badge">ADMIN</p>
        <p class="name">안병훈</p>
      </div>
    </div>

    <div class="contents">
      <div class="status">
        <p class="title-text">NOW</p>
        <div class="now-container">
          <p class="question-number">Q1.</p>
          <p class="question-text">오늘은 무슨 요일인가요?</p>

          <p class="question-finish-user">
            34/52명 (78%) 완료
          </p>
        </div>
        <button class="show-answer-btn" @click="showAnswer">정답공개</button>
      </div>

      <div class="questions">
        <p class="title-text">문제 현황</p>
        <div class="question-container container">
          <div class="question-area" v-for="item in quizData" :key="item">
            <p class="question-number">Q1.{{ item[0] }}</p>
            <p class="question-text">123</p>
          </div>
          <button @click="startQuiz">시작</button>
        </div>
      </div>

      <div class="alive">
        <p class="title-text">생존</p>
        <div class="alive-container container">

        </div>
      </div>

      <div class="dead">
        <p class="title-text">탈락</p>
        <div class="dead-container container">

          <button @click="revive">부활</button>
        </div>
      </div>

    </div>
    
  </div>
</template>

<script>
import { state, socket } from "@/socket";
import { onBeforeUnmount, onMounted, reactive, ref } from "vue";


export default {
  name: "AdminPage",
  components: {},
  setup() {
    // 변수
    let quizData = reactive(null);
    const questionNumber = ref(null);
    const question = ref(null);
    const isAlive = ref(null);
    // 함수
    const showAnswer = () => {
    // 채점하고자 하는 문제 번호 파라미터로 전송
      socket.emit('show-answer', 2);
    }

    const revive = () => {

    }

    const startQuiz = () => {
      // 시작하고자 하는 퀴즈 번호 파라미터로 전송
      socket.emit('start-quiz', 2);
    }
    // Life Cycle
    onMounted(() => {
      socket.on('join-admin-quiz', (data) => {
        console.log(data, 'data');
        console.log(data.questionData[0].number, 'ques data');
        quizData = data.questionData;
        console.log(quizData);
        // for (let i = 0; i < quizData.length; i++) {
        //   console.log(quizData[i].number);
        //   console.log(quizData[i].question);
        // }
        
        
        // question.value = quizData.number;
        questionNumber.value = data.questionData.number;
        isAlive.value = data.userData.isAlive;
      })
    });

    onBeforeUnmount(() => {
      socket.off('join-admin-quiz');
    });

    return {
      showAnswer,
      revive,
      startQuiz,
      question,
      questionNumber,
      isAlive,
      quizData,
    }
  }
}
</script>

<style lang="scss" scoped src="@/assets/scss/component/pages/AdminPage.scss"></style>