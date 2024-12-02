import React, { useState, useEffect } from 'react';
import MessageComponent from './MessageComponent';
import RecentChatsComponent from './RecentChatsComponent';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TopBar from './TopBar';
import { db } from '../firebase';
import { collection, addDoc, query, where, onSnapshot } from 'firebase/firestore';

export const Homepage = ({ user }) => {
    console.log(user);
    const [selectedChat, setSelectedChat] = useState(null);
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (user && user.username) {
            const q = query(collection(db, 'chats'));
            console.log("Q", q)
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const chatsData = [];
                querySnapshot.forEach((doc) => {
                    chatsData.push({ id: doc.id, ...doc.data() });
                });
                console.log("Chats Data", chatsData)
                setChats(chatsData);
            });

            return () => unsubscribe();
        }
    }, [user]);

    useEffect(() => {
        //console.log("selected0", selectedChat.id)
        if (selectedChat) {
            const q = query(collection(db, 'chats', selectedChat.id, 'messages'));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const messagesData = [];
                querySnapshot.forEach((doc) => {
                    messagesData.push({ id: doc.id, ...doc.data() });
                });
                setMessages(messagesData);
                console.log("m", messagesData)
            });

            return () => unsubscribe();
        }
    }, [selectedChat]);

    const sendMessage = async (message) => {
        if (selectedChat && user && user.username) {
            const recipientEmail = selectedChat.email || 'unknown'; // Default to 'unknown' if email is not defined
            await addDoc(collection(db, 'chats', selectedChat.id, 'messages'), {
                text: message,
                createdAt: new Date(),
                sender: user.username,
                recipient: recipientEmail,
            });
        }
    };

    const createChat = async (email) => {
        const chatName = `Chat with ${email}`;
        await addDoc(collection(db, 'chats'), {
            name: chatName,
            emails: [email],
            messages: [],
        });
    };

    const handleSelectChat = (chat) => {
        console.log("Selected chat:", chat); // Add this line
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