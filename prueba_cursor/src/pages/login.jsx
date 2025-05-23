import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/login.css';

const Login = () => {

  const handleLogin = (e) => {
    
  };

  return (
    <div className="form-container">
      <h2>Iniciar Sesión</h2>
      <form>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" placeholder='Escriba su email aquí...'required />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input type="password" placeholder='Escriba su contraseña aquí...' required />
        </div>
        <button className="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;