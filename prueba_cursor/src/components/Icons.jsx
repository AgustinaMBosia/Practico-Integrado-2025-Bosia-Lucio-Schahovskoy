import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import HomeIcon from '../styles/images/homeicon.svg';
import UserIcon from '../styles/images/usericon.svg';
import MenuIcon from '../styles/images/menuicon.svg';

import Activities from '../pages/activities';

import '../styles/Icon.css';

const Icons = ({
  showHome = true,
  showUser = true,
  showMenu = true
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);
  const navigate = useNavigate();

  const handleHomeClick = () => navigate('/');
  const handleUserClick = () => setShowUserMenu(!showUserMenu);
  const handleMisActividades = () => navigate('/MyActivities');
  const handleLogout = () => navigate('/Login');
  const handleMenuClick = () => navigate('/Activities');
  return (
    <div className="icon-container">

      {/* Contenedor fijo para Home */}
      <div
        className="icon-wrapper"
        style={{ visibility: showHome ? 'visible' : 'hidden' }}
      >
        <img
          src={HomeIcon}
          className="icon"
          alt="Inicio"
          onClick={handleHomeClick}
        />
      </div>

      {/* Contenedor fijo para User */}
      <div
        className="icon-wrapper"
        style={{ visibility: showUser ? 'visible' : 'hidden', position: 'relative' }}
      >
        <img
          src={UserIcon}
          className="icon"
          alt="Usuario"
          onClick={handleUserClick}
        />
        {showUserMenu && (
          <div className="user-menu">
            <button className="user-menu-button" onClick={handleMisActividades}>Mis actividades</button>
            <button className="user-menu-button" onClick={handleLogout}>Cerrar sesión</button>
          </div>
        )}
      </div>

      {/* Contenedor fijo para Menu */}
      <div
        className="icon-wrapper"
        style={{ visibility: showMenu ? 'visible' : 'hidden' }}
      >
        <img
          src={MenuIcon}
          className="icon"
          alt="Menú"
          onClick={handleMenuClick}
        />
      </div>    

    </div>
  );
};

export default Icons;
