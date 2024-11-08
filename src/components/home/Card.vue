<script setup>
defineProps({
  bg: {
    type: String,
    default: "bg-gray-100",
  },
});
</script>

<template>
  <div :class="`${bg} p-6 rounded-lg shadow-md`">
    <!---
    allows the parent component to insert content into this spot in the child component
    -->
    <slot></slot>
  </div>
</template>
