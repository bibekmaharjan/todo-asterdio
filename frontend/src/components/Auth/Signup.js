import { useNavigate } from 'react-router-dom';
import { Input, Button, message, Typography, Form } from 'antd';
import React, { useState, useContext, useEffect, useCallback } from 'react';

import { AuthContext } from '../../context/AuthContext';

const Signup = React.memo(() => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate(); 
    const { signup, token } = useContext(AuthContext);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate]);

    const handleSubmit = useCallback(async () => {
        try {
            await signup(username, password);
            messageApi.open({
                type: 'success',
                content: 'Sign Up successful!',
            });
            navigate('/'); 
        } catch (error) {
            console.error('Signup failed:', error);
            messageApi.open({
                type: 'error',
                content: `Signup Failed: ${error.response.data}`,
            });
        }
    }, [signup, username, password, messageApi, navigate]);

    return (
        <>
            {contextHolder}
            <Form onFinish={handleSubmit} className='form__wrapper'>
                <Typography.Title level={2}>Sign Up</Typography.Title>
                <Input className='mb-10' required type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                <Input className='mb-10' required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <Button htmlType="submit" type="primary">Sign Up</Button>
            </Form>
        </>
    );
});

export default Signup;
