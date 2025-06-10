<script setup>
import Header from "./components/Header.vue";
import Board from "./components/Board.vue";
import LoginPage from "./components/LoginPage.vue";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ref } from "vue";

const isLoggedIn = ref(null);
const userName = ref(null);
const userPhotoUrl = ref(null);
const project = ref('jj6j6j6j6');

const changeProject = ({currentProject}) => {
  project.value = currentProject
}

const handleLogOut = () => {
  signOut(auth);
  isLoggedIn.value = false;
  window.location.reload()
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    isLoggedIn.value = true;
    userPhotoUrl.value = user.photoURL;
    userName.value = user.displayName;
  } else {
    isLoggedIn.value = false;
  }
});

const handleLogin = () => {
  isLoggedIn.value = true;
};
</script>

<template>
  <div class="flex flex-col h-full">
    <LoginPage v-if="!isLoggedIn" @login="handleLogin" />
    <template v-else>
      <Header
        :userPhoto="userPhotoUrl"
        :userDisplayName="userName"
        @logout="handleLogOut"
        @chooseProject="changeProject"
      />
      <Board :project="project"/>
    </template>
  </div>
</template>
