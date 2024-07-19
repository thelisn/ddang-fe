<template>
  <div class="header">
    <h1 class="quiz-header" @click="clearLocalStorage">
      <img class="lisn-header" src="@/assets/images/lisn.svg" alt="" :aria-hidden="true" />
    </h1>
    <div class="user-area">
      <div v-if="isAdmin" class="admin-status">ADMIN</div>
      <div v-else class="user-status" :class="getClass()"></div>
      <p class="user-name">{{ userName }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getClass, clearLocalStorage } from "@/utils/index";

// 변수
const userName = ref(null);
const isAdmin = ref(false);

// Life Cycle
onMounted(() => {
  userName.value = JSON.parse(localStorage.getItem("userInfo")).name;
  isAdmin.value = JSON.parse(localStorage.getItem("userInfo")).isAdmin;
});
</script>

<style lang="scss" scoped src="@/assets/scss/component/LisnHeader.scss"></style>
