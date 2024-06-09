import { Button, Typography } from 'antd';
import React, { useState, useEffect, useContext, useCallback } from 'react';

import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const { token, user, signout } = useContext(AuthContext);
    const { Text, Title } = Typography;

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await api.get('/api/todos', { headers: { Authorization: `Bearer ${token}` } });
                setTodos(response.data);
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        };

        fetchTodos();
    }, [token]);

    const addTodo = useCallback((todo) => setTodos((prevTodos) => [...prevTodos, todo]), []);
    const updateTodo = useCallback((updatedTodo) => setTodos((prevTodos) => prevTodos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo)), []);
    const deleteTodo = useCallback((id) => setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id)), []);

    return (
        <div className='list__wrapper'>
            <div className='list__header mb-50'>
                <div className='list__title-wrapper'>
                    <Title className='m-0' level={1}>{`Hey ${user?.username}!`}</Title>
                    <Title className='m-0' level={3}>Here is your To-Do List</Title>
                </div>
                <Button type='primary' onClick={signout} danger>Sign Out</Button>
            </div>
            <TodoForm addTodo={addTodo} />
            {todos.length === 0 ? (
                <Text type='secondary' level={3}>You have no To-Do items right now.</Text>
            ) : (
                todos.map(todo => (
                    <TodoItem key={todo.id} todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />
                ))
            )}
        </div>
    );
};

export default React.memo(TodoList);
