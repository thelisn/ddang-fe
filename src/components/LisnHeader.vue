<template>
  <div class="header">
    <h1 class="quiz-header">
      <img class="lisn-header" src="@/assets/images/lisn.svg" alt="LISN logo" aria-hidden="true" />
    </h1>
    <div class="user-area">
      <div class="user-status" :class="getClass()"></div>
      <p class="user-name">{{ userName }}</p>
    </div>
  </div>
</template>

<script>
import { getClass } from "@/utils/index"
import { computed, onMounted, ref } from "vue";

export default {
  name: "LisnHeader",
  setup() {
    // 변수
    const userName = ref(null);

    // 함수
    

    // Life Cycle
    onMounted(() => {
      userName.value = JSON.parse(localStorage.getItem('userInfo')).name;
    });


    return {
      userName,
      getClass
    }
  },
}
</script>

<style lang="scss" scoped src="@/assets/scss/component/LisnHeader.scss">
</style>