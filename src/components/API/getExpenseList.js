import axios from "axios";


async function callGetExpenseListApi(userId, limit){
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    try {
        const response = await axios.get(`${apiBaseUrl}/${userId}/${limit}`);
        console.log("callGetExpenseListApi response", response.data.data.data);
        return {
            error: null,
            data: response.data.data.data,
            status: response.status
        };
    } catch (error) {
        console.log("callGetExpenseListApi error ", error);
        return {
            error: error,
            data: null,
            status: error.status
        };
    }
}

export {callGetExpenseListApi};