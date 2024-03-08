import axios from "axios";


async function callGetExpenseListForGroupUsersApi(params) {
    // console.log("fdsfsdfsf.... ", groupId, userIds, limit, sortKey, numMonth)
    console.log("pppp", params)
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
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