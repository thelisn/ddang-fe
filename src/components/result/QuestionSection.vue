<template>
  <div class="question-section">
    <div class="question-area">
      <p class="question-number">Q{{ questionData.number }}.</p>
      <p class="question-text">{{ questionData.question }}</p>
    </div>
    <div class="inform-text">
      <p v-if="checkAnswer" class="inform-correct">정답입니다!</p>
      <p v-if="!checkAnswer" class="inform-wrong">틀렸습니다 ...</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  questionData: Object,
  checkAnswer: Boolean,
});
</script>

<style scoped lang="scss">
.question-section {
  padding-top: 58px;
  .question-area {
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

  .inform-text {
    margin-top: 16px;

    .inform-correct {
      font-size: 22px;
      font-weight: bold;
      color: #1c77ff;
    }

    .inform-wrong {
      font-size: 22px;
      font-weight: bold;
      color: #555555;
    }
  }
}
</style>
