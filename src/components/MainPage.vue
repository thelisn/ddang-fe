<template>
  <div id="main-page" class="main-container">
    <div class="logo-wrap">
      <img class="lisn" src="@/assets/images/lisn.svg" alt="LISN logo" aria-hidden="true" @click="clearLocalStorage" />
    </div>

    <form @submit.prevent="">
      <div class="input-wrap">
        <input id="lisn-input" type="text" v-model="input" name="id" :disabled="isLoggedIn" />
        <label for="lisn-input" class="input-label">사번 or 이름</label>
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
  router.push("/waiting");
};

// const clearLocalStorage = () => {
//   if (confirm("localstorage 삭제!!")) {
//     localStorage.clear();
//     window.location.reload();
//   }
// };

const setLocalStorage = (data) => {
  let localData = localStorage.getItem("userInfo");

  if (!localData) {
    localStorage.setItem(
      "userInfo",
      JSON.stringify({
        id: data.id,
        name: data.name,
        einumber: data.einumber,
        teamName: data.team,
        isAdmin: data.isAdmin,
      })
    );
  }
  router.push("/waiting");
};
</script>

<style lang="scss" scoped src="@/assets/scss/component/pages/MainPage.scss"></style>
