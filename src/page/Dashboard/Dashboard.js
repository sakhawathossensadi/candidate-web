import React, { useState } from "react";
import { Avatar, Button, Modal, Pagination, Select } from "antd";
import { UserOutlined } from '@ant-design/icons'
import './style.scss'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useRedirect } from '../../services/RedirectHook';


function Dashboard () {

    const navigate = useNavigate();

    const [candidateName, setCandidateName] = useState('');
    const [candidates, setCandidates] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [fromNumber, setFromNumber] = useState(0);
    const [candidatePreviousStatus, setCandidatePreviousStatus] = useState(0);
    const [candidateStatus, setCandidateStatus] = useState(0);
    const [candidateId, setCandidateId] = useState(0);
    const [acceptModalVisible, setApproveModalVisible] = useState(false);
    const [rejectModalVisible, setRejectModalVisible] = useState(false);
    const [candidateLoader, setCandidateLoader] = useState(false);

    useRedirect();

    const params = {
        page: page
    };

    const dummy = {};

    // useEffect(() => {
    //     if(!localStorage.getItem('access_token')) {
    //         navigate('/');
    //        }
    // })

    // useEffect(() => {
    //     fetchCandidate();
    // },[]);

    // const fetchCandidate = async () => {
    //     try {
    //         const res = await axiosService(BASE_URL+SERVER_TALENT_ADMIN_PROFILE_ENDPOINT, dummy, 'GET');
    //         setAdminName(res.data.name);
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    // useEffect(() => {
    //     fetchCandidates();
    // },[page, candidateLoader]);

    // const fetchCandidates = async () => {
    //     let url = SERVER_TALENT_ADMIN_CANDIDATES_ENDPOINT+'?page='+page;
    //     try {
    //         const res = await axiosService(BASE_URL+url, params, 'GET');
    //         setCandidates(res.data);
    //         setTotal(res.meta.total);
    //         setFromNumber(res.meta.from);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    // const onPageChange = (page) => {
    //     setPage(page);
    // }

    // const signOut = async () => {
    //     try {
    //         const res = await axiosService(BASE_URL+SERVER_TALENT_ADMIN_LOGOUT_ENDPOINT, dummy, 'POST');
    //         console.log('logout', res);
    //         if (res) {
    //             localStorage.removeItem("access_token");
    //             navigate('/');
    //         }
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    // const handleStatus = (candidateId, status) => {
    //     setCandidatePreviousStatus(status);
    //     setCandidateId(candidateId);

    //     if (status === "approve") {
    //         showApproveModal();
    //         setCandidateStatus(1);
    //     }
    //     if (status === "reject") {
    //         showRejectModal();
    //         setCandidateStatus(0);
    //     }
    // }

    // const showApproveModal = () => {
    //     setApproveModalVisible(true);
    // }

    // const showRejectModal = () => {
    //     setRejectModalVisible(true);
    // }

    // const handleApproveModalCancel = () => {
    //     setApproveModalVisible(false);
    // }

    // const handleRejectModalCancel = () => {
    //     setRejectModalVisible(false);
    // }

    // const handleCandidateApprove = async () => {
    //     let url = SERVER_TALENT_ADMIN_CANDIDATE_STATUS_UPDATE_ENDPOINT.replace(':candidateId', candidateId);
    //     console.log('set url',url);
    //     const params = {
    //         status : candidateStatus
    //     }
    //     try {
    //         const res = await axiosService(BASE_URL+url, params, 'POST');
    //         console.log('status res',res.data);
    //         let updatedStatus = res.data.is_active;
    //         if (updatedStatus !== candidatePreviousStatus) {
    //             setCandidateLoader(!candidateLoader);
    //         }
    //     } catch (e) {
    //         console.log(e)
    //     }

    //     setApproveModalVisible(false);
    // }

    // const handleCandidateReject = async () => {
    //     let url = SERVER_TALENT_ADMIN_CANDIDATE_STATUS_UPDATE_ENDPOINT.replace(':candidateId', candidateId);
    //     console.log('set url',url);
    //     const params = {
    //         status : candidateStatus
    //     }
    //     try {
    //         const res = await axiosService(BASE_URL+url, params, 'POST');
    //         console.log('status res',res.data);
    //         let updatedStatus = res.data.is_active;
    //         if (updatedStatus !== candidatePreviousStatus) {
    //             setCandidateLoader(!candidateLoader);
    //         }
    //     } catch (e) {
    //         console.log(e)
    //     }

    //     setRejectModalVisible(false);
    // }

    // const acceptModalFooter = (
    //     <div style={{ display: 'flex', justifyContent: 'center'}}>
    //         <Button type='primary' size='large' onClick={handleCandidateApprove}>
    //             Approve
    //         </Button>
    //     </div>
    // )

    // const rejectModalFooter = (
    //     <div style={{ display: 'flex', justifyContent: 'center'}}>
    //         <Button type='primary' danger size='large' onClick={handleCandidateReject}>
    //             Reject
    //         </Button>
    //     </div>
    // )

    return (
        <div className="dashboard">
            <div className="dashboard-topbar">
                <div className="dashboard-topbar-title">
                    <h1 className="dashboard-topbar-title-h1">Talent Hiring</h1>
                </div>
                <div className="dashboard-topbar-profile">
                    <div className="dashboard-topbar-profile-style">
                        <div className='dashboard-topbar-profile-style-name'>
                            <span className='dashboard-topbar-profile-style-name-span'>
                                Hello, {"adminName"}
                            </span>
                            <Avatar size={42}  icon={<UserOutlined />} />
                        </div>
                        <div className="dashboard-topbar-profile-style-button">
                            <Button type="primary"
                                // onClick={() => signOut()}
                                className='dashboard-topbar-profile-style-button-logout'
                                >
                                    <span>Logout</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="candidate-list">
                <h1>Dashboard</h1>           
            </div>
        </div>
    )
}

export default Dashboard;