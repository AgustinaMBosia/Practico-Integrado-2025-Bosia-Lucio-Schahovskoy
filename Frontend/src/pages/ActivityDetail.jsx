import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import '../styles/ActivityDetail.css';
import Icons from '../components/Icons';
import axios from 'axios';

const ActivityDetail = () => {
  // Obtiene el ID de la actividad desde la URL
  const { id } = useParams();

  // Obtiene datos del usuario logueado desde el contexto
  const { user, token, isLoggedIn, isAdmin, logout } = useUser();

  // Permite redirigir a otras páginas
  const navigate = useNavigate();

  // Estados locales
  const [activity, setActivity] = useState(null); // Guarda los datos de la actividad
  const [loading, setLoading] = useState(true);   // Controla el estado de carga
  const [error, setError] = useState(null);       // Guarda errores de carga
  const [isEnrolled, setIsEnrolled] = useState(false); // Indica si el usuario ya está inscripto

  // Función para inscribirse en la actividad
  const handleEnroll = async () => {
    if (!isLoggedIn || !user?.Id || !token) {
      alert("Debes iniciar sesión para inscribirte.");
      return;
    }

    try {
      // Envía POST al backend para registrar inscripción
      const response = await axios.post(
        'http://localhost:8080/inscripcion',
        {
          fecha: new Date().toISOString().split('T')[0],
          actividad_id: parseInt(id),
          usuario_id: parseInt(user.Id),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Inscripción exitosa:", response.data);
      alert("Inscripción exitosa");
      setIsEnrolled(true);
    } catch (error) {
      // Si el token expiró, cerrar sesión y redirigir
      if (error.response?.status === 401) {
        logout();
        navigate('/');
      } else {
        console.error("Error al inscribirse:", error);
        alert("Error al inscribirse");
      }
    }
  };

  // Función para desinscribirse de la actividad
  const handleUnenroll = async () => {
    if (!isLoggedIn || !user?.Id || !token) {
      alert("Debes iniciar sesión.");
      return;
    }

    try {
      // Envía DELETE al backend para quitar la inscripción
      await axios.delete(
        `http://localhost:8080/inscripcion/usuario/${user.Id}/actividad/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Desinscripción exitosa");
      setIsEnrolled(false);
    } catch (error) {
      if (error.response?.status === 401) {
        logout();
        navigate('/');
      } else {
        console.error("Error al desinscribirse:", error);
        alert("Error al desinscribirse");
      }
    }
  };

  // Carga los datos de la actividad y verifica si el usuario está inscripto
  useEffect(() => {
    // Carga la información completa de la actividad
    const fetchActivity = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/actividad/${id}`);
        setActivity(res.data);
      } catch (err) {
        setError('Error al cargar la actividad');
      } finally {
        setLoading(false);
      }
    };

    // Verifica si el usuario ya está inscripto en esta actividad
    const checkEnrollment = async () => {
      if (!user?.Id || !token) return;
      try {
        const res = await axios.get(
          `http://localhost:8080/inscripcion/usuario/${user.Id}/actividad/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.data) setIsEnrolled(true);
      } catch (err) {
        if (err.response?.status === 401) {
          logout();
          navigate('/');
        } else if (err.response?.status !== 404) {
          console.error("Error al verificar inscripción:", err);
        }
      }
    };

    fetchActivity(); // Ejecuta la carga de actividad
    if (isLoggedIn) checkEnrollment(); // Solo si está logueado, verifica inscripción
  }, [id, user, token, isLoggedIn, logout, navigate]);

  // Renderizado condicional según estado de carga o errores
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!activity) return <div>No se encontró la actividad</div>;

  return (
    <div className='background-activity-detail'>
      {/* Íconos fijos de navegación */}
      <Icons showHome={true} showUser={true} showMenu={true} />

      {/* Título de la actividad */}
      <div className='nombre-actividad'>{activity.titulo}</div>

      {/* Información detallada */}
      <div className='details-container'>
        <div className='tupla'><div className='nombre-atributo'>Horario:</div><div className='valor-atributo'>{activity.horario}</div></div>
        <div className='tupla'><div className='nombre-atributo'>Día:</div><div className='valor-atributo'>{activity.dia}</div></div>
        <div className='tupla'><div className='nombre-atributo'>Cupo:</div><div className='valor-atributo'>{activity.cupo}</div></div>
        <div className='tupla'><div className='nombre-atributo'>Categoría:</div><div className='valor-atributo'>{activity.Categoria_description || 'Por asignar'}</div></div>
        <div className='tupla'><div className='nombre-atributo'>Profesor:</div><div className='valor-atributo'>{activity.nombre_instructor || 'Por asignar'}</div></div>
        <div className='tupla'><div className='nombre-atributo'>Descripción:</div><div className='valor-atributo'>{activity.descripcion || 'No hay descripción disponible'}</div></div>
      </div>

      {/* Imagen de la actividad */}
      <div className='imagen-container'>
        <img src={activity.imagen} alt="Imagen de la actividad" className='imagen' />
      </div>

      {/* Botón para inscribirse o desinscribirse */}
      {isLoggedIn && (
        <button
          className={`enroll-button ${isEnrolled ? 'enrolled' : ''}`}
          onClick={isEnrolled ? handleUnenroll : handleEnroll}
        >
          {isEnrolled ? 'Desinscribirse' : 'Inscribirse'}
        </button>
      )}

      {/* Botones para admin: eliminar y editar actividad */}
      {isAdmin && (
        <div className='admin-buttons-activity-detail'>
          <button
            className='delete-button-activity-detail'
            onClick={() => {
              if (window.confirm("¿Estás seguro de que quieres eliminar esta actividad?")) {
                axios.delete(`http://localhost:8080/actividad/${id}`, {
                  headers: { Authorization: `Bearer ${token}` },
                })
                  .then(() => {
                    alert("Actividad eliminada exitosamente");
                    navigate('/AllActivities');
                  })
                  .catch(err => {
                    console.error("Error al eliminar la actividad:", err);
                    alert("Error al eliminar la actividad");
                  });
              }
            }}
            title="Eliminar actividad"
          />
          <button
            className='edit-button-activity-detail'
            onClick={() => navigate(`/EditActivity/${id}`)}
            title="Editar actividad"
          />
        </div>
      )}
    </div>
  );
};

export default ActivityDetail;