import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Input, Table, Form, FormGroup, Label } from 'reactstrap';
import TodoItem from './TodoItem';
// import './TodoItem.css';

const API_URL = 'https://66b1a2f41ca8ad33d4f4a0f7.mockapi.io/todos';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({ text: '', completed: false });

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await axios.get(API_URL);
        setTodos(response.data);
    };

    const addTodo = async () => {
        const response = await axios.post(API_URL, newTodo);
        setTodos([...todos, response.data]);
        setNewTodo({ text: '', completed: false });
    };

    const updateTodo = async (id, updatedTodo) => {
        await axios.put(`${API_URL}/${id}`, updatedTodo);
        fetchTodos();
    };

    const deleteTodo = async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div>
            <h2>Список задач</h2>
            <Form inline className="mb-4">
                <FormGroup>
                    <Label for="todoText" className="mr-2">Задача:</Label>
                    <Input
                        type="text"
                        id="todoText"
                        value={newTodo.text}
                        onChange={e => setNewTodo({ ...newTodo, text: e.target.value })}
                        className="mr-2"
                    />
                </FormGroup>
                <Button color="primary" onClick={addTodo}>Добавить</Button>
            </Form>
            <Table striped responsive>
                <thead>
                <tr>
                    <th>Задача</th>
                    <th>Выполнено</th>
                    <th>Дата завершения</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {todos.map(todo => (
                    <TodoItem key={todo.id} todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default TodoList;
