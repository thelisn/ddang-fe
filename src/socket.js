import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
  loginError: false,
  isUser: false,
  userName: null,
  isAdmin: false,
  fooEvents: [],
  barEvents: [],
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = "http://localhost:3100";

export const socket = io(URL);

socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = true;
});

socket.on("login-error", () => {
  state.loginError = true;
});

socket.on("login-success", (data) => {
  state.loginError = false;
  state.userName = data.id;

  if (data.name === "admin") {
    state.isAdmin = true;
  } else {
    state.isUser = true;
  }
});
