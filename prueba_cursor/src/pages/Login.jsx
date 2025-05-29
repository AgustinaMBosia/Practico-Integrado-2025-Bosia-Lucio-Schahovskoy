import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

      // Guardar datos del usuario (ajusta según la respuesta de tu API)
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token); // Si usas JWT

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
    <div className="form-container">
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