<template>
  <div id="main-page" class="main-container">
    <div class="logo-wrap">
      <img
        class="lisn"
        src="@/assets/images/lisn.svg"
        alt="LISN logo"
        aria-hidden="true"
        @click="handleClearLocalStorage"
      />
    </div>

    <form @submit.prevent="">
      <div class="input-wrap">
        <input id="lisn-input" type="text" v-model="input" name="id" :disabled="isLoggedIn" />
        <label for="lisn-input" class="input-label">이름</label>
      </div>

      <button v-if="!isLoggedIn" class="login-btn" @click="login">로그인</button>
      <button v-else class="login-btn" @click="rejoin">재입장하기</button>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { socket } from "@/socket";
import { clearLocalStorage } from "@/utils/index";

// 변수 정의
const input = ref("");
const isLoggedIn = ref(false);

const router = useRouter();
const store = useStore();

// 함수 정의

// Life Cycle
onMounted(() => {
  isLoggedIn.value = !!localStorage.getItem("userInfo");

  //@NOTE 로그인 후 다시 메인으로 왔을 경우 waiting으로 보낼지 리조인 만들지 수정 필요.
  socket.on("login", (data) => {
    if (data.error === true) {
      alert(data.msg);
    } else {
      setLocalStorage(data.userData);
      store.commit("setUserInfo", data.userData);
    }
  });
});

onBeforeUnmount(() => {
  socket.off("login");
});

const login = () => {
  socket.emit("login", input.value.toUpperCase());
};

const rejoin = () => {
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));

  socket.emit("rejoin", userInfo);
  router.push({ path: "/waiting", state: { isRouter: true } });
};

const setLocalStorage = (userInfoData) => {
  const hasLocalData = localStorage.getItem("userInfo");

  if (!hasLocalData) localStorage.setItem("userInfo", JSON.stringify(userInfoData));

  router.push({ path: "/waiting", state: { isRouter: true } });
};

const handleClearLocalStorage = () => {
  clearLocalStorage();
  window.location.reload();
};
</script>

<style lang="scss" scoped src="@/assets/scss/component/pages/MainPage.scss"></style>
