import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <div className="header">
    </div>
  );
};

export default Header;