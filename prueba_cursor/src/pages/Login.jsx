import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../context/UserContext';

import '../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!username || !password) {
      setError('Por favor complete todos los campos');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/login', {
        Username: username,
        PasswordHash: password
      });

      // Guardar datos del usuario usando el contexto
      const userData = {
        Id: response.data.Id,
        Nombre: response.data.Nombre,
        Email: response.data.Email,
        Rol: response.data.Rol,
      };
      login(userData, response.data.token);

      navigate('/Home'); // Redirigir al área privada

    } catch (err) {
      setError(
        err.response?.data?.message || 
        err.message || 
        'Error al iniciar sesión'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='background-login'>
    <div className="form-container-login">
      <div className='title'>Iniciar Sesión</div>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Usuario:</label>
          <input 
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Escriba su usuario aquí"
            required
            autoFocus
          />
          <label>Contraseña:</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Escriba su contraseña aquí"
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="submit"
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Ingresar'}
        </button>
      </form>
    </div>
    </div>
  );
};


export default Login;