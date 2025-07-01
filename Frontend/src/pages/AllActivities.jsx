import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../styles/Activities.css';

import Icons from '../components/Icons';
import ActivityList from '../components/ActivityList';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const AllActivities = () => {
    // Estados locales
    const [activities, setActivities] = useState([]);      // Guarda la lista de actividades
    const [loading, setLoading] = useState(true);          // Estado de carga
    const [error, setError] = useState(null);              // Manejo de errores

    // Acceso al contexto de usuario
    const { user, isLoggedIn, isAdmin } = useUser();

    // Hook de navegación
    const navigate = useNavigate();

    // Efecto que carga todas las actividades al montar el componente
    useEffect(() => {
        const cancelToken = axios.CancelToken.source(); // Permite cancelar la petición si el componente se desmonta

        const fetchActivities = async () => {
            try {
                // Solicita todas las actividades desde el backend
                const response = await axios.get('http://localhost:8080/actividad', {
                    cancelToken: cancelToken.token
                });
                setActivities(response.data); // Actualiza el estado con la respuesta
            } catch (err) {
                // Si ocurre un error (y no es por cancelación), lo guarda en el estado
                if (!axios.isCancel(err)) {
                    setError(err.response?.data?.message || 'Error al cargar las actividades');
                }
            } finally {
                setLoading(false); // Finaliza el estado de carga
            }
        };

        fetchActivities(); // Ejecuta la carga

        return () => {
            cancelToken.cancel(); // Limpieza: cancela la petición si el componente se desmonta
        };
    }, []); // Solo se ejecuta al montar el componente

    return (
        <div className='background-container'>
            {/* Botón para crear nueva actividad: solo visible si es admin */}
            {isLoggedIn && isAdmin && (
                <button
                    className='new-activity-button'
                    onClick={() => navigate('/NewActivity')} // Redirige a la página de creación
                    alt="Crear nueva actividad"
                    title="Crear nueva actividad"
                >
                </button>
            )}

            {/* Contenedor principal de actividades */}
            <div className='activities-container'>
                {loading ? (
                    // Mensaje si está cargando
                    <p>Cargando actividades...</p>
                ) : error ? (
                    // Mensaje de error
                    <p>{error}</p>
                ) : (
                    // Lista de actividades
                    <ActivityList
                        activities={activities}
                        title="Todas las actividades"
                        emptyMessage="No hay actividades disponibles en este momento"
                    />
                )}
            </div>

            {/* Íconos de navegación inferiores */}
            <div>
                <Icons showHome={true} showUser={true} showMenu={false} />
            </div>
        </div>
    );
};

export default AllActivities;