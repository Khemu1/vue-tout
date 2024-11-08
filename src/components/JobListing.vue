<script setup>
import { defineProps, ref, computed } from "vue";
/**
 * @type {{job:import("../types/index").Job}}
 */
const { job } = defineProps({
  job: Object,
});

const showMore = ref(false);

const toggleShowMore = () => {
  showMore.value = !showMore.value;
};

const truncatedDesc = computed(() => {
  let desc = job.description;
  if (!showMore.value) {
    desc = desc.substring(0, 90) + "...";
  }
  return desc;
});
</script>

<template>
  <div class="bg-white rounded-xl shadow-md relative">
    <div class="p-4">
      <div class="mb-6">
        <div class="text-gray-600 my-2">{{ job.type }}</div>
        <h3 class="text-xl font-bold">{{ job.title }}</h3>
      </div>

      <div class="mb-5">
        <div>
          {{ truncatedDesc }}
        </div>
        <button
          class="text-green-500 hover:text-green-600 mb-5"
          @click="toggleShowMore"
        >
          {{ showMore ? "Show Less" : "Show More" }}
        </button>
      </div>

      <h3 class="text-green-500 mb-2 font-semibold">{{ job.salary }}</h3>

      <div class="border border-gray-100 mb-5"></div>

      <div class="flex flex-col lg:flex-row justify-between mb-4">
        <div class="text-orange-700 mb-3">
          <i class="pi pi-map-marker text-orange-700"></i>
          {{ job.location }}
        </div>
        <router-link
          :to="`/job/` + job.id"
          class="h-[36px] bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-center text-sm"
        >
          Read More
        </router-link>
      </div>
    </div>
  </div>
</template>
