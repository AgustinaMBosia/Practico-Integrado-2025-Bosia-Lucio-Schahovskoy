import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

/**
 * Componente AxiosInterceptor para manejar errores 401 Unauthorized globalmente.
 * Cierra la sesión del usuario y redirige a la página de inicio cuando ocurre un error 401.
 */

const AxiosInterceptor = () => {
  const { logout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) {
          logout();
          navigate('/');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [logout, navigate]);

  return null;
};

export default AxiosInterceptor;
