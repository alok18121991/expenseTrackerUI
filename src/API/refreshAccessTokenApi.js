import axios from "axios";


async function callRefreshAccessTokenApi(body){
    const apiBaseUrl = process.env.REACT_APP_API_AUTH_BASE_URL;
    try{
    const response = await axios.post(`${apiBaseUrl}/refresh`, {
        "refreshToken": body
    });
            return {
                error: null,
                data: response.data,
                status: response.status
            };
        } catch(error){
            return {
                error: error,
                data: null,
                status: error.status
            };
        }
}

export {callRefreshAccessTokenApi};