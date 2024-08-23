<template>
  <div class="logo-wrap">
    <img class="lisn" src="@/assets/images/lisn.svg" alt="LISN logo" aria-hidden="true" @click="clearLocalStorage" />
  </div>
</template>

<script setup>
const clearLocalStorage = () => {
  if (confirm("localstorage 삭제!!")) {
    localStorage.clear();
    window.location.reload();
  }
};
</script>

<style lang="scss" scoped>
.logo-wrap {
  display: flex;
  justify-content: center;
  padding-top: 120px;

  .lisn {
    width: 100px;
  }
}
</style>
