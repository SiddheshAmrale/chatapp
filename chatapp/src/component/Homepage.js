import React, { useState, useEffect } from 'react';
import MessageComponent from './MessageComponent';
import RecentChatsComponent from './RecentChatsComponent';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TopBar from './TopBar';
import { db } from '../firebase';
import { collection, addDoc, query, where, onSnapshot, or } from 'firebase/firestore';

export const Homepage = ({ user }) => {
    console.log(user);
    const [selectedChat, setSelectedChat] = useState(null);
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (user && user.username) {
            const q = query(collection(db, 'chats'), where('emails', 'array-contains', user.username));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const chatsData = [];
                querySnapshot.forEach((doc) => {
                    chatsData.push({ id: doc.id, ...doc.data() });
                });
                setChats(chatsData);
            });

            return () => unsubscribe();
        }
    }, [user]);

    useEffect(() => {
        if (selectedChat && user && user.username) {
            const q = query(
                collection(db, 'chats', selectedChat.id, 'messages'),
                or(
                    where('recipient', '==', user.username),
                    where('sender', '==', user.username)
                )
            );
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const messagesData = [];
                querySnapshot.forEach((doc) => {
                    messagesData.push({ id: doc.id, ...doc.data() });
                });
                setMessages(messagesData);
            });

            return () => unsubscribe();
        }
    }, [selectedChat, user]);

    const sendMessage = async (message) => {
        if (selectedChat && user && user.email) {
            await addDoc(collection(db, 'chats', selectedChat.id, 'messages'), {
                text: message,
                createdAt: new Date(),
                sender: user.email,
                recipient: selectedChat.email, // Assuming selectedChat has an email field
            });
        }
    };

    const createChat = async (emails) => {
        const chatName = Array.isArray(emails) ? `Group Chat (${emails.join(', ')})` : `Chat with ${emails}`;
        await addDoc(collection(db, 'chats'), {
            name: chatName,
            emails: Array.isArray(emails) ? emails : [emails],
            messages: [],
        });
    };

    const handleSelectChat = (chat) => {
        setSelectedChat(chat);
    };

    return (
        <div>
            <TopBar user={user} />
            <Box p={2}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <RecentChatsComponent chats={chats} onSelectChat={handleSelectChat} onCreateChat={createChat} />
                    </Grid>
                    <Grid item xs={9}>
                        {selectedChat ? (
                            <div>
                                <h2>{selectedChat.name}</h2>
                                <Box>
                                    {messages.map((message, index) => (
                                        <div key={index}>
                                            <strong>{message.sender}:</strong> {message.text}
                                        </div>
                                    ))}
                                </Box>
                                <MessageComponent sendMessage={sendMessage} />
                            </div>
                        ) : (
                            <div>Select a chat to start messaging</div>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default Homepage;