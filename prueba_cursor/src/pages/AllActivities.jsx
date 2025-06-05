import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../styles/Activities.css';

import Icons from '../components/Icons';
import ActivityList from '../components/ActivityList';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const AllActivities = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, isLoggedIn } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();

        const fetchActivities = async () => {
            try {
                const response = await axios.get('http://localhost:8080/actividad', {
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
            {/* Botón solo para admins */}
            {isLoggedIn && user.Rol === 'admin' && (
                <button
                    style={{
                        position: 'absolute',
                        top: '2vw',
                        right: '2vw',
                        zIndex: 100,
                        padding: '0.7vw 1.5vw',
                        background: '#2400ff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '1vw',
                        fontWeight: 'bold',
                        fontSize: '1.2vw',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                    onClick={() => navigate('/NewActivity')}
                >
                    + Nueva Actividad
                </button>
            )}
            <div className='activities-container'>
                {loading ? (
                    <p>Cargando actividades...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <ActivityList 
                        activities={activities}
                        title="Todas las actividades"
                        emptyMessage="No hay actividades disponibles en este momento"
                    />
                )}
            </div>
            <div>
                <Icons showHome={true} showUser={true} showMenu={false}/>
            </div>
        </div>
    );
};

export default AllActivities;