import axios from "axios";


async function callGetExpenseListForGroupUsersApi(params) {
    const apiBaseUrl = process.env.REACT_APP_API_EXPENSE_BASE_URL;
    try {
        const response = await axios.get(`${apiBaseUrl}/group`,
            {
                params: {
                   ...params
                }
            }
        );
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

export { callGetExpenseListForGroupUsersApi };