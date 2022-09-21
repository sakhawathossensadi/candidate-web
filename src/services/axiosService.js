import axios from "axios";
import {getAuthToken} from './authentication';

export const GET = 'GET';
export const POST = 'POST';
export const DELETE = 'DELETE';

export const axioPost = async (
    url,
    params,
    authorizedToken,
) => {
    const token = authorizedToken ? authorizedToken : getAuthToken();
    const config = {
        headers: {
            Accept: `application/json`,
            Authorization: `Bearer ${token}`,
        },
    }

    const values = {
        ...params,
        grant_type :  'password',
        client_id : 2,
        client_secret : 'dfAuvgguMDS7U7MovyArA7QXyL97U7dG2UzEW9NH',
        scope : '*',
    }

    const response = await axios.post(url, values, config);
    // console.log('post response');

    return await response;
}

export const axioGet = async (
    url,
    params,
    authorizedToken,
) => {
    const token = authorizedToken ? authorizedToken : getAuthToken();
    const config = {
        headers: {
            Accept: `application/json`,
            Authorization: `Bearer ${token}`,
        },
    }

    console.log('profile url : ',url);

    const values = {
        ...params,
        grant_type :  'password',
        client_id : 2,
        client_secret : 'dfAuvgguMDS7U7MovyArA7QXyL97U7dG2UzEW9NH',
        scope : '*',
    }

    const response = await axios.get(url, {...values, ...config});
    console.log('axio get : ',response);

    return await response;
}

export const axiosService = async (
    type,
    url,
    params,
    authorizedToken = null,
    headers = null,
) => {
    let response;
    try {
        if (type === POST) {
            console.log("inside post")
            response = await axioPost(url, params, authorizedToken);
        } 
        else if (type === DELETE) {
            // response = await axioDelete(url, authorizedToken);
        } else {
            console.log("else");
            response = await axioGet(url, params, authorizedToken);
        }
        return await response;
    } catch (e) {
        throw e;
    }
}