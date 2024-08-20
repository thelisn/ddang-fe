<template>
  <ul class="loser-wrap">
    <li class="loser" v-for="(item, idx) in isAliveData" :key="idx">
      <div class="user-status" :class="getClass(item.teamName)"></div>
      <p class="user-name">{{ item.name }}</p>
    </li>
  </ul>
</template>

<script setup>
import { defineProps } from 'vue';
import { getClass } from '@/utils';

const props = defineProps({
  isAliveData: Array,
});
</script>

<style scoped lang="scss">
.loser-wrap {
  display: flex;
  flex-wrap: wrap;
  margin-left: 60px;

  .loser {
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
      color: #fff;
      font-size: 16px;
      font-weight: 500;
    }
  }
}
</style>
