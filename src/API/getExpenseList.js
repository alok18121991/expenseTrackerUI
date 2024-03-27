import axios from "axios";


async function callGetExpenseListApi(userId, limit, sortKey, numMonth){
    const apiBaseUrl = process.env.REACT_APP_API_EXPENSE_BASE_URL;
    try {
        const response = await axios.get(`${apiBaseUrl}/${userId}/${sortKey}/${limit}/${numMonth}`);
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