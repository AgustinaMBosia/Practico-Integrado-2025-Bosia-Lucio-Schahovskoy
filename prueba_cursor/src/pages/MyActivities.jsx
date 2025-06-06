import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';

import '../styles/Activities.css';

import Icons from '../components/Icons';
import ActivityList from '../components/ActivityList';

const MyActivities = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, isLoggedIn } = useUser();

    useEffect(() => {
        if (!isLoggedIn) {
            setError('Debes iniciar sesión para ver tus actividades.');
            setLoading(false);
            return;
        }
        const cancelToken = axios.CancelToken.source();

        const fetchActivities = async () => {
            try {
                const inscripcionesRes = await axios.get(
                    `http://localhost:8080/inscripcion/usuario/${user.Id}`,
                    { cancelToken: cancelToken.token }
                );
        
                const inscripciones = inscripcionesRes.data;
        
                // Para cada actividad_id, pedimos la actividad
                const actividadesPromises = inscripciones.map(insc =>
                    axios.get(`http://localhost:8080/actividad/${insc.actividad_id}`, {
                        cancelToken: cancelToken.token
                    }).then(res => res.data)
                );
        
                // Esperamos todas las actividades
                const actividades = await Promise.all(actividadesPromises);
        
                setActivities(actividades);
            } catch (err) {
                if (!axios.isCancel(err)) {
                    setError(err.response?.data?.message || 'Error al cargar las actividades');
                }
            } finally {
                setLoading(false);
            }
        };
        

        fetchActivities();

        return () => {
            cancelToken.cancel();
        };
    }, [user.Id, isLoggedIn]);
    
    return (
        <div className='background-container'>
            <div>
                <Icons showHome={true} showUser={true} showMenu={true}/>
            </div>
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