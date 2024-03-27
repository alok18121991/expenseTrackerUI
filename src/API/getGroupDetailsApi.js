import axios from "axios";


async function callGetGroupDetailsApi(groupIds){
    const apiBaseUrl = process.env.REACT_APP_API_GROUP_BASE_URL;
    try {
        const response = await axios.get(`${apiBaseUrl}`,
        {
            params: {
                group_ids: groupIds
            }
        });
        return {
            error: null,
            data: response.data,
            status: response.status
        };
    } catch (error) {
        return {
            error: error,
            data: null,
            status: error.status
        };
    }
}

export {callGetGroupDetailsApi};