import axios from "axios";


async function callGetExpenseListApi(userId, limit){
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    try {
        const response = await axios.get(`${apiBaseUrl}/${userId}/${limit}`);
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

export {callGetExpenseListApi};