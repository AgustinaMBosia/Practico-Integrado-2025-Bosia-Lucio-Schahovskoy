// Importa hooks de React y dependencias necesarias
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../context/UserContext';

import '../styles/Login.css';

const Login = () => {
  // Estados para campos de entrada, errores y estado de carga
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Hook de navegación de React Router
  const { login } = useUser(); // Función login del contexto de usuario

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que se recargue la página
    setError('');
    setLoading(true);

    // Validación básica: campos vacíos
    if (!username || !password) {
      alert('Por favor complete todos los campos');
      setLoading(false);
      return;
    }

    try {
      // Envía los datos al backend para autenticación
      const response = await axios.post('http://localhost:8080/login', {
        Username: username,
        Password: password
      });

      // Verifica que la respuesta tenga token y datos de usuario
      if (!response.data || !response.data.token || !response.data.user) {
        throw new Error('Respuesta inválida del servidor');
      }

      // Crea el objeto con los datos del usuario logueado
      const userData = {
        Id: response.data.user.id,
        Email: response.data.user.email,
        Rol: response.data.user.rol,
        Username: response.data.user.username,
      };

      // Verifica que se haya recibido un ID válido
      if (!userData.Id) {
        throw new Error('Datos de usuario inválidos');
      }

      // Llama a la función login del contexto para guardar sesión
      login(userData, response.data.token);

      // Pequeño retraso antes de redirigir para asegurar actualización de estado
      setTimeout(() => {
        navigate('/Home', { replace: true });
      }, 100);

    } catch (err) {
      // Si hay error, lo muestra por consola y alerta al usuario
      console.error('Error en login:', err);
      alert('Usuario o contraseña incorrectos');
      setUsername(''); // Limpia el campo usuario
      setPassword(''); // Limpia el campo contraseña
    } finally {
      setLoading(false);
    }
  };

  // Render del formulario
  return (
    <div className='background-login'>
      <div className="form-container-login">
        <div className='title'>Iniciar Sesión</div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Usuario:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Actualiza el estado
              placeholder="Escriba su usuario aquí"
              required
              autoFocus
            />

            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Actualiza el estado
              placeholder="Escriba su contraseña aquí"
              required
            />
          </div>

          {/* Botón de enviar, muestra "Cargando..." si está en proceso */}
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