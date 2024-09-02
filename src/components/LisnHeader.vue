<template>
  <div class="header">
    <h1 class="quiz-header" @click="clearLocalStorage">
      <img class="lisn-header" src="@/assets/images/lisn.svg" alt="LISN logo" aria-hidden="true" />
    </h1>
    <div class="user-area">
      <div v-if="isAdmin" class="admin-status">ADMIN</div>
      <div v-else class="user-status" :class="getClass()"></div>
      <p class="user-name">{{ userName }}</p>
    </div>
  </div>
</template>

<script setup>
import { getClass, clearLocalStorage } from "@/utils/index";
import { onMounted, ref } from "vue";

// 변수
const userName = ref(null);
const isAdmin = ref(false);

// 함수

// Life Cycle
onMounted(() => {
  userName.value = JSON.parse(localStorage.getItem("userInfo")).name;
  isAdmin.value = JSON.parse(localStorage.getItem("userInfo")).isAdmin;
});
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  background-color: #111;
  padding: 20px 20px 13px;
  z-index: 1000;

  .quiz-header {
    .lisn-header {
      height: 24px;
    }
  }

  .user-area {
    display: flex;
    align-items: center;
    color: #fff;

    .user-status {
      margin-right: 9px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
    }

    .admin-status {
      padding: 2px 6px 3px;
      background-color: #eb1c1c;
      border-radius: 20px;
      color: #111;
      font-weight: 500;
      font-size: 13px;
      margin-right: 9px;
    }

    .user-name {
      font-size: 22px;
      font-weight: 500;
      padding-bottom: 2px;
    }
  }
}
</style>
