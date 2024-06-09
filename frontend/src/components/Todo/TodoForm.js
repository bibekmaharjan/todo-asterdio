import { Button, Input } from 'antd';
import React, { useState, useContext, useCallback } from 'react';

import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

const TodoForm = React.memo(({ addTodo }) => {
    const [title, setTitle] = useState('');
    const { token } = useContext(AuthContext);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/todos', { title }, { headers: { Authorization: `Bearer ${token}` } });
            addTodo(response.data);
            setTitle('');
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    }, [title, token, addTodo]);

    return (
        <form onSubmit={handleSubmit}>
            <div className='ds-flex mb-10'>
                <Input className='mr-10' type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New To-Do" />
                <Button type='primary' htmlType="submit">Add</Button>
            </div>
        </form>
    );
});

export default TodoForm;
