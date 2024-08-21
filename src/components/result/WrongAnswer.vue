<template>
  <div class="wrong-answer-wrap">
    <div class="wrong-answer" v-for="(answer, idx) in answerData" :key="idx">
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

const props = defineProps({
  answerData: Array,
});
</script>

<style scoped lang="scss">
.wrong-answer-wrap {
  margin-top: 52px;

  .wrong-answer {
    position: relative;
    display: flex;
    align-items: center;
    padding: 18px;

    .wrong-number {
      color: #fff;
      font-size: 22px;
    }

    .wrong-text {
      position: absolute;
      right: -20px;
      color: #fff;
      width: calc(100% - 40px);
      padding: 12px 0px 13px 20px;
      background-color: #111;
      font-size: 22px;
      text-align: left;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;

      &.selected-wrong {
        background-color: #555555;
        border-radius: 20px 0 0 20px;
      }
    }
  }
}
</style>
