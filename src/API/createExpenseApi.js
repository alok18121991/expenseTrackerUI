import axios from "axios";


async function callCreateExpenseApi(body){
    const apiBaseUrl = process.env.REACT_APP_API_EXPENSE_BASE_URL;
    try{
    const response = await axios.post(apiBaseUrl, body);
            return {
                error: null,
                data: response.data,
                status: response.status
            };
        } catch(error){
            return {
                error: error,
                data: null,
                status: error.status
            };
        }
}

export {callCreateExpenseApi};