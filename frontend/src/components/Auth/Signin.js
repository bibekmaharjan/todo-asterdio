import { useNavigate } from 'react-router-dom';
import { Input, Button, message, Typography, Form } from 'antd';
import React, { useState, useContext, useEffect, useCallback } from 'react';

import { AuthContext } from '../../context/AuthContext';

const Signin = React.memo(() => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const { signin, token } = useContext(AuthContext);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate]);

    const handleSubmit = useCallback(async () => {
        try {
            await signin(username, password);
            messageApi.open({
                type: 'success',
                content: 'Signin successful!',
            });
            navigate('/');
        } catch (err) {
            messageApi.open({
                type: 'error',
                content: `Signin Failed: ${err.response.data}`,
            });
            console.log('Signin Failed:', err);
        }
    }, [signin, username, password, messageApi, navigate]);

    return (
        <>
            {contextHolder}
            <Form onFinish={handleSubmit} className='form__wrapper'>
                <Typography.Title level={2}>Sign In</Typography.Title>
                <Input
                    required
                    className='form__input mb-10'
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <Input
                    required
                    className='form__input mb-10'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <Button htmlType="submit" type="primary">Sign In</Button>
                <Button type="link" onClick={() => navigate('/signup')}>Sign up</Button>
            </Form>
        </>
    );
});

export default Signin;
