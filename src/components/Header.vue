<script setup>
import { defineProps, ref, defineEmits, reactive } from "vue";
import Popup from "./Popup.vue";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const isPopupOpen = ref(false);
const isTask = ref(false);
const currentProject = ref(null);

const props = defineProps({
  userPhoto: String,
  userDisplayName: String,
});

const emit = defineEmits(["logout", "chooseProject"]);

const logOut = () => {
  emit("logout");
};

const openPopup = () => {
  isPopupOpen.value = true;
};

const closePopup = () => {
  isPopupOpen.value = false;
  isTask.value = false;
};

const addTask = () => {
  openPopup();
  isTask.value = true;
};

const projects = reactive([]);

const getProjects = async () => {
  const querySnapshot = await getDocs(collection(db, "projects"));
  querySnapshot.forEach((doc) => {
    projects.push(doc.id);
  });

  if (projects.length > 0) {
    currentProject.value = projects[0];
  }
};

getProjects();

const submitTask = async (newTask) => {
  await updateDoc(doc(db, "projects", currentProject.value), {
    todo: arrayUnion(newTask),
  });
};

const submitProject = async (newProject) => {
  await setDoc(doc(db, "projects", newProject), {
    todo: [],
    inprogress: [],
    review: [],
    complete: [],
  });
};

const chooseProject = () => {
  emit("chooseProject", { currentProject: currentProject.value });
};
</script>

<template>
  <header
    class="bg-violet-400/50 h-[60px] flex justify-between p-[20px] items-center"
  >
    <div class="flex items-center gap-2">
      <select
        class="w-64 px-4 py-3 text-gray-700 bg-gray-50 rounded-lg border-2 border-purple-600 shadow-md cursor-pointer transition-all duration-300 ease-in-out appearance-none hover:border-purple-700 hover:shadow-lg focus:border-purple-700 focus:ring-3 focus:ring-purple-200 focus:outline-none"
        name="project"
        id="project"
        v-model="currentProject"
        @change="chooseProject"
      >
        <option v-for="project in projects" :value="project" :key="project">
          {{ project }}
        </option>
      </select>

      <button class="bg-teal-700" @click="openPopup">Add Project</button>
      <button class="bg-teal-700" @click="addTask">Add Task</button>
    </div>

    <Popup
      :isPopupOpen="isPopupOpen"
      @close="closePopup"
      :isTask="isTask"
      @submitTask="submitTask"
      @submitProject="submitProject"
    />

    <div class="flex gap-2 items-center">
      <img
        class="rounded-full"
        :src="props.userPhoto"
        alt="Аватар пользователя"
        width="30"
        height="30"
      />
      <span class="text-black text-xl">{{ props.userDisplayName }}</span>
      <button @click="logOut">Logout</button>
    </div>
  </header>
</template>
