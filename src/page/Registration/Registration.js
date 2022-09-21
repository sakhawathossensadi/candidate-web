import React from "react";
import { useEffect } from "react";
import './style.scss'
import { Form, Button, Input } from "antd";
import { axiosService } from "../../axios/axiosService";
import { BASE_URL } from "../../service";
import { useNavigate } from "react-router-dom";
import Candidate from '../../api/candidate/request';

const Registration = () => {

    const navigate = useNavigate();

    useEffect(()=> {
      if(localStorage.getItem('access_token')) {
       navigate('/dashboard');
      } else {
        navigate('/');
      }
  }, [])

    const onFinish = async (values) => {
        console.log("hello");

        try {
            const res = await Candidate.candidateRegistration(values);
            console.log('registration res', res);

            if (res) {
                console.log("success");
                navigate('/login');
            }
        } catch (e) {
            console.log(e)
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const logIn = () => {
      navigate('/login');
    }

    return (
      <div className="App">
        <div className="header">
            <div className="header-title">
                <h1 className="header-title-h1">Talent Hiring</h1>
            </div>
            <div className="header-button">
                <Button type="primary"
                    onClick={() => logIn()}
                    className='header-button-login'
                    >
                        <span>Log in</span>
                </Button>
            </div>
        </div>
        <div>
        <header className="App-header">
          <Form
            autoComplete="off"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="name"
              label="Full Name"
              rules={[
                {
                  required: true,
                  message: "Please enter your name",
                },
                { whitespace: true },
              ]}
              hasFeedback
            >
              <Input placeholder="Type your name" />
            </Form.Item>
  
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email",
                },
                { type: "email", message: "Please enter a valid email" },
              ]}
              hasFeedback
            >
              <Input placeholder="Type your email" />
            </Form.Item>
  
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Password is required",
                },
                { min: 8 },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Type your password" />
            </Form.Item>
  
            <Form.Item
              name="password_confirmation"
              label="Confirm Password"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Confirm password is required",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "The two passwords that you entered does not match."
                    );
                  },
                }),
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Confirm your password" />
            </Form.Item>
  
            <Form.Item
              name="cv_link"
              label="CV Link"
              rules={[
                {
                    required: true,
                    message: "CV link is required",
                },
                { type: "url", message: "Please enter a valid url" }
            ]}
              hasFeedback
            >
              <Input placeholder="Add your CV link" />
            </Form.Item>
  
            <Form.Item wrapperCol={{ span: 24 }}>
              <Button block type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </header>
        </div>
      </div>
    );
  }
  
  export default Registration;