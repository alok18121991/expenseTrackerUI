import axios from "axios";


async function callCreateGroupApi(body){
    const apiBaseUrl = process.env.REACT_APP_API_SERVER_BASE_URL;
    try{
    const response = await axios.post(`${apiBaseUrl}/group`, body);
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

export {callCreateGroupApi};