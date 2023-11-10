<template>
  <div id="result-page">
    Result Page
  </div>
</template>

<script>
import { state, socket } from "@/socket";
import router from "@/router";
import { onBeforeUnmount, onMounted } from "vue";

export default {
  name: 'QuizPage',
  setup() {
    // 변수

    // 함수


    // Life Cycle
    onMounted(() => {
      socket.on('check-answer', (data) => {
        console.log(data);
      });

      socket.on('start-quiz', (data) => {
        // 사번을 파라미터로 보낸다
        socket.emit('join-quiz', 'JA000887');
        router.push('/quiz');
      });
    
    });

    onBeforeUnmount(() => {
      socket.off('check-answer');
      socket.off('start-quiz');
    });

    return {
    }
  }
}
</script>