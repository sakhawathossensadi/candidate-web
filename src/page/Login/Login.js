import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import './style.scss'
import axios from 'axios';
import { BASE_URL } from '../../service';
import { axiosService } from '../../axios/axiosService';
import { Router, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Login = () => {

    const navigate = useNavigate();

    useEffect(()=> {
        if(localStorage.getItem('access_token')) {
         navigate('/dashboard');
        }
    }, [])

  const onFinish = async (values) => {
    console.log('Success:', values);

    try {
        const res = await axiosService(BASE_URL+'/oauth/token', values, 'POST')
        console.log('data', res.data);
        
        if(res.data.access_token) {
            localStorage.setItem('access_token', res.data.access_token);
            navigate('/dashboard');  
        } else {
                throw Error('password or username incorrect');
            
        }
    } catch(e) {
        console.log(e);
    }


  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <div className='center'>

    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
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
    </div>
  );
};

export default Login;