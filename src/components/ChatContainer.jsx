import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";
import { FaArrowLeft } from "react-icons/fa";

export default function ChatContainer({ currentChat, socket, setCurrentChat }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem('chat-app')
    );
    const response = await axios.post(recieveMessageRoute, {
      from: data._id,
      to: currentChat._id,
    });
    setMessages(response.data);
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem('chat-app')
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);


  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem('chat-app')
    );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleBack = () => {
    setCurrentChat(undefined)

    sessionStorage.clear();
  }


  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className='back' >
            <FaArrowLeft size={ 27 } onClick={ handleBack } />
          </div>
          <div className="avatar">

            <img
              src={ `https://ui-avatars.com/api/?name=${currentChat.username}&rounded=true&background=random` }
              alt=""
            />
          </div>
          <div className="username">
            <h3>{ currentChat.username }</h3>
          </div>
        </div>

      </div>
      <div className="chat-messages">
        { messages.map((message) => {
          return (
            <div ref={ scrollRef } key={ uuidv4() }>
              <div
                className={ `message ${message.fromSelf ? "sended" : "recieved"
                  }` }
              >
                <div className="content ">
                  <p>{ message.message }</p>
                </div>
              </div>
            </div>
          );
        }) }
      </div>
      <ChatInput handleSendMsg={ handleSendMsg } />
    </Container>
  );
}

const Container = styled.div`
display: grid;
grid-template-rows: 11% 75% 14%;
gap: 0.1rem;
overflow: hidden;
background-color: #0b141a;
  @media screen and (max-width: 480px) {
    grid-template-rows: 20% 60% 20%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.5rem;
    background-color:#202c33;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .back{
        cursor: pointer;
        svg{
          color:#c4cacf;
        }
      }
      .avatar {
        img {
          height: 2.5rem;
        }
      }
      .username {
        h3 {
          color: white;
          font-size: 1.5rem;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    height:100%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 0.5rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: white;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #005c4b;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #1d272e;
      }
    }
  }
   @media screen and (max-width: 480px) {
    .chat-header {
      width:100%;
    }
  }
`;
