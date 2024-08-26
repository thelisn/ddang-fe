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
          :disabled="isEnd || question.isStarted"
          @click="startButton(question)"
        >
          {{ isEnd ? '종료' : question.isStarted ? '완료' : '시작' }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue';

const props = defineProps(["questionData", "currentQuestion", "isEnd"]);
const emit = defineEmits(["start-quiz"]);

const startButton = (question) => {
  emit('start-quiz', question);
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
    gap: 10px;
    align-items: center;
    color: #fff;
    font-size: 20px;
    font-weight: 500;

    &.on {
      margin: 9px -20px 0;
      padding: 0 20px;
      height: 46px;
      background-color: #999;

      .question-btn {
        visibility: hidden;
      }

      & ~ .before .question-btn {
        pointer-events: none;
        user-select: none;
      }
    }

    &.before {
      .result {
        color: #999;
        font-weight: 400;
      }
    }

    &:first-child {
      margin-top: 0;
    }

    .number {
      width: 45px;
    }

    .result {
      font-size: 18px;
      font-weight: 500;
      flex: 1;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .question-btn {
      width: 94px;
      padding: 6px 26px;
      background: linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.5) 0%,
          rgba(0, 0, 0, 0.5) 100%
        ),
        #eb231c;
      border-radius: 20px;
      color: #fff;
      font-size: 14px;
      font-weight: 500;
      font-family: 'Noto Sans KR';

      &:disabled {
        pointer-events: none;
        user-select: none;
        filter: grayscale(1);
      }
    }
  }
}
</style>
