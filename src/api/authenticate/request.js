import { SERVER_CANDIDATE_LOGIN_ENDPOINT } from "../../config/endpoints";
import { axiosService, GET, POST, DELETE } from "../../services/axiosService";
import { getAuthToken } from "../../services/authentication";

class Auth {
    login = async (data) => {
        const token = getAuthToken();

        const response = await axiosService (
            POST,
            SERVER_CANDIDATE_LOGIN_ENDPOINT,
            { ...data },
            token
        )

        if (response) {
            return response.data;
        }
    }
}

export default new Auth();