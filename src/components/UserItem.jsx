import React, { useState } from 'react';
import { Button, Input } from 'reactstrap';
// import './UserItem.css';

function UserItem({ user, updateUser, deleteUser }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(user);

    const handleSave = () => {
        updateUser(user.id, editedUser);
        setIsEditing(false);
    };

    return (
        <tr>
            <td>
                {isEditing ? (
                    <Input
                        type="text"
                        value={editedUser.name}
                        onChange={e => setEditedUser({ ...editedUser, name: e.target.value })}
                    />
                ) : (
                    user.name
                )}
            </td>
            <td>
                {isEditing ? (
                    <Input
                        type="checkbox"
                        checked={editedUser.hired}
                        onChange={e => setEditedUser({ ...editedUser, hired: e.target.checked })}
                    />
                ) : (
                    user.hired ? 'Нанят' : 'Не нанят'
                )}
            </td>
            <td>
                {isEditing ? (
                    <Button color="success" onClick={handleSave}>Сохранить</Button>
                ) : (
                    <Button color="warning" onClick={() => setIsEditing(true)}>Изменить</Button>
                )}
                <Button color="danger" onClick={() => deleteUser(user.id)}>Удалить</Button>
            </td>
        </tr>
    );
}

export default UserItem;
