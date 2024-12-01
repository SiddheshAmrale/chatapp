import React, { useState } from 'react';

const GroupChatComponent = ({ createGroup }) => {
    const [groupName, setGroupName] = useState('');

    const handleCreateGroup = () => {
        createGroup(groupName);
        setGroupName('');
    };

    return (
        <div>
            <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Enter group name"
            />
            <button onClick={handleCreateGroup}>Create Group</button>
        </div>
    );
};

export default GroupChatComponent;