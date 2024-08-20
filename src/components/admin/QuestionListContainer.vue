<template>
  <div class="question-list-container">
    <ul>
      <li
        class="list-wrap"
        v-for="(question, idx) in questionData"
        :key="idx"
        :class="questionStatus(question)"
      >
        <p class="number">Q{{ idx + 1 }}</p>
        <p class="result">
          {{
            question.isFinished
              ? question.question
              : question.isStarted
              ? '진행중'
              : question.question
          }}
        </p>
        <button
          class="question-btn"
          @click="startButton(question)"
          :disabled="question.isStarted"
        >
          {{ question.isStarted ? '완료' : '시작' }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue';

// Define props
const props = defineProps({
  questionData: Array,
  currentQuestion: Number,
});

// Define emits
const emit = defineEmits(['start-quiz', 'restart-quiz']);

const startButton = (question) => {
  if (question.isStarted) {
    emit('restart-quiz');
  } else {
    emit('start-quiz', question);
  }
};

const questionStatus = (data) => {
  if (!data.isStarted) {
    return 'before';
  } else if (data.isFinished) {
    return null;
  } else {
    return 'on';
  }
};
</script>

<style scoped lang="scss">
.question-list-container {
  margin-top: 62px;

  .list-wrap {
    margin-top: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: 20px;
    font-weight: 500;
    text-align: center;

    &.on {
      margin: 9px -20px 0;
      padding: 0 20px;
      height: 46px;
      background-color: #999;

      .question-btn {
        visibility: hidden;
      }
    }

    &.before {
      .result {
        color: #999;
        font-size: 14px;
        font-weight: 500;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }

    &:first-child {
      margin-top: 0;
    }

    .number {
      width: 45px;
    }

    .result {
      width: 170px;
    }

    .question-btn {
      width: 94px;
      padding: 6px 26px;
      background-color: #eb1c1c;
      color: #fff;
      border-radius: 20px;
      font-size: 16px;
      &:disabled {
        background-color: #555;
      }
    }
  }
}
</style>
