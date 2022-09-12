import React, { useState } from "react";
import { Avatar, Button, Modal, Pagination, Select } from "antd";
import { UserOutlined } from '@ant-design/icons'
import './style.scss'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { axiosService } from "../../axios/axiosService";
import { BASE_URL } from "../../service";
import { 
    SERVER_TALENT_ADMIN_CANDIDATES_ENDPOINT, 
    SERVER_TALENT_ADMIN_CANDIDATE_STATUS_UPDATE_ENDPOINT, 
    SERVER_TALENT_ADMIN_PROFILE_ENDPOINT,
    SERVER_TALENT_ADMIN_LOGOUT_ENDPOINT } from '../../config/endpoints';
import styles from '../Dashboard/Contents.module.scss';

function Dashboard () {

    const navigate = useNavigate();

    const [adminName, setAdminName] = useState('');
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

    const params = {
        page: page
    };

    const dummy = {};

    useEffect(() => {
        if(!localStorage.getItem('access_token')) {
            navigate('/');
           }
    })

    useEffect(() => {
        fetchAdmin();
    },[]);

    const fetchAdmin = async () => {
        try {
            const res = await axiosService(BASE_URL+SERVER_TALENT_ADMIN_PROFILE_ENDPOINT, dummy, 'GET');
            setAdminName(res.data.name);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchCandidates();
    },[page, candidateLoader]);

    const fetchCandidates = async () => {
        let url = SERVER_TALENT_ADMIN_CANDIDATES_ENDPOINT+'?page='+page;
        try {
            const res = await axiosService(BASE_URL+url, params, 'GET');
            setCandidates(res.data);
            setTotal(res.meta.total);
            setFromNumber(res.meta.from);
        } catch (e) {
            console.log(e);
        }
    }

    const onPageChange = (page) => {
        setPage(page);
    }

    const signOut = async () => {
        try {
            const res = await axiosService(BASE_URL+SERVER_TALENT_ADMIN_LOGOUT_ENDPOINT, dummy, 'POST');
            console.log('logout', res);
            if (res) {
                localStorage.removeItem("access_token");
                navigate('/');
            }
        } catch (e) {
            console.log(e);
        }
    }

    const handleStatus = (candidateId, status) => {
        setCandidatePreviousStatus(status);
        setCandidateId(candidateId);

        if (status === "approve") {
            showApproveModal();
            setCandidateStatus(1);
        }
        if (status === "reject") {
            showRejectModal();
            setCandidateStatus(0);
        }
    }

    const showApproveModal = () => {
        setApproveModalVisible(true);
    }

    const showRejectModal = () => {
        setRejectModalVisible(true);
    }

    const handleApproveModalCancel = () => {
        setApproveModalVisible(false);
    }

    const handleRejectModalCancel = () => {
        setRejectModalVisible(false);
    }

    const handleCandidateApprove = async () => {
        let url = SERVER_TALENT_ADMIN_CANDIDATE_STATUS_UPDATE_ENDPOINT.replace(':candidateId', candidateId);
        console.log('set url',url);
        const params = {
            status : candidateStatus
        }
        try {
            const res = await axiosService(BASE_URL+url, params, 'POST');
            console.log('status res',res.data);
            let updatedStatus = res.data.is_active;
            if (updatedStatus !== candidatePreviousStatus) {
                setCandidateLoader(!candidateLoader);
            }
        } catch (e) {
            console.log(e)
        }

        setApproveModalVisible(false);
    }

    const handleCandidateReject = async () => {
        let url = SERVER_TALENT_ADMIN_CANDIDATE_STATUS_UPDATE_ENDPOINT.replace(':candidateId', candidateId);
        console.log('set url',url);
        const params = {
            status : candidateStatus
        }
        try {
            const res = await axiosService(BASE_URL+url, params, 'POST');
            console.log('status res',res.data);
            let updatedStatus = res.data.is_active;
            if (updatedStatus !== candidatePreviousStatus) {
                setCandidateLoader(!candidateLoader);
            }
        } catch (e) {
            console.log(e)
        }

        setRejectModalVisible(false);
    }

    const acceptModalFooter = (
        <div style={{ display: 'flex', justifyContent: 'center'}}>
            <Button type='primary' size='large' onClick={handleCandidateApprove}>
                Approve
            </Button>
        </div>
    )

    const rejectModalFooter = (
        <div style={{ display: 'flex', justifyContent: 'center'}}>
            <Button type='primary' danger size='large' onClick={handleCandidateReject}>
                Reject
            </Button>
        </div>
    )

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
                                Hello, {adminName}
                            </span>
                            <Avatar size={42}  icon={<UserOutlined />} />
                        </div>
                        <div className="dashboard-topbar-profile-style-button">
                            <Button type="primary"
                                onClick={() => signOut()}
                                className='dashboard-topbar-profile-style-button-logout'
                                >
                                    <span>Logout</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="candidate-list">
                <div className="candidate-list-header">
                    <div className="candidate-list-header-item">Name</div>
                    <div className="candidate-list-header-item">Email</div>
                    <div className="candidate-list-header-item">CV Link</div>
                    <div className="candidate-list-header-item">Details</div>
                    <div className="candidate-list-header-item">Status</div>
                    <div className="candidate-list-header-item">Action</div>
                </div>
                <div className="candidate-list-body">
                    {
                        candidates.map((candidate, index) => {
                            return (
                                <div className="candidate-list-body-item">
                                    <div className="candidate-list-body-item-username">
                                        <span className="videos-list-item-name-serial">
                                            {fromNumber + index+". "}
                                        </span>
                                        <span className="candidate-list-body-item-username-span">
                                            {candidate.name}
                                        </span>
                                    </div>
                                    <div className="candidate-list-body-item-email">
                                        <span>
                                            {candidate.email}
                                        </span>
                                    </div>
                                    <div className="candidate-list-body-item-cv">
                                        <Button className="users-list-body-item-btn candidate-list-body-item-cv-button" type="primary">
                                            View CV
                                        </Button>
                                    </div>
                                    <div className="candidate-list-body-item-details">
                                        <Button className="users-list-body-item-btn candidate-list-body-item-details-button" type="primary">
                                            View Details
                                        </Button>
                                    </div>
                                    <div className="candidate-list-body-item-status">
                                        <Select onSelect={(status) => handleStatus(candidate.id, status)}  className="candidate-list-select-action" value={candidate.is_active === true ? "approve" : "reject"} style={{ width: 150 }} defaultValue={"Status"} bordered={true}>
                                            <Select.Option value="approve">Approve</Select.Option>
                                            <Select.Option value="reject">Reject</Select.Option>
                                        </Select>
                                    </div>
                                    <Modal title="Approve Candidate" visible={acceptModalVisible} footer={acceptModalFooter} maskStyle={{ opacity: '0.3' }} onCancel={handleApproveModalCancel}>
                                    </Modal>
                                    <Modal title="Reject Candidate" visible={rejectModalVisible} footer={rejectModalFooter} onCancel={handleRejectModalCancel}>
                                    </Modal>
                                    <div className="candidate-list-body-item-button">
                                        <Button  className="action-btn">
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5.73438 1.95312H5.5625C5.65703 1.95312 5.73438 1.87578 5.73438 1.78125V1.95312H12.2656V1.78125C12.2656 1.87578 12.343 1.95312 12.4375 1.95312H12.2656V3.5H13.8125V1.78125C13.8125 1.02285 13.1959 0.40625 12.4375 0.40625H5.5625C4.8041 0.40625 4.1875 1.02285 4.1875 1.78125V3.5H5.73438V1.95312ZM16.5625 3.5H1.4375C1.05723 3.5 0.75 3.80723 0.75 4.1875V4.875C0.75 4.96953 0.827344 5.04688 0.921875 5.04688H2.21953L2.7502 16.2832C2.78457 17.0158 3.39043 17.5938 4.12305 17.5938H13.877C14.6117 17.5938 15.2154 17.018 15.2498 16.2832L15.7805 5.04688H17.0781C17.1727 5.04688 17.25 4.96953 17.25 4.875V4.1875C17.25 3.80723 16.9428 3.5 16.5625 3.5ZM13.7115 16.0469H4.28848L3.76855 5.04688H14.2314L13.7115 16.0469Z" fill="#FC3273" />
                                            </svg>
                                        </Button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>               
            </div>
            <div className={styles.PaginationContainer}>
                <Pagination size="small" total={total}
                    defaultPageSize={15}
                    current={page}
                    onChange={onPageChange} />
            </div>
        </div>
    )
}

export default Dashboard;