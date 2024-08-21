<template>
  <div class="btn-container">
    <button class="finish-btn" @click="handleClick">
      {{ isEnd ? "재시작" : "종료" }}
    </button>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";

const props = defineProps({
  isEnd: {
    type: Boolean,
    required: true,
  },
});

const emits = defineEmits(["finish", "restart"]);

const handleClick = () => {
  if (props.isEnd) {
    emits("restart");
  } else {
    emits("finish");
  }
};
</script>

<style lang="scss" scoped>
.btn-container {
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #111;
  padding: 20px;

  .finish-btn {
    font-family: "Noto Sans KR";
    color: #fff;
    font-size: 22px;
    font-weight: 500;
    width: 100%;
    height: 60px;
    border-radius: 20px;
    background-color: #eb1c1c;
    cursor: pointer;
  }
}
</style>
