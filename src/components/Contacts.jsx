import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CiSearch } from "react-icons/ci";
import Logout from "./Logout";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [search, setSearch] = useState('');
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [contactDetailsVisible, setContactDetailsVisible] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('chat-app'));
    setCurrentUserName(data.username);
    setIsLoaded(true);
    if (contacts) {
      setFilteredContacts(contacts);
    }
  }, [contacts]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  const toggleContactDetails = () => {
    setContactDetailsVisible((prevVisible) => !prevVisible);
  };

  useEffect(() => {
    if (search.trim() === '') {
      setFilteredContacts(contacts);
    } else {
      const filtered = contacts.filter(contact =>
        contact.username.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredContacts(filtered);
    }
  }, [search, contacts]);

  return (
    <>
      { isLoaded && (
        <Container>
          <div className="brand">
            <div className="search">
              <CiSearch />
              <input
                type='text'
                placeholder='Search for contacts'
                value={ search }
                onChange={ (e) => setSearch(e.target.value) }
              />
            </div>
          </div>
          <div className="contacts">
            { filteredContacts.length > 0 ? (
              filteredContacts.map((contact, index) => (
                <div
                  key={ contact._id }
                  className={ `contact ${index === currentSelected ? "selected" : ""}` }
                  onClick={ () => changeCurrentChat(index, contact) }
                >
                  <div className="avatar">
                    <img
                      src={ `https://ui-avatars.com/api/?name=${contact.username}&rounded=true&background=random` }
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{ contact.username }</h3>
                  </div>
                </div>
              ))
            ) : (
              <p style={ { color: 'white' } }>No contacts found</p>
            ) }
          </div>
          <div className="logout">
            <div className="toggle-arrow" onClick={ toggleContactDetails }>
              <Logout />
            </div>
          </div>
        </Container>
      ) }
    </>
  );
}



const Container = styled.div`
  display: grid;
  grid-template-rows: 15% 75% 10%;
  overflow: hidden;
  background-color: #111b21;

  @media screen and (max-width: 480px) {
    grid-template-rows: 20% 70% 10%;
  }

  .brand {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 100%;
  }
  
  .search {
    display: flex; 
    justify-content: center;
    align-items: center;
    background-color: #222e35;
    width: 100%;
    padding: 5px;
    border-radius: 30px;
  
    svg {
      color: white;
      font-size: 25px;
    }
  
    input {
      width: 90%;
      padding: 10px;
      background-color: transparent;
      border: none;
      outline:none;
      color: white;
      font-size: larger;
    }
  }
  
    
    @media screen and (max-width: 480px) {
      gap: 0rem;
    }

    @media screen and (max-width: 480px) {
      img {
        height: 1.4rem;
      }
    }

    @media screen and (max-width: 480px) {
      h3 {
        font-size: 0.7rem;
      }
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    margin:0;
    &::-webkit-scrollbar {
      width: 0.2rem;
    }
   
    &::-webkit-scrollbar-thumb {
      background-color: #ffffff39;
      width: 0.1rem;
      border-radius: 1rem;
    }

    .contact {
      background-color: transparent;
      min-height: 5rem;
      cursor: pointer;
      width: 100%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      border-bottom:1px solid white;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;

      .avatar {
        img {
          height: 3rem;
        }
      }

      .username {
        h3 {
          color: white;
        }
      }
      &:hover {
        background-color: #222e35; 
      }
  
    }

    .selected {
      background-color: #2a3942;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;

    .toggle-arrow {
      cursor: pointer;
      margin-right: 10px;
    }

    .contact-details {
      display: flex;
      align-items: center;

      .avatar {
        img {
          height: 4rem;
        }
      }

      .username {
        h2 {
          color: white;
        }
      }

      @media screen and (max-width: 480px) {
        .avatar {
          img {
            height: 3rem;
          }
        }
      }
    }
  }
`;

