import apiClient from './http'; // Import the configured Axios instance

// Function to send an admin invite
export const sendAdminInviteApi = async (adminData) => {
    try {
        const { data } = await apiClient.post('/drivers', {
            firstName: adminData.firstName,
            lastName: adminData.lastName,
            contactNumber: adminData.contact,
            email: adminData.email,
            userRole: adminData.role
        });
        return data;
    } catch (error) {
        console.error("Error sending admin invite:", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const fetchAdminDataApi = async (id) => {
    try {
        const { data } = await apiClient.get(`/drivers/${id}`);
        return data;
    } catch (error) {
        console.error("Error fetching admin data:", error.response ? error.response.data : error.message);
        throw error;
    }
};

// Function to update admin data by ID
export const updateAdminDataApi = async (id, adminData) => {
    try {
        const { data } = await apiClient.post(`/drivers/${id}`, {
            firstName: adminData.firstName,
            lastName: adminData.lastName,
            contactNumber: adminData.contactNumber,
            email: adminData.email,
            userRole: adminData.role,
        });
        return data;
    } catch (error) {
        console.error("Error updating admin data:", error.response ? error.response.data : error.message);
        throw error;
    }
};
