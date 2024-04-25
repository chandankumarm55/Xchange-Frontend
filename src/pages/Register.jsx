import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import toast from "react-hot-toast";

import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem('chat-app')) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same."
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters."
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters."
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.");
      return false;
    }



    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg);
      }
      if (data.status === true) {
        localStorage.setItem(
          'chat-app',
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  };

  return (
    <>

      <FormContainer>
        <span style={ { background: 'transparent', fontSize: 'small', color: 'orange', padding: '0.5rem', borderRadius: '0.5rem' } }>Please have patience as we are using the free version of the server.</span>

        <form action="" onSubmit={ (event) => handleSubmit(event) }>
          <div className="brand">
            <img src={ Logo } alt="logo" />
            <h1>x-Change</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={ (e) => handleChange(e) }
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={ (e) => handleChange(e) }
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={ (e) => handleChange(e) }
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={ (e) => handleChange(e) }
          />
          <button type="submit">Sing Up</button>
          <span>
            Already have an account ? <Link to="/login">Sing In</Link>
          </span>
        </form>
      </FormContainer>

    </>
  );
}

const FormContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
color:white;
flex-direction: column;
justify-content: center;
gap: 0.5rem;
align-items: center;
background-color: black;
.brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  img {
    height: 3rem;
  }
  h1 {
    color: white;
    text-transform: uppercase;
  }
}

form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: transparent;
  border-radius: 2rem;
  padding: 3rem;
  box-shadow: 5px 5px 10px white;
}
input {
  background-color: transparent;
  padding: 1rem;
  border: 0.1rem solid #464D3D;
  border-radius: 0.4rem;
  color:white;
  width: 100%;
  font-size:larger;
  &:focus {
    border: 0.1rem solid #464D3D;
    outline: none;
  }
}
button {
  background-color:#08c;
  color: white;
  padding: 1rem 2rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  &:hover {
    background-color: #4e0eff;
  }
}
span {
  color:#1877f2 ;
  text-transform: uppercase;
  a {
    color: #464D3D;
    text-decoration: none;
    font-weight: bold;
  }
}
@media screen and (max-width: 480px) {
  .brand {
    gap: 0.2rem;
    img {
      height: 2rem;
    }
    h1 {
      font-size: large; /* Corrected property name */
    }
  }
}
`;
