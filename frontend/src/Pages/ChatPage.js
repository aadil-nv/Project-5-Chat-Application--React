import React, { useEffect } from "react";
import axios from 'axios'
import { useState } from "react";

const ChatPage = () => {
    const [chats,setChats] = useState([])  
    const fetchChats = async  ()=>{
        const data = axios.get('/api/chat')
        setChats(data);
    };
    useEffect(()=>{
        fetchChats()
    },[])
  return <div>{chats.map(chat=><div key={chat.id}>{chat.chatName}</div>)}</div>;
};

export default ChatPage;
