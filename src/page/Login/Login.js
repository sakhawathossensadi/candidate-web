import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import './style.scss'
import axios from 'axios';
import { BASE_URL } from '../../service';
import { axiosService } from '../../axios/axiosService';
import { Router, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Auth from '../../api/authenticate/request';
import { useRedirect } from '../../services/RedirectHook';

const Login = () => {

    const navigate = useNavigate();

    // useRedirect();

  const onFinish = async (values) => {
    console.log('Success:', values);

    try {
        const response = await Auth.login(values);

        if (response.access_token) {
          localStorage.setItem('access_token', response.access_token);

          navigate('/dashboard');
        }

    } catch(e) {
        console.log(e);
    }


  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const registration = () => {
    navigate('/');
  }


  return (
    <div>
      <div className="header">
            <div className="header-title">
                <h1 className="header-title-h1">Talent Hiring</h1>
            </div>
            <div className="header-button">
                <Button type="primary"
                    onClick={() => registration()}
                    className='header-button-login'
                    >
                        <span>Registration</span>
                </Button>
            </div>
        </div>
      <header className="App-header">
        <Form
          autoComplete="off"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </header>
    </div>
  );
};

export default Login;