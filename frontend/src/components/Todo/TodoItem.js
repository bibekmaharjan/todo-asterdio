import { Button, Input, message, Typography } from 'antd';
import React, { useState, useEffect, useContext, useCallback } from 'react';

import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

const TodoItem = React.memo(({ todo, updateTodo, deleteTodo }) => {
    const [title, setTitle] = useState(todo.title);
    const [isTyping, setIsTyping] = useState(false);

    const { Text } = Typography;
    const { token } = useContext(AuthContext);
    const [messageApi, contextHolder] = message.useMessage();

    const handleEdit = useCallback(async () => {
        try {
            await api.put(`/api/todos/${todo.id}`, { ...todo, title }, { headers: { Authorization: `Bearer ${token}` } });
            updateTodo({ ...todo, title });
            messageApi.open({
                type: 'success',
                content: 'Item edited successfully',
            });
        } catch (error) {
            console.error('Edit failed:', error);
            messageApi.open({
                type: 'error',
                content: `Edit failed: ${error.response?.data || error.message}`,
            });
        }
    }, [title, token, todo, updateTodo, messageApi]);

    useEffect(() => {
        if (isTyping) {
            const timer = setTimeout(() => {
                handleEdit();
                setIsTyping(false);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [isTyping, handleEdit]);

    const handleToggle = useCallback(async () => {
        try {
            await api.put(`/api/todos/${todo.id}`, { ...todo, completed: !todo.completed }, { headers: { Authorization: `Bearer ${token}` } });
            updateTodo({ ...todo, completed: !todo.completed });
        } catch (error) {
            console.error('Toggle failed:', error);
            messageApi.open({
                type: 'error',
                content: `Toggle failed: ${error.response?.data || error.message}`,
            });
        }
    }, [token, todo, updateTodo, messageApi]);

    const handleDelete = useCallback(async () => {
        try {
            await api.delete(`/api/todos/${todo.id}`, { headers: { Authorization: `Bearer ${token}` } });
            deleteTodo(todo.id);
        } catch (error) {
            console.error('Delete failed:', error);
            messageApi.open({
                type: 'error',
                content: `Delete failed: ${error.response?.data || error.message}`,
            });
        }
    }, [token, todo.id, deleteTodo, messageApi]);

    const handleChange = useCallback((e) => {
        setTitle(e.target.value);
        setIsTyping(true);
    }, []);

    return (
        <div className='ds-flex align-center mb-10'>
            {contextHolder}
            <input type="checkbox" className= "mr-10" checked={todo.completed} onChange={handleToggle} />
            {
                todo.completed ? 
                    <Text className='item__title' delete>{title}</Text> :
                    <Input className='mr-10' value={title} onChange={handleChange} />
            }
            <Button danger type='primary' onClick={handleDelete}>Delete</Button>
        </div>
    );
});

export default TodoItem;
