import axios from "axios";


function callCreateExpenseApi(body, event){
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    axios.post(apiBaseUrl, body)
        .then(function (response){
            event.target.reset();
            // console.log("response post", response);
            
        })
        .catch(function (error){
            // console.log("post erro ", error);
        });
}

export {callCreateExpenseApi};