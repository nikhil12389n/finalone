// src/contexts/UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [cookies] = useCookies([]);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        if (cookies.jwt) {
          const { data } = await axios.post('http://localhost:4000', {}, { withCredentials: true });
          if (data.status) {
            setUser(data.user);
          }
          else{
            
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    verifyUser();
  }, [cookies.jwt]);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => React.useContext(UserContext);
