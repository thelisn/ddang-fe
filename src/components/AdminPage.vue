<template>
  <div v-if="userName">
    <h2>{{ userName }}님이 Admin계정으로 로그인하셨습니다.</h2>

    <div v-if="currentNum">
      <p>총 인원 : {{ totalNum }}</p>
      <p>문제푼 인원 : {{ currentNum }}</p>
    </div>

    <ul class="question-container">
      <li class="question" @click="sendQuestion(1)">문제 1</li>
      <li class="question" @click="sendQuestion(2)">문제 2</li>
      <li class="question" @click="sendQuestion(3)">문제 3</li>
      <li class="question" @click="sendQuestion(4)">문제 4</li>
      <li class="question" @click="sendQuestion(5)">문제 5</li>
    </ul>
  </div>
  <div v-else>
    <button @click="$router.push('/')">다시 로그인 해 주세요.</button>
  </div>
</template>

<script>
import { state, socket } from "@/socket";


export default {
  name: "AdminPage",
  data() {
    return {
      totalNum: null,
      currentNum: null,
    }
  },
  mounted() {
    socket.on('current-state', (data) => {
      this.totalNum = data.totalNum,
      this.currentNum = data.currentNum
    })
  }, 
  unmounted() {
    socket.off('current-state');
  }, 
  computed: {
    userName() {
      return state.userName;
    }
  },
  methods: {
    sendQuestion(num) {
      this.currentNum = null;
      socket.emit('send-question', num);
    }
  }
}
</script>

<style lang="scss" scoped>
.question-container {
  padding: 0;
  width: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  overflow: hidden;

  .question {
    list-style: none;
    padding: 30px 0;
    text-align: center;
    border: 1px solid #d0e1ca;
    background-color: #ecf5ed;
    cursor: pointer;
  }
}
</style>