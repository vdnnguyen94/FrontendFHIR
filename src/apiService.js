import axios from 'axios';

// The base URL of our running backend service.
// This reads from an environment variable, falling back to localhost for development.
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8088';

/**
 * Makes a POST request to our backend's transfer endpoint.
 * @param {string} patientId The ID of the patient to transfer.
 * @returns {Promise<object>} The response data from the backend.
 */
export const transferPatientAPI = async (patientId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/patients/transfer`, {
      patientId: patientId,
    });
    return response.data;
  } catch (error) {
    console.error("API call failed:", error);
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      return { status: 'ERROR', message: 'Network error or server is not responding.' };
    }
  }
};

/**
 * Makes a GET request to our backend's system status endpoint.
 * @returns {Promise<Array>} A list of service statuses.
 */
export const getSystemStatusAPI = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/system-status`);
    return response.data;
  } catch (error) {
    console.error("Status check failed:", error);
    // Return a dummy error state if the backend itself is down
    return [
      { name: 'BackendFHIR Service', url: API_BASE_URL, status: 'UNAVAILABLE' },
      { name: 'Sender FHIR Server (LHSC)', url: 'Unknown', status: 'UNKNOWN' },
      { name: 'Receiver FHIR Server (SJHC)', url: 'Unknown', status: 'UNKNOWN' },
    ];
  }
};
