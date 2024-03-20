import axios from "axios";

async function callDeleteExpenseApi(expenseId){
    const apiBaseUrl = process.env.REACT_APP_API_EXPENSE_BASE_URL;
    await axios.delete(`${apiBaseUrl}/${expenseId}`)
        .then(function (response) {
            return {
                error: null,
                data: response.data,
                status: response.status
            }
        })
        .catch(function (error) {
            return {
                error: error,
                data: null,
                status: error.status
            }
        })
}

export {callDeleteExpenseApi};

