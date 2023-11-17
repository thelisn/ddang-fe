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

<script>
import router from "@/router";
import { getClass } from "@/utils/index"
import { computed, onMounted, ref } from "vue";

export default {
  name: "LisnHeader",
  setup() {
    // 변수
    const userName = ref(null);
    const isAdmin = ref(false);

    // 함수
    const clearLocalStorage = () => {
      if (confirm('localstorage 삭제!!')) {
        localStorage.clear();
        router.push('/');
      }
    }

    // Life Cycle
    onMounted(() => {
      userName.value = JSON.parse(localStorage.getItem('userInfo')).name;
      isAdmin.value = JSON.parse(localStorage.getItem('userInfo')).isAdmin;
    });


    return {
      userName,
      getClass,
      isAdmin,
      clearLocalStorage
    }
  },
}
</script>

<style lang="scss" scoped src="@/assets/scss/component/LisnHeader.scss">
</style>