import axios from "axios";

async function callDeleteExpenseApi(expenseId){
    const apiBaseUrl = process.env.REACT_APP_API_EXPENSE_BASE_URL;
    await axios.delete(`${apiBaseUrl}/${expenseId}`)
        .then(function (response) {
            // console.log("delete expenses resposne333: ", response);
            return {
                error: null,
                data: response.data,
                status: response.status
            }
        })
        .catch(function (error) {
            // console.log("delete expenses failed : ", error)
            return {
                error: error,
                data: null,
                status: error.status
            }
        })
}

export {callDeleteExpenseApi};

