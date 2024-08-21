import { reactive } from 'vue';
import { io } from 'socket.io-client';

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
const URL = process.env.VUE_APP_API_URL;
// const URL = "https://port-0-ddang-api-lzqe79pmd8a5a76c.sel4.cloudtype.app";

export const socket = io(URL);

socket.on('connect', () => {
  state.connected = true;
});

socket.on('disconnect', () => {
  state.connected = false;
});

socket.on('login-error', () => {
  state.loginError = true;
});

socket.on('login-success', (data) => {
  state.loginError = false;
  state.userName = data.id;

  if (data.userType === 'admin') {
    state.isAdmin = true;
  } else {
    state.isUser = true;
  }
});
