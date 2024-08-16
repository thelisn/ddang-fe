<template>
  <div id="end-page">
    <LisnHeader />
    <section class="end-container">
      <div class="end-message">
        <h3 class="end-title">결과 발표</h3>
        <p class="end-subtitle">수고하셨습니다!</p>
      </div>
      <template v-if="winnerData">
        <div class="winner-team-box" v-if="teamWinnerData('양재').length > 0">
          <span class="winner-team">양재</span>
          <button class="winner yangjae">
            <span class="winners" v-for="(item, idx) in teamWinnerData('양재')" :key="idx">{{ item.name }}</span>
          </button>
        </div>

        <div class="winner-team-box" v-if="teamWinnerData('스포크').length > 0">
          <span class="winner-team">스포크</span>
          <button class="winner spoke">
            <span class="winners" v-for="(item, idx) in teamWinnerData('스포크')" :key="idx">{{ item.name }}</span>
          </button>
        </div>

        <div class="winner-team-box" v-if="teamWinnerData('디채').length > 0">
          <span class="winner-team">디채</span>
          <button class="winner dichae">
            <span class="winners" v-for="(item, idx) in teamWinnerData('디채')" :key="idx">{{ item.name }}</span>
          </button>
        </div>

        <div class="winner-team-box" v-if="teamWinnerData('모니모').length > 0">
          <span class="winner-team">모니모</span>
          <button class="winner monimo">
            <span class="winners" v-for="(item, idx) in teamWinnerData('모니모')" :key="idx">{{ item.name }}</span>
          </button>
        </div>
      </template>

      <ul class="loser-wrap">
        <li class="loser" v-for="(item, idx) in isAliveData" :key="idx">
          <div class="user-status" :class="getClass(item.teamName)"></div>
          <p class="user-name">{{ item.name }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import router from "@/router";
import { onBeforeUnmount, onMounted, ref, getCurrentInstance } from "vue";
import { getClass } from "@/utils";
import axios from "axios";
import LisnHeader from "@/components/LisnHeader.vue";
import { socket } from "@/socket";

export default {
  name: "QuizPage",
  components: {
    LisnHeader,
  },
  setup() {
    // 변수
    const isAliveData = ref(null);
    const winnerData = ref(null);
    const userData = ref(null);
    const isData = ref(false);
    const instance = getCurrentInstance();

    // 함수
    const updatePage = async () => {
      await axios.get("/api/admin").then((res) => {
        isAliveData.value = res.data.userData.filter((item) => item.isAlive === false);
        winnerData.value = res.data.userData.filter((item) => item.isAlive === true);
        instance?.proxy?.$forceUpdate();
      });
    };

    const teamWinnerData = (teamName) => {
      return winnerData.value.filter((item) => item.teamName === teamName);
    };

    // Life Cycle
    onMounted(() => {
      socket.on("show-end-winner", (data) => {
        userData.value = data.userData;
        isAliveData.value = data.userData.filter((item) => item.isAlive === false);
        winnerData.value = data.userData.filter((item) => item.isAlive === true);
        isData.value = true;
      });

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

    return {
      getClass,
      isAliveData,
      winnerData,
      teamWinnerData,
      userData,
    };
  },
};
</script>
<style scoped lang="scss" src="@/assets/scss/component/pages/EndPage.scss"></style>
