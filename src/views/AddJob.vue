<script setup>
import { useAddJob } from "../hooks/Jobs";
import { reactive, toRaw, watch } from "vue";
import { useRouter } from "vue-router";
import { VueSpinnerBars } from "vue3-spinners";
import { useToast } from "vue-toast-notification";

const router = useRouter();
const { isLoading, errorState, handleAddJob, isSuccess } = useAddJob();

const data = reactive({
  title: "",
  type: "Full-Time",
  description: "",
  location: "",
  salary: "Under $50K",
  company: {
    name: "",
    description: "",
    contactEmail: "",
    contactPhone: "",
  },
});
const toast = useToast();

/**
 * @param {Event} e - The form submit event.
 */
const handleSubmit = async (e) => {
  e.preventDefault();
  const jobData = toRaw(data);
  console.log("Job Data", jobData);

  try {
    await handleAddJob(jobData);
  } catch (error) {
    console.error("Failed to add job", error);
  }
};

watch(isSuccess, (newValue) => {
  if (newValue) {
    toast.success("Job Added Successfully", {
      position: "top-right",
    });
    setTimeout(() => {
      router.push({ name: "Jobs" });
    }, 2000);
  }
});

watch(errorState, (newValue) => {
  if (newValue.message) {
    toast.error("Failed to add job", {
      position: "top-right",
    });
  }
});
</script>

<template>
  <section class="bg-green-50">
    <div class="container m-auto max-w-2xl py-24">
      <div
        class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
      >
        <form @submit="handleSubmit">
          <h2 class="text-3xl text-center font-semibold mb-6">Add Job</h2>

          <div class="mb-4">
            <label for="type" class="block text-gray-700 font-bold mb-2"
              >Job Type</label
            >
            <select
              v-model="data.type"
              id="type"
              name="type"
              class="border rounded w-full py-2 px-3"
              required
            >
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Remote">Remote</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div class="mb-4">
            <label for="title" class="block text-gray-700 font-bold mb-2"
              >Job Listing Name</label
            >
            <input
              v-model="data.title"
              type="text"
              id="title"
              name="title"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="eg. Vue Native Developer"
              required
            />
          </div>

          <div class="mb-4">
            <label for="description" class="block text-gray-700 font-bold mb-2"
              >Description</label
            >
            <textarea
              v-model="data.description"
              id="description"
              name="description"
              class="border rounded w-full py-2 px-3"
              rows="4"
              placeholder="Add any job duties, expectations, requirements, etc"
            ></textarea>
          </div>

          <div class="mb-4">
            <label for="salary" class="block text-gray-700 font-bold mb-2"
              >Salary</label
            >
            <select
              v-model="data.salary"
              id="salary"
              name="salary"
              class="border rounded w-full py-2 px-3"
              required
            >
              <option value="Under $50K">under $50K</option>
              <option value="$50K - $60K">$50 - $60K</option>
              <option value="$60K - $70K">$60 - $70K</option>
              <option value="$70K - $80K">$70 - $80K</option>
              <option value="$80K - $90K">$80 - $90K</option>
              <option value="$90K - $100K">$90 - $100K</option>
              <option value="$100K - $125K">$100 - $125K</option>
              <option value="$125K - $150K">$125 - $150K</option>
              <option value="$150K - $175K">$150 - $175K</option>
              <option value="$175K - $200K">$175 - $200K</option>
              <option value="Over $200K">Over $200K</option>
            </select>
          </div>

          <div class="mb-4">
            <label for="location" class="block text-gray-700 font-bold mb-2"
              >Location</label
            >
            <input
              v-model="data.location"
              type="text"
              id="location"
              name="location"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Company Location"
              required
            />
          </div>

          <h3 class="text-2xl mb-5">Company Info</h3>

          <div class="mb-4">
            <label for="company_name" class="block text-gray-700 font-bold mb-2"
              >Company Name</label
            >
            <input
              v-model="data.company.name"
              type="text"
              id="company_name"
              name="company_name"
              class="border rounded w-full py-2 px-3"
              placeholder="Company Name"
            />
          </div>

          <div class="mb-4">
            <label
              for="company_description"
              class="block text-gray-700 font-bold mb-2"
              >Company Description</label
            >
            <textarea
              v-model="data.company.description"
              id="company_description"
              name="company_description"
              class="border rounded w-full py-2 px-3"
              rows="4"
              placeholder="What does your company do?"
            ></textarea>
          </div>

          <div class="mb-4">
            <label
              for="contact_email"
              class="block text-gray-700 font-bold mb-2"
              >Contact Email</label
            >
            <input
              v-model="data.company.contactEmail"
              type="email"
              id="contact_email"
              name="contact_email"
              class="border rounded w-full py-2 px-3"
              placeholder="Email address for applicants"
              required
            />
          </div>

          <div class="mb-4">
            <label
              for="contact_phone"
              class="block text-gray-700 font-bold mb-2"
              >Contact Phone</label
            >
            <input
              v-model="data.company.contactPhone"
              type="tel"
              id="contact_phone"
              name="contact_phone"
              class="border rounded w-full py-2 px-3"
              placeholder="Optional phone for applicants"
            />
          </div>

          <div>
            <button
              class="flex justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
              :disabled="isSuccess && !isLoading"
            >
              <span v-if="isLoading" class="spinner"><VueSpinnerBars /></span>
              <span v-else>Add Job</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
