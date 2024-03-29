import axios from "axios";

async function callGetRelatedUsersApi(userId){
    const apiBaseUrl = process.env.REACT_APP_API_USER_BASE_URL;
    try {
        const response = await axios.get(`${apiBaseUrl}/related/${userId}`);
        return {
            error: null,
            data: response.data,
            status: response.status
        };
    } catch (error) {
        return {
            error: error,
            data: null,
            status: error.status
        };
    }
}

export {callGetRelatedUsersApi};