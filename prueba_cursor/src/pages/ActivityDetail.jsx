import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ActivityDetail.css';
import Icons from '../components/Icons';
import axios from 'axios';

const ActivityDetail = () => {
    const { id } = useParams(); // ⬅️ Captura el ID desde la URL
    const [activity, setActivity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEnrolled, setIsEnrolled] = useState(false);

    const handleEnroll = () => {
        axios.post(`http://localhost:8080/inscripcion`, {
            id_usuario: 1,
            id_actividad: id
        }).then(response => {
            console.log("Respuesta desde axios:", response.data);
        }).catch(error => {
            console.error("Error al inscribirse:", error);
        });
        setIsEnrolled(true);
    };

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/actividad/${id}`);
                console.log("Respuesta desde axios:", res.data);
                setActivity(res.data);

            } catch (err) {
                setError('Error al cargar la actividad');
            } finally {
                setLoading(false);
            }
        };
        fetchActivity();
    }, [id]);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;
    if (!activity) return <div>No se encontró la actividad</div>;

    console.log("Actividad:", activity);
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
            <button className='enroll-button' onClick={handleEnroll}>{isEnrolled ? 'Inscripción exitosa' : 'Inscribirse'}</button>
        </div>
    );
};

export default ActivityDetail;