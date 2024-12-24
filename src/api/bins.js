import apiClient from './http'; // Import the configured Axios instance

// Function to fetch bin data by ID
export const fetchBinDataApi = async (id) => {
    try {
        const { data } = await apiClient.get(`/bins/${id}`);
        return data;
    } catch (error) {
        console.error("Error fetching bin data:", error.response ? error.response.data : error.message);
        throw error;
    }
};

// Function to update bin data by ID
export const updateBinDataApi = async (id, binData) => {
    try {
        const { data } = await apiClient.put(`/bins/${id}`, binData);
        return data;
    } catch (error) {
        console.error("Error updating bin data:", error.response ? error.response.data : error.message);
        throw error;
    }
};

// Function to delete a bin by ID
export const deleteBinApi = async (id) => {
    try {
        const { data } = await apiClient.delete(`/bins/${id}`);
        return data;
    } catch (error) {
        console.error("Error deleting bin:", error.response ? error.response.data : error.message);
        throw error;
    }
};

// Function to fetch all bins
export const fetchAllBinsApi = async () => {
    try {
        const { data } = await apiClient.get('/bins');
        return data;
    } catch (error) {
        console.error("Error fetching all bins:", error.response ? error.response.data : error.message);
        throw error;
    }
};

// Function to create a new bin
export const createBinApi = async (binData) => {
    try {
        const { data } = await apiClient.post('/bins', binData);
        return data;
    } catch (error) {
        console.error("Error creating bin:", error.response ? error.response.data : error.message);
        throw error;
    }
}; 