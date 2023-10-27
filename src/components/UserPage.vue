<template>
  <div v-if="userName">
    <h2>{{ userName }}님이 User계정으로 로그인하셨습니다.</h2>

    <div class="online-container">
      <div class="team">
        <span class="member">지환</span>
        <span class="member">승혁</span>
        <span class="member">선유</span>
      </div>
      <div class="team">
        <span class="member">선유</span>
        <span class="member">선유</span>
      </div>
      <div class="team">
        <span class="member">선유</span>
      </div>
    </div>

    <div v-if="question">
      <p>{{ questionNumber }}번 문제 : {{ question }}</p>
      <ul class="answer-container">
        <li class="answer" @click="sendAnswer(1)">2</li>
        <li class="answer" @click="sendAnswer(2)">3</li>
        <li class="answer" @click="sendAnswer(3)">4</li>
        <li class="answer" @click="sendAnswer(4)">5</li>
      </ul>
    </div>
    <div>

    </div>
  </div>
  <div v-else>
    <button @click="$router.push('/')">다시 로그인 해 주세요.</button>
  </div>
</template>

<script>
import { state, socket } from "@/socket";


export default {
  name: "UserPage",
  data() {
    return {
      questionNumber: null,
      question: null,
    }
  },
  mounted() {
    socket.on('receive-question', (obj) => {
      this.questionNumber = obj.questionNum;
      this.question = obj.question;
    });
  },
  unmounted() {
    socket.off('receive-question');
  },
  computed: {
    userName() {
      return state.userName;
    }
  },
  methods: {
    sendAnswer(num) {
      socket.emit('send-answer', num);
    }
  }
}
</script>

<style lang="scss" scoped>
.online-container {
  position: relative;
  padding: 30px;
  top: 200px;
  width: 90%;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  .team {
    width: 90%;
    margin: 10px auto;
    border-radius: 10px;
    background-color: lightblue;
    padding: 20px;

    .member {
      border-radius: 5px;
      background-color: lightcoral;
      text-align: center;
      padding: 5px 10px;
      margin-right: 10px;
    }
  }
}
</style>