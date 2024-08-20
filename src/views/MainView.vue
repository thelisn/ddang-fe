<template>
  <div id="main-page" class="main-container">
    <TheHeading />
    <AuthForm />
  </div>
</template>

<script setup>
import TheHeading from '@/components/main/TheHeading.vue';
import AuthForm from '@/components/main/AuthForm.vue';
</script>

<style scoped lang="scss">
.main-container {
  position: relative;
  background-color: #111;
  height: 100vh;
}
</style>
