import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import Login from "./Login";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('chat-app'));
    if (!user) {
      navigate('/login');
    } else {
      setCurrentUser(user);
      socket.current = io(host);
      socket.current.emit("add-user", user._id);
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data);
        setLoading(false); // Set loading to false after fetching contacts
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);

  useEffect(() => {
    const storedChat = JSON.parse(sessionStorage.getItem('currentChat'));
    if (storedChat) {
      setCurrentChat(storedChat);
    }
  }, []);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
    sessionStorage.setItem('currentChat', JSON.stringify(chat));
  };


  if (loading || !currentUser) {
    return <Login />;
  }

  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={ contacts } changeChat={ handleChatChange } />
          { currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={ currentChat } socket={ socket } setCurrentChat={ setCurrentChat } />
          ) }
        </div>
      </Container>
      <Error>
        <h1>
          This chat application is best suited for larger screens. Please switch to desktop view.
        </h1>
      </Error>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: white;
  .container {
    border: 2px solid black;
    height: 100vh;
    width: 100vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 35% 65%;
  }
  @media screen and (max-width: 480px) {
    .container {
      grid-template-columns: 30% 70%;
    }
  }
`;

const Error = styled.div`
  display: none;
  color: white;
  text-align: center;
  margin-top: 1rem;

  @media screen and (max-width: 480px) {
    display: block;
  }

  h1 {
    display: none;
  }
`;
