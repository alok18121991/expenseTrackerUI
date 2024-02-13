import axios from "axios";


function callCreateExpenseApi(body, event){
    axios.post("http://localhost:8080/expense",
        
            body
        )
        .then(function (response){
            event.target.reset();
            console.log("response post", response);
            
        })
        .catch(function (error){
            console.log("post erro ", error);
        });
}

export {callCreateExpenseApi};