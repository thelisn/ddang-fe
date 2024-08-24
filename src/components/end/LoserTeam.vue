<template>
  <ul class="loser-wrap">
    <li class="loser" v-for="(item, idx) in isAliveData" :key="idx">
      <div class="user-status" :class="getClass(item.teamName)"></div>
      <p class="user-name">{{ item.name }}</p>
    </li>
  </ul>
</template>

<script setup>
import { defineProps } from "vue";
import { getClass } from "@/utils";

const props = defineProps({
  isAliveData: Array,
});
</script>

<style scoped lang="scss">
.loser-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 22px 12px;
  margin-left: 60px;
  padding-inline: 30px 20px;

  .loser {
    display: flex;
    align-items: center;
    gap: 9px;

    .user-status {
      width: 16px;
      height: 16px;
      border-radius: 50%;
    }

    .user-name {
      font-size: 16px;
      font-weight: 500;
      color: #fff;
    }
  }
}
</style>
