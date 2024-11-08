<script setup>
import { onMounted, computed } from "vue";
import JobListing from "./JobListing.vue";
import { useGetJobs } from "../hooks/Jobs";
import { VueSpinnerPulse } from "vue3-spinners";

const props = defineProps({
  limit: Number,
  showButton: {
    type: Boolean,
    default: false,
  },
});

const { isLoading, errorState, jobs, handleGetJobs } = useGetJobs();

onMounted(() => {
  handleGetJobs();
});
</script>

<template>
  <section class="bg-blue-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
        Browse Jobs
      </h2>

      <div v-if="isLoading" class="m-auto text-center text-gray-600 py-6">
        <VueSpinnerPulse color="green" />
      </div>

      <div v-else-if="errorState.message" class="text-center text-red-500">
        {{ errorState.message }}
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <template v-if="jobs.length !== 0">
          <JobListing
            v-for="job in jobs.slice(0, props.limit || jobs.length)"
            :key="job.id"
            :job="job"
          />
        </template>
        <template v-else>
          <div class="mx-auto text-3xl font-semibold text-green-600">
            No Jobs Found
          </div>
        </template>
      </div>
    </div>
  </section>

  <section v-if="props.showButton" class="m-auto max-w-lg my-10 px-6">
    <router-link
      to="/jobs"
      class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
    >
      View All Jobs
    </router-link>
  </section>
</template>
