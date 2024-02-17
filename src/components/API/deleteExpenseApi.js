import axios from "axios";

function callDeleteExpenseApi(expenseId){
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    axios.delete(`${apiBaseUrl}/${expenseId}`)
        .then(function (response) {
            console.log("delete expenses resposne333: ", response);
            return {
                error: null,
                data: response.data,
                status: response.status
            }
        })
        .catch(function (error) {
            console.log("delete expenses failed : ", error)
            return {
                error: error,
                data: null,
                status: error.status
            }
        })
}

export {callDeleteExpenseApi};

