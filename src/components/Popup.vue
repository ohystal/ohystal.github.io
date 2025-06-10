<script setup>
import { defineProps, defineEmits, ref } from "vue";

const props = defineProps({
  isTask: Boolean,
  isPopupOpen: Boolean,
});

const emit = defineEmits(["close", "submitTask", "submitProject"]);

const taskTitle = ref("");
const taskDescription = ref("");
const project = ref("");

const handleClose = () => {
  emit("close");
};

const submitTask = () => {
  emit("submitTask", {
    id: Date.now(),
    title: taskTitle.value,
    description: taskDescription.value,
  });
  taskDescription.value = "";
  taskTitle.value = "";
};

const submitProject = () => {
  emit("submitProject", project.value);
  project.value = "";
};
</script>

<template>
  <div
    v-if="isPopupOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
  >
    <div
      class="bg-slate-300/80 rounded-lg shadow-xl w-full max-w-md overflow-hidden"
    >
      <div class="p-6">
        <h3
          v-if="props.isTask"
          class="text-xl font-semibold text-gray-800 mb-4"
        >
          Add new task
        </h3>

        <h3 v-else class="text-xl font-semibold text-gray-800 mb-4">
          Add new project
        </h3>

        <form v-if="props.isTask" @submit.prevent="submitTask">
          <div class="mb-4">
            <label
              for="task-title"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Task</label
            >
            <input
              id="task-title"
              type="text"
              v-model="taskTitle"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task name"
              required
            />
          </div>

          <div class="mb-6">
            <label
              for="task-description"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Description</label
            >
            <textarea
              id="task-description"
              v-model="taskDescription"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task description"
            ></textarea>
          </div>

          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="handleClose"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"
            >
              Save
            </button>
          </div>
        </form>

        <form v-else @submit.prevent="submitProject">
          <div class="mb-4">
            <label
              for="task-title"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Project</label
            >
            <input
              id="task-title"
              type="text"
              v-model="project"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter project name"
              required
            />
          </div>

          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="handleClose"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
