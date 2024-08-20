<template>
  <div class="btn-container">
    <button class="finish-btn" @click="$emit('finish')">종료</button>
    <button class="reset-btn" @click="$emit('reset')">초기화</button>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue';

const emits = defineEmits(['finish', 'reset']);
</script>

<style lang="scss" scoped>
.btn-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 70px;
  width: 100%;
  background-color: #111;
  padding-top: 10px;
  padding-bottom: 20px;

  .finish-btn {
    font-family: 'Noto Sans KR';
    color: #fff;
    font-size: 22px;
    font-weight: 500;
    width: 100%;
    height: 60px;
    border-radius: 20px;
    background-color: #eb1c1c;
    margin-bottom: 20px;
    cursor: pointer;
  }

  .reset-btn {
    font-family: 'Noto Sans KR';
    color: #111;
    font-size: 22px;
    font-weight: 500;
    width: 100%;
    height: 60px;
    border-radius: 20px;
    background-color: #555;
    cursor: pointer;
  }
}
</style>
