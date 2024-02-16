import axios from "axios";


async function callGetExpenseByGroupTypeApi(userIds, numMonths, groupType) {
    try {
        const response = await axios.get(`http://192.168.1.7:8080/expense/daily`, {
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