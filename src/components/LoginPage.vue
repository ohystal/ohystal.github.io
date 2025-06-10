<script setup>
import {firebaseConfig} from "../firebaseConfig";
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { defineEmits } from "vue";

firebase.initializeApp(firebaseConfig);

const emit = defineEmits(["login"]);


const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    // List of OAuth providers supported.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: function (authResult) {
        ui.delete()
      emit('login', {
        userDisplayName: authResult.user.displayName,
        photoUrl: authResult.user.photoURL,
      })
    },
    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById("loader").style.display = "none";
    },
  },
};

var ui = new firebaseui.auth.AuthUI(firebase.auth());

ui.start("#firebaseui-auth-container", uiConfig);
</script>

<template>
  <div class="my-auto">
    <p class="text-sky-800 text-2xl font-bold">Login to continue</p>
    <div id="firebaseui-auth-container"></div>
    <div id="loader" class="flex justify-center items-center h-24">
      <div
        class="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"
      ></div>
    </div>
  </div>
</template>
