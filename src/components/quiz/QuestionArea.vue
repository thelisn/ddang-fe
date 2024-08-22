<template>
  <div class="question-area">
    <p class="question-number">Q{{ questionNumber }}.</p>
    <p class="question-text">{{ question }}</p>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps(["questionNumber", "question"]);
</script>

<style scoped lang="scss">
.question-area {
  padding-top: 120px;
  .question-number {
    line-height: 77px;
    font-size: 48px;
    color: #fff;
  }

  .question-text {
    line-height: 51px;
    font-size: 32px;
    color: #fff;
  }
}
</style>
