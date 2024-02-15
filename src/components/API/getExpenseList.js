import axios from "axios";


async function callGetExpenseListApi(userId, limit){
    try {
        const response = await axios.get(`http://192.168.1.7:8080/expense/${userId}/${limit}`);
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