import { SERVER_CANDIDATE_REGISTRATION_ENDPOINT } from '../../config/endpoints';
import { axiosService, GET, POST, DELETE } from '../../services/axiosService';
import { getAuthToken } from '../../services/authentication';

class Candidate {
    candidateRegistration = async (values) => {
        const token = getAuthToken();
        console.log("token : ",token);
        console.log("candidate data : ",values);
        console.log("SERVER_CANDIDATE_REGISTRATION_ENDPOINT : ",SERVER_CANDIDATE_REGISTRATION_ENDPOINT);
        console.log("process : ",process.env);

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
}

export default  new Candidate();