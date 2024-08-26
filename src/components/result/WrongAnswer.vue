<template>
  <div class="wrong-answer-wrap">
    <div
      v-for="(answer, idx) in answerData"
      class="wrong-answer"
      :class="userAnswer === answer.number && 'is-select'"
      :key="idx"
    >
      <div class="wrong-number">{{ answer.number }}</div>
      <button class="wrong-text">{{ answer.text }}</button>

      <div v-if="Object.keys(answer.userData).length" class="user-state-wrap">
        <ul
          v-for="(users, key, index) of answer.userData"
          :key="`users-${index}`"
        >
          <li v-for="(_, userIndex) of users" :key="`user-${userIndex}`">
            <div class="circle" :class="getClass(key)" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { getClass } from '@/utils';

const props = defineProps(["answerData", "userAnswer"]);
</script>

<style scoped lang="scss">
.wrong-answer-wrap {
  display: flex;
  flex-direction: column;
  gap: 8px;

  .wrong-answer {
    display: flex;
    align-items: center;

    &.is-select {
      position: relative;
      isolation: isolate;

      &::before {
        content: '';
        display: block;
        position: absolute;
        left: 60px;
        width: calc(100% - 40px);
        height: 100%;
        background-color: #555555;
        border-radius: 20px 0 0 20px;
        z-index: -1;
      }
    }

    .wrong-number {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 60px;
      line-height: 1.6;
      font-size: 22px;
      color: #fff;
    }

    .wrong-text {
      color: #fff;
      margin-left: 20px;
      padding: 0;
      line-height: 1.6;
      font-size: 22px;
      text-align: left;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      background-color: transparent;
    }

    .user-state-wrap {
      margin-left: 24px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 2px;

      & > ul {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2px;

        .circle {
          width: 8px;
          aspect-ratio: 1;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
