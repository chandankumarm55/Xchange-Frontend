import React, { useState, useEffect, useRef } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef();

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg + emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  const handleClickOutsideEmojiPicker = (event) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target)
    ) {
      setShowEmojiPicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideEmojiPicker);

    return () => {
      document.removeEventListener("click", handleClickOutsideEmojiPicker);
    };
  }, []);

  return (
    <Container>
      <div className="button-container">
        <BsEmojiSmileFill
          onClick={ handleEmojiPickerhideShow }
          size={ 35 }
          ref={ emojiPickerRef }
        />
        { showEmojiPicker && (
          <Picker
            onEmojiClick={ handleEmojiClick }
            ref={ emojiPickerRef }
          />
        ) }
      </div>
      <form className="input-container" onSubmit={ sendChat }>
        <input
          type="text"
          placeholder="Type your message here"
          value={ msg }
          onChange={ (e) => setMsg(e.target.value) }
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color:#202c33;
  align-items: center;
  .button-container {
    display: flex;
    align-items: center;
    margin-right: 1rem;
    margin-left:0.5rem;
    color:white;
  }

  .emoji-picker-react {
    height:50%;
    position: absolute;
    bottom: 120px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px;
    z-index: 1;
  }

  .input-container {
    flex: 1;
    height: 60px;
    display: flex;
    align-items: center;
    border:1px solid white;
    background-color: transparent;
    border-radius: 30px;
    padding: 0 1rem;

    input {
      flex: 1;
      height: 100%;
      background-color: transparent;
      color: white;
      border: none;
      font-size: large;
      outline: none;
      &::placeholder {
        color: #aaa;
      }
    }

    button {
      padding: 0.5rem;
      border-radius: 50%;
      color:white;
      background-color:transparent;
      border: none;
      cursor: pointer;

      svg {
        font-size: 2rem;
        color: #fff;
      }
    }
  }
  @media screen and (max-width: 480px) {
    .button-container{
      margin:0px;
    }
    .input{
      width:10px;
    }
    .input-container{
      height:70px;
    }
  }
 

`;
