// Reemplaza el componente NewActivity actual con este
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NewActivity.css';
import Icons from '../components/Icons';
import axios from 'axios';
import { useUser } from '../context/UserContext';

const NewActivity = () => {
    const { isLoggedIn, isAdmin, token } = useUser();
    const navigate = useNavigate();

    const diasValidos = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

    const initialForm = {
        titulo: '',
        dia: '',
        horario: '',
        cupo: '',
        categoria: '',
        imagen: '',
        instructor: '',
        descripcion: '',
    };

    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [instructores, setInstructores] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, instRes] = await Promise.all([
                    axios.get('http://localhost:8080/categoria'),
                    axios.get('http://localhost:8080/instructor')
                ]);
                setCategorias(catRes.data);
                setInstructores(instRes.data);
                console.log(catRes.data, instRes.data);
            } catch (err) {
                console.error("Error al cargar datos auxiliares:", err);
            }
        };
        fetchData();
    }, []);

    if (!isLoggedIn || !isAdmin) {
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
        setError('');
        setSuccess('');
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validateInputs = () => {
        if (!diasValidos.includes(form.dia.toLowerCase())) {
            return "Día inválido. Use por ejemplo: lunes, martes...";
        }
        if (!/^\d{2}:\d{2}$/.test(form.horario)) {
            return "Horario inválido. Use formato 24hs (ej: 14:30)";
        }
        const [hh, mm] = form.horario.split(':');
        if (+hh > 23 || +mm > 59) {
            return "Horario fuera de rango válido (00:00 - 23:59)";
        }
        if (parseInt(form.cupo) < 0) {
            return "El cupo no puede ser negativo.";
        }
        return null;
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        const validationError = validateInputs();
        if (validationError) {
            setError(validationError);
            setLoading(false);
            return;
        }

        const selectedCategoria = categorias.find(c => c.Nombre === form.categoria);
        const selectedInstructor = instructores.find(i => i.nombre === form.instructor);

        if (!selectedCategoria || !selectedInstructor) {
            setError("Seleccione una categoría e instructor válidos.");
            setLoading(false);
            return;
        }

        const payload = {
            titulo: form.titulo,
            dia: form.dia,
            horario: form.horario,
            imagen: form.imagen,
            cupo: parseInt(form.cupo),
            descripcion: form.descripcion,
            categoria_id: selectedCategoria.id,
            instructor_id: selectedInstructor.id,
        };

        try {
            await axios.post('http://localhost:8080/actividad', payload, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSuccess('Actividad creada exitosamente.');
            setTimeout(() => {
                setSuccess('');
                navigate('/AllActivities');
            }, 1500);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || 'Error al crear la actividad');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='background-new-activity'>
            <div className='form-new-activity-title'>NUEVA ACTIVIDAD</div>
            <Icons showHome={true} showUser={true} showMenu={true} />
            {error && <div className="error-message" onClick={() => setError('')}>{error}</div>}
            {success && <div className="success-message" onClick={() => setSuccess('')}>{success}</div>}

            <div className='preview-container'>
                {form.imagen ? (
                    <img src={form.imagen} alt="Previsualización" className='preview-image' />
                ) : (
                    <div className='preview-placeholder'>Previsualización</div>
                )}
            </div>

            <div className='form-container'>
                <form id="New-Activity" onSubmit={handleSubmit}>
                    
                    <div className='tupla-new-activity'><h2>Título</h2><input name='titulo' value={form.titulo} onChange={handleChange} required /></div>
                    
                    <div className='tupla-new-activity'>
                        <h2>Día</h2>
                        <select name='dia' className="custom-select" value={form.dia} onChange={handleChange} required>
                            <option value='' disabled>Seleccionar</option>
                            {diasValidos.map(dia => (
                                <option key={dia} value={dia}>{dia.charAt(0).toUpperCase() + dia.slice(1)}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className='tupla-new-activity'><h2>Horario</h2><input name='horario' type='time' value={form.horario} onChange={handleChange} required /></div>
                    
                    <div className='tupla-new-activity'><h2>Cupo</h2><input name='cupo' type='number' min='0' value={form.cupo} onChange={handleChange} required /></div>

                    <div className='tupla-new-activity'><h2>Categoría</h2>
                        <select name='categoria' className="custom-select" value={form.categoria} onChange={handleChange} required>
                            <option value='' disabled>Seleccionar</option>
                            {categorias.map(c => (
                                <option key={c.id} value={c.Nombre}>{c.Nombre}</option>
                            ))}
                        </select>
                    </div>

                    <div className='tupla-new-activity'><h2>Imagen</h2><input name='imagen' type='url' value={form.imagen} onChange={handleChange} /></div>

                    <div className='tupla-new-activity'><h2>Instructor</h2>
                        <select name='instructor' className="custom-select" value={form.instructor} onChange={handleChange} required>
                            <option value='' disabled>Seleccionar</option>
                            {instructores.map(i => (
                                <option key={i.id} value={i.nombre}>{i.nombre}</option>
                            ))}
                        </select>
                    </div>

                    <div className='tupla-new-activity'><h2>Descripción</h2><input name='descripcion' value={form.descripcion} onChange={handleChange} /></div>
                </form>
            </div>

            <button
                form="New-Activity"
                type='submit'
                className='submit-button-new-activity'
                disabled={loading}>
                {loading ? 'Guardando...' : 'Guardar'}
            </button>
        </div>
    );
};

export default NewActivity;
