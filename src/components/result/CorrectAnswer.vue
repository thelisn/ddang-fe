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
    display: flex;
    align-items: center;
    isolation: isolate;

    &::before {
      content: "";
      display: block;
      position: absolute;
      left: 60px;
      width: calc(100% - 40px);
      height: 100%;
      background-color: #1c77ff;
      border-radius: 20px 0 0 20px;
      z-index: -1;
    }

    .answer-number {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 60px;
      line-height: 1.6;
      font-size: 22px;
      color: #fff;
    }

    .selected-text {
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
