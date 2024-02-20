import axios from "axios";


async function callGetExpenseByGroupTypeApi(userIds, numMonths, groupType) {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    try {
        const response = await axios.get(`${apiBaseUrl}/daily`, {
            params: {
                userids: userIds,
                numMonths: numMonths,
                groupType: groupType
            }
        }
        );
        console.log("callGetExpenseByGroupApi response", response.data.data.data);
        return {
            error: null,
            data: response.data.data.data,
            status: response.status
        };
    } catch (error) {
        console.log("callGetExpenseByGroupApi error ", error);
        return {
            error: error,
            data: null,
            status: error.status
        };
    }
}

export { callGetExpenseByGroupTypeApi as callGetExpenseByGroupApi };