import axios from "axios";


async function callGetExpenseByGroupTypeApi(groupId, userIds, numMonths, groupType) {
    const apiBaseUrl = process.env.REACT_APP_API_EXPENSE_BASE_URL;
    try {
        const response = await axios.get(`${apiBaseUrl}/daily`, {
            params: {
                groupId: groupId,
                userids: userIds,
                numMonths: numMonths,
                groupType: groupType
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

export { callGetExpenseByGroupTypeApi as callGetExpenseByGroupApi };