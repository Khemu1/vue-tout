/**
 * @typedef {import("../types/index").Job} Job
 */

import { ref } from "vue";
import { addJob, deleteJob, getAllJobs, getJob } from "../services/JobServices";

export const useGetJobs = () => {
  /**
   * @type {import("vue").Ref<Job[] | []>}
   */
  const jobs = ref([]);
  const isLoading = ref(false);
  const errorState = ref({ message: undefined });

  const handleGetJobs = async () => {
    isLoading.value = true;
    try {
      const response = await getAllJobs();
      jobs.value = response;
    } catch (error) {
      if (error.message) {
        errorState.value.message = error.message;
      }
    } finally {
      isLoading.value = false;
    }
  };

  return { jobs, isLoading, errorState, handleGetJobs };
};

export const useGetJob = () => {
  /**
   * @type {import("vue").Ref<Job | undefined>}
   */
  const job = ref(null);
  const isLoading = ref(false);
  const errorState = ref({ message: undefined });

  /**
   * Fetches the job by ID and handles state.
   * @param {Number} id - Job ID to fetch.
   */
  const handleGetJob = async (id) => {
    try {
      errorState.value.message = undefined;
      isLoading.value = true;
      const fetchedJob = await getJob(id);
      job.value = fetchedJob;
    } catch (error) {
      errorState.value.message = error.message || "Failed to fetch job data.";
    } finally {
      isLoading.value = false;
    }
  };

  return { job, isLoading, errorState, handleGetJob };
};

export const useAddJob = () => {
  const job = ref(undefined);
  const isLoading = ref(false);
  const errorState = ref({ message: undefined });

  /**
   *
   * @param {import("../types/index").Job} job
   */
  const handleAddJob = async (job) => {
    try {
      errorState.value.message = undefined;
      isLoading.value = true;
      job.value = await addJob(job);
    } catch (error) {
      if (error.message) {
        errorState.message = error.message;
      }
    }
  };
  return { job, isLoading, errorState, handleAddJob };
};

export const useDeleteJob = () => {
  const isLoading = ref(false);
  const errorState = ref({ message: undefined });
  const successState = ref(false);

  /**
   * Deletes the job by ID and handles state.
   * @param {Number} id - Job ID to fetch.
   */
  const handleDeleteJob = async (id) => {
    try {
      errorState.value.message = undefined;
      isLoading.value = true;
      await deleteJob(id);
      successState.value = true;
    } catch (error) {
      errorState.value.message = error.message || "Failed to fetch job data.";
    } finally {
      isLoading.value = false;
    }
  };

  return { isLoading, errorState, handleDeleteJob, successState };
};
