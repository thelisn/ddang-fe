<template>
  <div class="answer-container">
    <p class="status">{{ currentUser }} 명/{{ totalUser }} 명 ({{ totalPercentage }}%) 완료</p>
    <div class="status-view">
      <div class="enter-user-area">
        <ul v-for="(users, key, index) of userAnswerInfo" :key="`users-${index}`">
          <li v-for="(user, userIndex) of users" :key="`user-${userIndex}`">
            <div class="circle" :class="[!user.answer && 'blank', getClass(key)]" />
          </li>
        </ul>
      </div>
    </div>
    <button class="show-answer" @click="emitShowAnswer">정답 공개</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";
import { getClass } from "@/utils";

const props = defineProps(["currentUser", "totalUser", "userAnswerInfo"]);
const emit = defineEmits(["show-answer"]);

const totalPercentage = computed(() => {
  const percentage = Math.ceil(props.currentUser / props.totalUser) * 100;
  return Number.isNaN(percentage) ? 0 : percentage;
});

const emitShowAnswer = () => {
  emit("show-answer");
};
</script>

<style scoped lang="scss">
.answer-container {
  margin-top: 50px;
  color: #fff;

  .status {
    font-size: 20px;
    font-weight: 500;
    line-height: 160%;
  }

  .status-view {
    margin-top: 16px;
    height: 76px;

    .enter-user-area {
      display: flex;
      flex-direction: column;
      gap: 4px;

      & > ul {
        display: flex;
        gap: 4px;

        li .circle {
          width: 16px;
          aspect-ratio: 1;
          border-radius: 50%;

          &.blank {
            background-color: transparent;
            border: 1px solid currentColor;
          }
        }
      }
    }
  }

  .show-answer {
    margin-top: 16px;
    background-color: #eb1c1c;
    color: #fff;
    width: 100%;
    height: 60px;
    border-radius: 20px;
    font-size: 22px;
    font-weight: 500;
  }
}
</style>
