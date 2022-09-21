import { 
    SERVER_CANDIDATE_REGISTRATION_ENDPOINT, 
    SERVER_TALENT_CANDIDATE_PROFILE_ENDPOINT } from '../../config/endpoints';
import { axiosService, GET, POST, DELETE } from '../../services/axiosService';
import { getAuthToken } from '../../services/authentication';

class Candidate {
    candidateRegistration = async (values) => {
        const token = getAuthToken();

        const response = await axiosService(
            POST,
            SERVER_CANDIDATE_REGISTRATION_ENDPOINT,
            { ...values },
            token
        )

        console.log('res: ',response.data);

        if (response) {
            console.log("inside if block");
            return response.data;
        }
    }

    candidateProfile = async () => {
        const token = getAuthToken();
        console.log('candidate profile token : ',token);

        const response = await axiosService(
            GET,
            SERVER_TALENT_CANDIDATE_PROFILE_ENDPOINT,
            {},
            token
        )

        if (response) {
            return response.data;
        }
    }
}

export default  new Candidate();