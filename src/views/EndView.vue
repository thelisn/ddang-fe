<template>
  <LisnHeader />

  <div id="end-page">
    <EndMessage />
    <WinnerTeam :winnerData="winnerData" />
    <LoserTeam :isAliveData="isAliveData" />
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount, getCurrentInstance } from "vue";
import { socket } from "@/socket";
import router from "@/router";
import axios from "axios";

import LisnHeader from "@/components/LisnHeader.vue";
import EndMessage from "@/components/end/EndMessage.vue";
import WinnerTeam from "@/components/end/WinnerTeam.vue";
import LoserTeam from "@/components/end/LoserTeam.vue";

const isAliveData = ref(null);
const winnerData = ref(null);
const isData = ref(false);
const instance = getCurrentInstance();

const updatePage = async () => {
  await axios.get("/api/admin").then((res) => {
    isAliveData.value = res.data.userData.filter((item) => item.isAlive === "dead");
    winnerData.value = res.data.userData.filter((item) => item.isAlive === null);
    instance?.proxy?.$forceUpdate();
  });
};

onMounted(() => {
  if (history.state?.userData) {
    isAliveData.value = history.state.userData.filter((item) => item.isAlive === "dead");
    winnerData.value = history.state.userData.filter((item) => item.isAlive === null);
    isData.value = true;
  }

  socket.on("re-start-quiz", () => {
    router.push({ path: "/waiting", state: { isRouter: true } });
  });

  // 새로고침 시 실행
  setTimeout(async () => {
    if (!isData.value) {
      updatePage();
    }
  }, 500);
});

onBeforeUnmount(() => {
  socket.off("show-end-winner");
  socket.off("re-start-quiz");
});
</script>

<style scoped lang="scss">
#end-page {
  min-height: calc(100dvh - 62px);
  background-color: #111;
}
</style>
