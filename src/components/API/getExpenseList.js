import axios from "axios";


function callGetExpenseListApi(userId){
    axios.get("http://localhost:8080/expense/"+ userId)
        .then(function (response){
            console.log("callGetExpenseListApi response", response);
            
        })
        .catch(function (error){
            console.log("callGetExpenseListApi error ", error);
        });
}

export {callGetExpenseListApi};