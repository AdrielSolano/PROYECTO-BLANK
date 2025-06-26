import { estadoLoginGlobal } from '../context/contextdata';
import React, { useState } from 'react';

export default function StateLogin({ children }) {
  const [perfil, setPerfil] = useState();
  const [isLogin, setIsLogin] = useState(false);

  const login = () => setIsLogin(true);
  const logout = () => setIsLogin(false);
  

  return (
    <estadoLoginGlobal.Provider value={{ login, logout, perfil, isLogin }}>
      {children}
    </estadoLoginGlobal.Provider>
  );
}