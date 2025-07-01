// Importa hooks de React y dependencias necesarias
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';

import '../styles/Activities.css';

import Icons from '../components/Icons';
import ActivityList from '../components/ActivityList';

const MyActivities = () => {
    // Estados para guardar actividades, cargar estado y errores
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Extrae el usuario logueado y el estado de login desde el contexto
    const { user, isLoggedIn } = useUser();

    useEffect(() => {
        // Si el usuario no está logueado, se muestra error y se detiene la carga
        if (!isLoggedIn) {
            setError('Debes iniciar sesión para ver tus actividades.');
            setLoading(false);
            return;
        }

        const cancelToken = axios.CancelToken.source(); // Token para cancelar peticiones si se desmonta el componente

        const fetchActivities = async () => {
            try {
                // Obtiene las inscripciones del usuario desde el backend
                const inscripcionesRes = await axios.get(
                    `http://localhost:8080/inscripcion/usuario/${user.Id}`,
                    { cancelToken: cancelToken.token }
                );

                const inscripciones = inscripcionesRes.data;

                // Si el usuario no tiene inscripciones, setea lista vacía (no es error)
                if (!Array.isArray(inscripciones) || inscripciones.length === 0) {
                    setActivities([]);
                    return;
                }

                // Para cada inscripción, busca los detalles de la actividad asociada
                const actividadesPromises = inscripciones.map(insc =>
                    axios.get(`http://localhost:8080/actividad/${insc.actividad_id}`, {
                        cancelToken: cancelToken.token
                    }).then(res => res.data)
                );

                // Espera a que todas las actividades se carguen
                const actividades = await Promise.all(actividadesPromises);

                setActivities(actividades); // Guarda las actividades cargadas
            } catch (err) {
                // Manejo de errores (excepto si fue una cancelación)
                if (!axios.isCancel(err)) {
                    const mensaje = err.response?.data?.message || err.message;

                    // Si el error indica que no hay inscripciones, no lo trata como error
                    if (mensaje && mensaje.toLowerCase().includes("no inscripciones")) {
                        setActivities([]);
                    } else {
                        setError(mensaje || 'Error al cargar las actividades');
                    }
                }
            } finally {
                setLoading(false); // Finaliza la carga
            }
        };

        fetchActivities(); // Ejecuta la función de carga

        // Cleanup: cancela la petición si se desmonta el componente
        return () => {
            cancelToken.cancel();
        };
    }, [user.Id, isLoggedIn]);

    // Render principal del componente
    return (
        <div className='background-container'>
            {/* Íconos de navegación comunes */}
            <div>
                <Icons showHome={true} showUser={true} showMenu={true} />
            </div>

            {/* Contenedor principal de actividades */}
            <div className='activities-container'>
                {loading ? (
                    <p>Cargando actividades...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <ActivityList
                        activities={activities}
                        title="Mis actividades"
                        emptyMessage="No estás inscrito en ninguna actividad"
                    />
                )}
            </div>
        </div>
    );
};

export default MyActivities;