<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    title: String,
    description: String,
})

</script>

<template>
  <div class="bg-black/60 p-2 rounded-xl">
    <p class="truncate mb-[10px] uppercase text-2xl font-extrabold">
      {{ title }}
    </p>
    <p class="truncate font-bold text-lg">{{ description }}</p>
  </div>
</template>
