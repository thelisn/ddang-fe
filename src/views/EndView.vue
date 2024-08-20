<template>
  <div id="end-page">
    <LisnHeader />
    <EndMessage />
    <WinnerTeam :winnerData="winnerData" />
    <LoserTeam :isAliveData="isAliveData" />
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue';
import axios from 'axios';
import { socket } from '@/socket';
import LisnHeader from '@/components/LisnHeader.vue';
import EndMessage from '@/components/end/EndMessage.vue';
import WinnerTeam from '@/components/end/WinnerTeam.vue';
import LoserTeam from '@/components/end/LoserTeam.vue';

const isAliveData = ref(null);
const winnerData = ref(null);
const isData = ref(false);

const updatePage = async () => {
  const res = await axios.get('/api/admin');
  isAliveData.value = res.data.userData.filter(
    (item) => item.isAlive === false
  );
  winnerData.value = res.data.userData.filter((item) => item.isAlive === true);
};

onMounted(() => {
  socket.on('show-end-winner', (data) => {
    isAliveData.value = data.userData.filter((item) => item.isAlive === false);
    winnerData.value = data.userData.filter((item) => item.isAlive === true);
    isData.value = true;
  });

  setTimeout(async () => {
    if (!isData.value) updatePage();
  }, 500);
});

onBeforeUnmount(() => {
  socket.off('show-end-winner');
});
</script>

<style scoped lang="scss">
#end-page {
  background-color: #111;
  padding: 10px 20px 0;
  min-height: 100vh;
}
</style>
