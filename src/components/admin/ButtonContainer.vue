<template>
  <div class="btn-container">
    <button class="finish-btn" :disabled="isEnd || isQuestionEndStatus" @click="$emit('finish')">종료</button>
    <button class="finish-btn" :disabled="!isEnd" @click="$emit('restart')">초기화</button>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue';

defineProps(["isEnd", "isQuestionEndStatus"]);
defineEmits(["finish", "restart"]);
</script>

<style lang="scss" scoped>
.btn-container {
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  background-color: #111;
  padding: 20px;

  .finish-btn {
    font-family: 'Noto Sans KR';
    color: #fff;
    font-size: 22px;
    font-weight: 500;
    width: 100%;
    height: 60px;
    border-radius: 20px;
    background-color: #eb1c1c;
    cursor: pointer;

    &:disabled {
      pointer-events: none;
      user-select: none;
      color: #111111;
      background-color: #555555;
    }
  }
}
</style>
