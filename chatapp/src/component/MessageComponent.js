import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const MessageComponent = ({ sendMessage }) => {
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        sendMessage(message);
        setMessage('');
    };

    return (
        <Box>
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleSendMessage}>
                Send
            </Button>
        </Box>
    );
};

export default MessageComponent;