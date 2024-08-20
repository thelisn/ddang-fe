<template>
  <div class="answer-container">
    <p class="status">
      {{ currentUser }} 명/{{ totalUser }} 명 ({{
        Math.ceil((currentUser / totalUser) * 100)
      }}%) 완료
    </p>
    <div class="status-view"></div>
    <button class="show-answer" @click="emitShowAnswer">정답 공개</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  currentUser: Number,
  totalUser: Number,
});

const emit = defineEmits(['show-answer']);

const emitShowAnswer = () => {
  emit('show-answer');
};
</script>

<style scoped lang="scss">
.answer-container {
  margin-top: 50px;
  color: #fff;

  .status {
    font-size: 20px;
    font-weight: 500;
    line-height: 160%;
  }

  .status-view {
    margin-top: 16px;
    height: 76px;
    background-color: #fff;
  }

  .show-answer {
    margin-top: 16px;
    background-color: #eb1c1c;
    color: #fff;
    width: 100%;
    height: 60px;
    border-radius: 20px;
    font-size: 22px;
    font-weight: 500;
  }
}
</style>
