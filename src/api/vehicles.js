import apiClient from './http'; // Import the configured Axios instance

export const fetchVehiclesApi = async () => {
    const { data } = await apiClient.get('/vehicles');
    return data;
};

export const addVehicleApi = async (vehicleData) => {
    if (!vehicleData.brand || !vehicleData.plateNumber) {
        throw new Error("Brand and plate number are required.");
    }
    try {
        const { data } = await apiClient.post('/vehicles', vehicleData);
        return data;
    } catch (error) {
        console.error("Error adding vehicle:", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const updateVehicleApi = async (id, vehicleData) => {
    if (!id || !vehicleData) {
        throw new Error("ID and vehicle data are required.");
    }
    const { data } = await apiClient.put(`/vehicles/${id}`, vehicleData);
    return data;
};

export const fetchVehicleByIdApi = async (id) => {
    const { data } = await apiClient.get(`/vehicles/${id}`);
    return data;
};

export const deleteVehicleApi = async (id) => {
    const { data } = await apiClient.delete(`/vehicles/${id}`);
    return data;
};

export const fetchAvailableDriversApi = async () => {
    const { data } = await apiClient.get('/drivers/available-drivers');
    return data;
}; 