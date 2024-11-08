<script setup>
import { onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDeleteJob, useGetJob } from "../hooks/Jobs";
import { VueSpinnerPulse, VueSpinnerBars } from "vue3-spinners";
import { useToast } from "vue-toast-notification";

const route = useRoute();
const router = useRouter();
const { id } = route.params;

const { isLoading, errorState, handleGetJob, job } = useGetJob();
const {
  isLoading: isLoadingDelete,
  errorState: errorStateDelete,
  successState,
  handleDeleteJob,
} = useDeleteJob();

const toast = useToast();

watch(
  () => errorStateDelete.message,
  (newMessage) => {
    if (newMessage) {
      toast.error("Failed to delete job", {
        position: "top-right",
      });
    }
  }
);

watch(successState, (newState) => {
  if (newState) {
    toast.success("Job Deleted Successfully", {
      position: "top-right",
    });
    setTimeout(() => {
      router.push({ name: "Jobs" });
    }, 1000);
  }
});

onMounted(async () => {
  if (isNaN(Number(id))) {
    router.push({ name: "NotFound" });
    return;
  }
  console.log("called ", id);
  await handleGetJob(id);

  if (!job.value) {
    router.push({ name: "NotFound" });
  }
});
</script>

<template>
  <section class="bg-green-50">
    <div class="container m-auto py-10 px-6">
      <div
        class="grid w-full gap-6"
        :class="[
          isLoading || errorState ? '' : 'grid-cols-1 md:grid-cols-70/30',
        ]"
      >
        <main v-if="!isLoading && !errorState.message">
          <div
            class="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
          >
            <div class="text-gray-500 mb-4">{{ job?.type }}</div>
            <h1 class="text-3xl font-bold mb-4">{{ job?.title }}</h1>
            <div
              class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
            >
              <i class="pi pi-map-marker text-lg text-orange-700 mr-2"></i>
              <p class="text-orange-700">{{ job?.location }}</p>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-green-800 text-lg font-bold mb-6">
              Job Description
            </h3>
            <p class="mb-4">{{ job?.description }}</p>
            <h3 class="text-green-800 text-lg font-bold mb-2">Salary</h3>
            <p class="mb-4 font-semibold">{{ job?.salary }}</p>
          </div>
        </main>

        <div v-if="isLoading" class="m-auto text-center text-gray-600 py-6">
          <VueSpinnerPulse color="green" />
        </div>

        <aside v-if="!isLoading && !errorState.message">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-6">Company Info</h3>
            <h2 class="text-2xl">{{ job?.company?.name }}</h2>
            <p class="my-2">{{ job?.company?.description }}</p>
            <hr class="my-4" />
            <h3 class="text-xl">Contact Email:</h3>
            <p
              class="block text-ellipsis overflow-hidden my-2 bg-green-100 p-2 font-bold"
            >
              {{ job?.company?.contactEmail }}
            </p>
            <h3 class="text-xl">Contact Phone:</h3>
            <p class="my-2 bg-green-100 p-2 font-bold">
              {{ job?.company?.contactPhone }}
            </p>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-xl font-bold mb-6">Manage Job</h3>
            <button
              class="flex justify-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4"
              @click="handleDeleteJob(id)"
            >
              <span v-if="isLoadingDelete">
                <VueSpinnerBars color="white" />
              </span>
              <span v-else> Delete </span>
            </button>
          </div>
        </aside>

        <div
          v-if="errorState.message"
          class="text-center font-semibold text-red-500"
        >
          {{ errorState.message }}
        </div>
      </div>
    </div>
  </section>
</template>
