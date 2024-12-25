import apiClient from './http'; // Import the configured Axios instance

// Function to send an admin invite
export const sendAdminInviteApi = async (adminData) => {
    // Validate adminData before sending
    if (!adminData.firstName || !adminData.lastName || !adminData.contact || !adminData.email || !adminData.role) {
        throw new Error("All fields are required.");
    }
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
    if (!id) {
        throw new Error("Admin ID is required.");
    }
    try {
        const { data } = await apiClient.get(`/drivers/${id}`);
        return data;
    } catch (error) {
        console.error("Error fetching admin data:", error.response ? error.response.data : error.message);
        throw error;
    }
};


// Existing function to update admin data by ID (if needed)
export const updateAdminDataApi = async (id, adminData) => {
    if (!id || !adminData) {
        throw new Error("ID and admin data are required.");
    }
    try {
        const { data } = await apiClient.put(`/drivers/${id}`, {
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
