import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

export default function Welcome() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem('chat-app');

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (parsedData && parsedData.username) {
        setUserName(parsedData.username);
      }
    }
  }, []);

  return (
    <Container>

      <h1>
        Welcome, <span>{ userName }!</span>
      </h1>
      <h3>Please select a chat to start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  flex-direction: column;
  background-color: #222e35;
  color:white;



  span {
    color: #4e0eff;
  }

  @media (max-width: 600px) {
 
    h1 {
      font-size: 1.5em;
    }

    h3 {
      font-size: 0.8em;
    }
  }
`;
