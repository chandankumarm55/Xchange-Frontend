import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";

export default function Logout() {
  const navigate = useNavigate();

  const handleClick = async () => {
    const id = await JSON.parse(
      localStorage.getItem('chat-app')
    )._id;
    const data = await axios.get(`${logoutRoute}/${id}`);
    if (data.status === 200) {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/login");
    }
  };

  return (
    <Button onClick={ handleClick }>
      <BiPowerOff />
      <h3>Logout</h3>
    </Button>
  );
}

const Button = styled.button`
  
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: transparent;
  color:white;
  border: none;
  cursor: pointer;
  height: 30px;
  width: fit-content;
  margin: 10px auto; 
  
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
    margin-right: 0.5rem; /* Added margin between icon and text */
  }

  h3 {
    color: #ebe7ff;
    margin: 0; /* Remove default margin */
  }
`;
