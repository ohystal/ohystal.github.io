<script setup>
import { db } from "../firebaseConfig";
import { motion } from "motion-v";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { reactive, ref } from "vue";
import Task from "./Task.vue";

const props = defineProps({
  project: String,
});

const projects = reactive([]);
const draggedItem = ref(null);
const sourceColumn = ref("");

const getTasks = async (project) => {
  const docRef = doc(db, "projects", project);
  
  onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      projects.splice(0, projects.length);
      
      projects.push({
        id: docSnap.id,
        ...docSnap.data(),
      });
    }
  });
};

getTasks(props.project);

const handleDragStart = (item, column) => {
  draggedItem.value = item;
  sourceColumn.value = column;
};

const handleDragEnd = async (targetColumn) => {
  if (!draggedItem.value || sourceColumn.value === targetColumn) return;

  const sourceIndex = projects[0][sourceColumn.value].findIndex(
    (task) => task.id === draggedItem.value.id
  );
  projects[0][sourceColumn.value].splice(sourceIndex, 1);

  projects[0][targetColumn].push(draggedItem.value);

  await updateDoc(doc(db, "projects", props.project), {
    [sourceColumn.value]: projects[0][sourceColumn.value],
    [targetColumn]: projects[0][targetColumn],
  });

  draggedItem.value = null;
  sourceColumn.value = "";
};
</script>

<template>
  <div class="flex h-full mx-[2rem] justify-around gap-2 mt-[30px]">

    <div
      class="h-full border-4 border-indigo-500/50 w-[25%] bg-white/50 rounded-2xl px-4"
      @drop="handleDragEnd('todo')"
      @dragover.prevent
    >
      <h2 class="text-black/30 uppercase text-2xl font-extrabold mb-[10px]">
        Todo
      </h2>
      <ul class="flex flex-col gap-2">
        <li
          v-for="item in projects[0]?.todo"
          :key="item.id"
          draggable="true"
          @dragstart="handleDragStart(item, 'todo')"
        >
          <motion.div
            :drag="true"
            :dragConstraints="{ top: 0, left: 0, right: 0, bottom: 0 }"
          >
            <Task :title="item.title" :description="item.description"/>
          </motion.div>
        </li>
      </ul>
    </div>

    <div
      class="h-full border-4 border-indigo-500/50 w-[25%] bg-white/50 rounded-2xl px-4"
      @drop="handleDragEnd('inprogress')"
      @dragover.prevent
    >
      <h2 class="text-black/30 uppercase text-2xl font-extrabold mb-[10px]">
        In progress
      </h2>
      <ul class="flex flex-col gap-2">
        <li
          v-for="item in projects[0]?.inprogress"
          :key="item.id"
          draggable="true"
          @dragstart="handleDragStart(item, 'inprogress')"
        >
          <motion.div
            :drag="true"
            :dragConstraints="{ top: 0, left: 0, right: 0, bottom: 0 }"
          >
            <Task :title="item.title" :description="item.description" />
          </motion.div>
        </li>
      </ul>
    </div>

    <div
      class="h-full border-4 border-indigo-500/50 w-[25%] bg-white/50 rounded-2xl px-4"
      @drop="handleDragEnd('review')"
      @dragover.prevent
    >
      <h2 class="text-black/30 uppercase text-2xl font-extrabold mb-[10px]">
        Review
      </h2>
      <ul class="flex flex-col gap-2">
        <li
          v-for="item in projects[0]?.review"
          :key="item.id"
          draggable="true"
          @dragstart="handleDragStart(item, 'review')"
        >
          <motion.div
            :drag="true"
            :dragConstraints="{ top: 0, left: 0, right: 0, bottom: 0 }"
          >
            <Task :title="item.title" :description="item.description" />
          </motion.div>
        </li>
      </ul>
    </div>

    <div
      class="h-full border-4 border-indigo-500/50 w-[25%] bg-white/50 rounded-2xl px-4"
      @drop="handleDragEnd('complete')"
      @dragover.prevent
    >
      <h2 class="text-black/30 uppercase text-2xl font-extrabold mb-[10px]">
        Completed
      </h2>
      <ul class="flex flex-col gap-2">
        <li
          v-for="item in projects[0]?.complete"
          :key="item.id"
          draggable="true"
          @dragstart="handleDragStart(item, 'complete')"
        >
          <motion.div
            :drag="true"
            :dragConstraints="{ top: 0, left: 0, right: 0, bottom: 0 }"
          >
            <Task :title="item.title" :description="item.description" />
          </motion.div>
        </li>
      </ul>
    </div>
  </div>
</template>