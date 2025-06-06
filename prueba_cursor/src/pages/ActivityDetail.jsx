import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import '../styles/ActivityDetail.css';
import Icons from '../components/Icons';
import axios from 'axios';

const ActivityDetail = () => {
    const { id } = useParams(); // ID de la actividad
    const { user, isLoggedIn, isAdmin } = useUser();

    const [activity, setActivity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEnrolled, setIsEnrolled] = useState(false);

    // Función para inscribirse
    const handleEnroll = async () => {
        if (!isLoggedIn || !user?.Id) {
            alert("Debes iniciar sesión para inscribirte.");
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8080/inscripcion`, {
                id_usuario: user.Id,
                id_actividad: id
            });
            console.log("Inscripción exitosa:", response.data);
            setIsEnrolled(true);
        } catch (error) {
            console.error("Error al inscribirse:", error);
        }
    };

    // Cargar actividad y verificar si ya está inscripto
    useEffect(() => {
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

        const checkEnrollment = async () => {
            if (!user?.Id) return;
            try {
                const res = await axios.get(`http://localhost:8080/inscripcion/usuario/${user.Id}/actividad/${id}`);
                if (res.data) setIsEnrolled(true);
            } catch (err) {
                if (err.response?.status !== 404) {
                    console.error("Error al verificar inscripción:", err);
                }
            }
        };

        fetchActivity();
        if (isLoggedIn) checkEnrollment();

    }, [id, user, isLoggedIn]);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;
    if (!activity) return <div>No se encontró la actividad</div>;

    return (
        <div className='background-activity-detail'>
            <Icons showHome={true} showUser={true} showMenu={true} />

            <div className='nombre-actividad'>{activity.titulo}</div>

            <div className='details-container'>
                <div className='tupla'>
                    <div className='nombre-atributo'>Horario:</div>
                    <div className='valor-atributo'>{activity.horario}</div>
                </div>

                <div className='tupla'>
                    <div className='nombre-atributo'>Día:</div>
                    <div className='valor-atributo'>{activity.dia}</div>
                </div>

                <div className='tupla'>
                    <div className='nombre-atributo'>Cupo:</div>
                    <div className='valor-atributo'>{activity.cupo}</div>
                </div>

                <div className='tupla'>
                    <div className='nombre-atributo'>Descripción:</div>
                    <div className='valor-atributo'>{activity.Categoria_description || 'Por asignar'}</div>
                </div>

                <div className='tupla'>
                    <div className='nombre-atributo'>Profesor:</div>
                    <div className='valor-atributo'>{activity.nombre_instructor || 'Por asignar'}</div>
                </div>
            </div>

            <div className='imagen-container'>
                <img src={activity.imagen} alt="Imagen de la actividad" className='imagen' />
            </div>

            {isLoggedIn &&(
                <button
                    className='enroll-button'
                    onClick={handleEnroll}
                    disabled={isEnrolled}
                >
                    {isEnrolled ? 'Inscripto' : 'Inscribirse'}
                </button>
            )}
        </div>
    );
};

export default ActivityDetail;
