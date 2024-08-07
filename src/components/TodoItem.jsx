import React, { useState } from 'react';
import { Button, Input } from 'reactstrap';
// import './TodoItem.css';

function TodoItem({ todo, updateTodo, deleteTodo }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTodo, setEditedTodo] = useState(todo);

    const handleSave = () => {
        updateTodo(todo.id, editedTodo);
        setIsEditing(false);
    };

    const handleToggleCompleted = () => {
        const updatedTodo = {
            ...editedTodo,
            completed: !editedTodo.completed,
            completedDate: !editedTodo.completed ? new Date().toLocaleDateString() : ''
        };
        setEditedTodo(updatedTodo);
        updateTodo(todo.id, updatedTodo);
    };

    return (
        <tr>
            <td>
                {isEditing ? (
                    <Input
                        type="text"
                        value={editedTodo.text}
                        onChange={e => setEditedTodo({ ...editedTodo, text: e.target.value })}
                    />
                ) : (
                    todo.text
                )}
            </td>
            <td>
                <Input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={handleToggleCompleted}
                />
            </td>
            <td>
                {todo.completed ? todo.completedDate : 'Не завершено'}
            </td>
            <td>
                {isEditing ? (
                    <Button color="success" onClick={handleSave}>Сохранить</Button>
                ) : (
                    <Button color="warning" onClick={() => setIsEditing(true)}>Изменить</Button>
                )}
                <Button color="danger" onClick={() => deleteTodo(todo.id)}>Удалить</Button>
            </td>
        </tr>
    );
}

export default TodoItem;