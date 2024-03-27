import axios from "axios";

async function callGetUserDetailByEmailApi(emailId){
    const apiBaseUrl = process.env.REACT_APP_API_USER_BASE_URL;
    try {
        const response = await axios.get(`${apiBaseUrl}/email/${emailId}`);
        return {
            error: null,
            data: response.data.data.data,
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

export {callGetUserDetailByEmailApi};