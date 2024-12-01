import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const RecentChatsComponent = ({ chats, onSelectChat, onCreateChat }) => {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [groupEmails, setGroupEmails] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEmail('');
        setGroupEmails('');
    };

    const handleCreateChat = () => {
        if (email) {
            onCreateChat([email]);
        } else if (groupEmails) {
            onCreateChat(groupEmails.split(',').map(email => email.trim()));
        }
        handleClose();
    };

    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                <AddIcon />
            </IconButton>
            <List>
                {chats.map((chat, index) => (
                    <ListItem button key={index} onClick={() => onSelectChat(chat)}>
                        <ListItemText primary={chat.name} />
                    </ListItem>
                ))}
            </List>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create New Chat</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Email ID"
                        type="email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        helperText="Enter a single email ID for a one-on-one chat"
                    />
                    <TextField
                        margin="dense"
                        label="Group Emails"
                        type="text"
                        fullWidth
                        value={groupEmails}
                        onChange={(e) => setGroupEmails(e.target.value)}
                        helperText="Enter multiple email IDs separated by commas for a group chat"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleCreateChat} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default RecentChatsComponent;