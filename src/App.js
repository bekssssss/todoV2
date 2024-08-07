import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserList from './components/UserList';
import TodoList from './components/TodoList';

function App() {
    return (
        <div className="container">
            <h1 className="my-4">Управление пользователями и задачами</h1>
            <UserList />
            <hr className="my-4" />
            <TodoList />
        </div>
    );
}

export default App;

