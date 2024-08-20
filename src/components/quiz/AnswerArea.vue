<template>
  <div class="answer-area" :class="!isAlive ? 'dead' : null">
    <ul>
      <li class="answer-list" v-for="(answer, idx) in answers" :key="idx">
        <span class="answer-number">{{ idx + 1 }}</span>
        <button
          class="answer-button"
          :class="[
            getClass(),
            selectedAnswer === idx + 1
              ? 'selected'
              : selectedAnswer
              ? 'not-selected'
              : null,
          ]"
          @click="selectAnswer(idx + 1)"
        >
          {{ answer.text }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { getClass } from '@/utils';

const props = defineProps({
  answers: {
    type: Array,
    required: true,
  },
  selectedAnswer: {
    type: Number,
    required: true,
  },
  isAlive: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['answer-selected']);

const selectAnswer = (idx) => {
  emit('answer-selected', idx);
};
</script>

<style scoped lang="scss">
.answer-area {
  width: 100%;
  margin-right: -20px;
  position: absolute;
  padding-bottom: 20px;
  bottom: 0;

  &.dead {
    .answer-number {
      color: #555 !important;
    }

    .answer-button {
      color: #d9d9d9 !important;
      background-color: #555;
      pointer-events: none;
    }
  }

  .answer-list {
    width: 100%;
    position: relative;
    text-align: right;
    margin-top: 16px;

    &:first-of-type {
      margin-top: 0;
    }

    .answer-number {
      position: absolute;
      left: 23px;
      top: 50%;
      transform: translateY(-50%);
      color: #fff;
      font-size: 22px;
      font-weight: 500;
    }

    .answer-button {
      font-family: 'Noto Sans KR';
      width: calc(100% - 60px);
      padding: 13px 0 13px 20px;
      text-align: left;
      border-radius: 20px 0 0 20px;
      font-size: 22px;
      font-weight: 500;
      line-height: 35px;
      color: #fff;
      transition: width 0.3s;

      &.selected {
        width: 100%;
        padding-left: 80px;
      }

      &.not-selected {
        color: #111;
      }
    }
  }
}
</style>
