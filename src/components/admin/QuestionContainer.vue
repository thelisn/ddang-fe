<template>
  <div class="question-container">
    <p class="number">Q{{ currentQuestionData.number }}.</p>
    <p class="text">{{ currentQuestionData.question }}</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps({
  currentQuestionData: Object,
});
</script>

<style scoped lang="scss">
.question-container {
  margin-top: 4px;
  color: #fff;

  .number {
    font-size: 36px;
    font-weight: 500;
    line-height: 160%;
  }

  .text {
    font-size: 20px;
    font-weight: 500;
    line-height: 160%;
  }
}
</style>
