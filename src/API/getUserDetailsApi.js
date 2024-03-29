import axios from "axios";

async function callGetUserDetailsApi(googleCodeResponse){
    const authApiBaseUrl = process.env.REACT_APP_API_AUTH_BASE_URL;
    try {
        const response = await axios.get(`${authApiBaseUrl}/user`,{
            params: {
                code: googleCodeResponse.code
            }
        });
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

export {callGetUserDetailsApi};