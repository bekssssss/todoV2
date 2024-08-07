import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Input, Table, Form, FormGroup, Label } from 'reactstrap';
import UserItem from './UserItem';
import './UserList.css';

const API_URL = 'https://66b1a2f41ca8ad33d4f4a0f7.mockapi.io/users';

function UserList() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', hired: false });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await axios.get(API_URL);
        setUsers(response.data);
    };

    const addUser = async () => {
        const response = await axios.post(API_URL, newUser);
        setUsers([...users, response.data]);
        setNewUser({ name: '', hired: false });
    };

    const updateUser = async (id, updatedUser) => {
        await axios.put(`${API_URL}/${id}`, updatedUser);
        fetchUsers();
    };

    const deleteUser = async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        setUsers(users.filter(user => user.id !== id));
    };

    return (
        <div>
            <h2>Список пользователей</h2>
            <Form inline className="mb-4">
                <FormGroup>
                    <Label for="userName" className="mr-2">Имя:</Label>
                    <Input
                        type="text"
                        id="userName"
                        value={newUser.name}
                        onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                        className="mr-2"
                    />
                </FormGroup>
                <FormGroup check className="mr-2">
                    <Label check>
                        <Input
                            type="checkbox"
                            checked={newUser.hired}
                            onChange={e => setNewUser({ ...newUser, hired: e.target.checked })}
                        />{' '}
                        Нанят
                    </Label>
                </FormGroup>
                <Button color="primary" onClick={addUser}>Добавить</Button>
            </Form>
            <Table striped responsive>
                <thead>
                <tr>
                    <th>Имя</th>
                    <th>Статус</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <UserItem key={user.id} user={user} updateUser={updateUser} deleteUser={deleteUser} />
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default UserList;
