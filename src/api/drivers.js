import apiClient from './http';

export const fetchDriversApi = async () => {
    const { data } = await apiClient.get('/admin/get_drivers');
    return data;
};
export const UpdateDriverApi = async (id, driverData) => {
    const { data } = await apiClient.put(`/admin/update_driver/${id}`, driverData);
    return data;
};

export const DeleteDriverApi = async (id) => {
    const { data } = await apiClient.delete(`/admin/remove_driver/${id}`);
    return data;
};
