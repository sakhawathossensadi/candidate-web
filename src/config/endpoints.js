// const BASE_API = process.env.REACT_APP_BASE_API;
const { REACT_APP_BASE_API } = process.env;

export const SERVER_CANDIDATE_REGISTRATION_ENDPOINT = `${REACT_APP_BASE_API}/candidate/register`;
export const SERVER_CANDIDATE_LOGIN_ENDPOINT = `${REACT_APP_BASE_API}/oauth/token`;
export const SERVER_TALENT_ADMIN_PROFILE_ENDPOINT = `${REACT_APP_BASE_API}/candidate/profile`;
// export const SERVER_TALENT_ADMIN_CANDIDATES_ENDPOINT = '/admin/candidates';
export const SERVER_TALENT_ADMIN_CANDIDATE_STATUS_UPDATE_ENDPOINT = '/admin/candidates/:candidateId/status';
export const SERVER_TALENT_ADMIN_LOGOUT_ENDPOINT = '/auth/logout';