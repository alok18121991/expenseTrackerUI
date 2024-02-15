import axios from "axios";

function callDeleteExpenseApi(expenseId){
    axios.delete(`http://192.168.1.7:8080/expense/${expenseId}`)
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

