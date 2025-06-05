import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../styles/Activities.css';

import Icons from '../components/Icons';
import ActivityList from '../components/ActivityList';

const MyActivities = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();

        const fetchActivities = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/usuario/${userId}/actividad`, {
                    cancelToken: cancelToken.token
                });
                setActivities(response.data);
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
    }, []);
    
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