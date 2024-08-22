<template>
  <div class="btn-area">
    <button v-if="!isAdmin && !currentQuestion" class="userBtn waiting" @click="joinQuiz" disabled>대기중</button>
    <button v-if="!isAdmin && currentQuestion" class="userBtn" @click="joinQuiz" :class="getClass()">입장</button>
    <button v-if="isAdmin" class="userBtn" @click="joinAdminQuiz" :class="getClass()">Admin</button>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";
import { getClass } from "@/utils";

const props = defineProps(["currentQuestion", "isAdmin"]);

const emit = defineEmits(["joinQuiz", "joinAdminQuiz"]);

const joinQuiz = () => emit("joinQuiz");
const joinAdminQuiz = () => emit("joinAdminQuiz");
</script>

<style lang="scss" scoped>
.btn-area {
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px 0;
  z-index: 100;
  background-color: #111;

  &::before {
    content: "";
    position: absolute;
    top: -8px;
    left: 0;
    width: 100%;
    height: 20px;
    background: linear-gradient(180deg, rgba(17, 17, 17, 0) 0%, #111 100%);
  }

  .userBtn {
    width: calc(100% - 40px);
    height: 60px;
    color: white;
    border-radius: 20px;
    font-size: 22px;

    &.waiting {
      background-color: #555;
      color: #111;
    }
  }

  .adminBtn {
    width: 100%;
    height: 60px;
    border-radius: 20px;
    font-size: 22px;
    color: white;
  }
}
</style>
