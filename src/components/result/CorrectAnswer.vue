<template>
  <div class="correct-answer-section">
    <div class="correct-answer-wrap">
      <span class="answer-number">{{ correctAnswerData.number }}</span>
      <button class="selected-text">{{ correctAnswerData.text }}</button>
    </div>

    <ul class="user-wrap">
      <li class="correct-answer-user" v-for="(user, idx) in correctAnswerData.userData" :key="idx">
        <div class="user-status" :class="getClass(user.team)"></div>
        <p class="user-name">{{ user.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { getClass } from "@/utils";

const props = defineProps(["correctAnswerData"]);
</script>

<style scoped lang="scss">
.correct-answer-section {
  .correct-answer-wrap {
    position: relative;
    margin-top: 38px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px;

    .answer-number {
      color: #fff;
      font-size: 22px;
    }

    .selected-text {
      position: absolute;
      right: -20px;
      color: #fff;
      width: calc(100% - 40px);
      font-size: 22px;
      text-align: left;
      background-color: #1c77ff;
      padding: 12px 0px 13px 20px;
      border-radius: 20px 0 0 20px;
      margin-left: -20px;
    }
  }

  .user-wrap {
    display: flex;
    flex-wrap: wrap;
    margin-left: 60px;

    .correct-answer-user {
      display: flex;
      margin-top: 22px;
      align-items: center;
      margin-right: 12px;

      .user-status {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        margin-right: 9px;
      }

      .user-name {
        height: max-content;
        color: #fff;
        font-size: 16px;
        font-weight: 500;
        padding-bottom: 3px;
      }
    }
  }
}
</style>
