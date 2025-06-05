import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NewActivity.css';
import Icons from '../components/Icons';
import axios from 'axios';
import { useUser } from '../context/UserContext';

const NewActivity = () => {
    const { user, isLoggedIn } = useUser();
    const navigate = useNavigate();
    const initialForm = {
        titulo: '',
        dia: '',
        horario: '',
        cupo: '',
        categoria: '',
        imagen: '',
        nombre_instructor: '',
        descripcion: '',
    };
    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isLoggedIn || user.Rol !== 'admin') {
        return (
            <div className='background-new-activity'>
                <Icons showHome={true} showUser={true} showMenu={true} />
                <div className="error-message" style={{ margin: '2vw' }}>
                    Acceso denegado. Solo los administradores pueden crear actividades.
                </div>
            </div>
        );
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);
        try {
            await axios.post('http://localhost:8080/actividad', form);
            setSuccess('Actividad creada exitosamente.');
            setForm(initialForm);
            setTimeout(() => navigate('/AllActivities'), 1500);
        } catch (err) {
            setError(err.response?.data?.message || 'Error al crear la actividad');
            setForm(initialForm);
        } finally {
            setLoading(false);
        }
    };

    const showOverlay = !!error || !!success;

    return (
        <div className='background-new-activity'>
            <div className='form-new-activity-title'>NUEVA ACTIVIDAD</div>
            <Icons showHome={true} showUser={true} showMenu={true} />
            {showOverlay && <div className='overlay-new-activity'></div>}
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <div className='tupla-new-activity'>
                        <h2>Título</h2>
                        <input name='titulo' value={form.titulo} onChange={handleChange} placeholder='Título' required />
                    </div>
                    <div className='tupla-new-activity'>
                        <h2>Día</h2>
                        <input name='dia' value={form.dia} onChange={handleChange} placeholder='Día' required />
                    </div>
                    <div className='tupla-new-activity'>
                        <h2>Horario</h2>
                        <input name='horario' value={form.horario} onChange={handleChange} placeholder='Horario' required />
                    </div>
                    <div className='tupla-new-activity'>
                        <h2>Cupo</h2>
                        <input name='cupo' value={form.cupo} onChange={handleChange} placeholder='Cupo' type='number' required />
                    </div>
                    <div className='tupla-new-activity'>
                        <h2>Categoría</h2>
                        <input name='categoria' value={form.categoria} onChange={handleChange} placeholder='Categoría' required />
                    </div>
                    <div className='tupla-new-activity' >
                        <h2>Imagen</h2>
                        <input name='imagen' value={form.imagen} onChange={handleChange} placeholder='URL Imagen' />
                    </div>
                    <div className='tupla-new-activity'>
                        <h2>Instructor</h2>
                        <input name='nombre_instructor' value={form.nombre_instructor} onChange={handleChange} placeholder='Instructor' />
                    </div>
                    <div className='tupla-new-activity'>
                        <h2>Descripción</h2>
                        <input name='descripcion' value={form.descripcion} onChange={handleChange} placeholder='Descripción' />
                    </div>
                </form>
            </div>
            <button type='submit' className='submit-button-new-activity' disabled={loading || showOverlay} onClick={handleSubmit}>
                {loading ? 'Guardando...' : 'Guardar'}
            </button>
        </div>
    );
};

export default NewActivity;