/**
 * Fetches a job by ID from the JSON server.
 *
 * @param {number} id - The ID of the job to retrieve.
 * @returns {Promise<import("../types/index").Job | undefined>} - The job with the specified ID, or undefined if not found.
 * @throws {Error} - Throws an error if there is a network issue or if the response is not successful.
 */
const getAllJobs = async () => {
  try {
    const response = await fetch(`/api/jobs`, {
      method: "GET",
    });

    if (!response.ok) {
      /**
       * @type {import("../types/index").ErrorRepsonse}
       */
      const errorResponse = await response.json();
      let errorMessage = "Unexpected Error Occurred: ";
      errorMessage = errorResponse.message ?? errorMessage;
      errorResponse.message = errorMessage;
    }
    /**
     * @type {import("../types/index").Job[]}
     */
    return await response.json();
  } catch (error) {
    console.error(error);
    const errorMessage = { message: "Network Error ", code: 500 };
    throw errorMessage;
  }
};

/**
 * Fetches a job by ID from the JSON server.
 *
 * @param {number} id - The ID of the job to retrieve.
 * @returns {Promise<import("../types/index").Job | undefined>} - The job with the specified ID, or undefined if not found.
 * @throws {Error} - Throws an error if there is a network issue or if the response is not successful.
 */
const getJob = async (id) => {
  try {
    const response = await fetch(`/api/jobs/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      /**
       * @type {import("../types/index").ErrorRepsonse}
       */
      const errorResponse = await response.json();
      let errorMessage = "Unexpected Error Occurred: ";
      errorMessage = errorResponse.message ?? errorMessage;
      errorResponse.message = errorMessage;
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    const errorMessage = { message: "Network Error ", code: 500 };
    throw errorMessage;
  }
};

/**
 *
 * @param {import("../types/index").Job} job
 */
const addJob = async (job) => {
  try {
    const response = await fetch(`/api/jobs`, {
      method: "POST",
      body: JSON.stringify(job),
    });
    console.log("cyka", response.json());
    if (!response.ok) {
      /**
       * @type {import("../types/index").ErrorRepsonse}
       */
      const errorResponse = await response.json();
      let errorMessage = "Unexpected Error Occurred: ";
      errorMessage = errorResponse.message ?? errorMessage;
      errorResponse.message = errorMessage;
    }
    /**
     * @type {import("../types/index").Job}
     */
    return job;
  } catch (error) {
    console.error(error);
    const errorMessage = { message: "Network Error ", code: 500 };
    throw errorMessage;
  }
};

/**
 * Delete a job by ID from the JSON server.
 *
 * @param {number} id - The ID of the job to retrieve.
 * @returns {Promise<boolean>}
 * @throws {Error} - Throws an error if there is a network issue or if the response is not successful.
 */
const deleteJob = async (id) => {
  try {
    const response = await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      /**
       * @type {import("../types/index").ErrorRepsonse}
       */
      const errorResponse = await response.json();
      let errorMessage = "Unexpected Error Occurred: ";
      errorMessage = errorResponse.message ?? errorMessage;
      errorResponse.message = errorMessage;
    }
    return true;
  } catch (error) {
    console.error(error);
    const errorMessage = { message: "Network Error ", code: 500 };
    throw errorMessage;
  }
};

export { addJob, getAllJobs, getJob, deleteJob };
