// EditActivity.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/NewActivity.css';
import Icons from '../components/Icons';
import axios from 'axios';
import { useUser } from '../context/UserContext';

const EditActivity = () => {
    const { isLoggedIn, isAdmin, token } = useUser();
    const navigate = useNavigate();
    const { id } = useParams();

    const diasValidos = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

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
    const [originalForm, setOriginalForm] = useState(initialForm);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [instructores, setInstructores] = useState([]);

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/actividad/${id}`);
                const data = res.data;
                const loadedForm = {
                    titulo: data.titulo,
                    dia: data.dia,
                    horario: data.horario,
                    cupo: data.cupo.toString(),
                    categoria: data.Categoria_description || '',
                    imagen: data.imagen || '',
                    instructor: data.nombre_instructor || '',
                    descripcion: data.descripcion || '',
                };
                setForm(loadedForm);
                setOriginalForm(loadedForm);
            } catch (err) {
                console.error("Error al cargar actividad:", err);
                setError("No se pudo cargar la actividad.");
            }
        };

        if (id) fetchActivity();
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, instRes] = await Promise.all([
                    axios.get('http://localhost:8080/categorias'),
                    axios.get('http://localhost:8080/instructores')
                ]);
                setCategorias(catRes.data);
                setInstructores(instRes.data);
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
                    Acceso denegado. Solo los administradores pueden editar actividades.
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
        if (!diasValidos.includes(form.dia)) {
            return "Día inválido. Use por ejemplo: Lunes, Martes...";
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

        const changedFields = {};
        Object.keys(form).forEach(key => {
            if (form[key] !== originalForm[key]) {
                changedFields[key] = form[key];
            }
        });

        if (Object.keys(changedFields).length === 0) {
            setError("No se detectaron cambios.");
            setLoading(false);
            return;
        }

        if (changedFields.categoria) {
            const categoriaObj = categorias.find(c => c.descripcion === form.categoria);
            if (!categoriaObj) {
                setError("Categoría inválida.");
                setLoading(false);
                return;
            }
            changedFields.categoria_id = categoriaObj.id;
            delete changedFields.categoria;
        }

        if (changedFields.instructor) {
            const instructorObj = instructores.find(i => i.nombre === form.instructor);
            if (!instructorObj) {
                setError("Instructor inválido.");
                setLoading(false);
                return;
            }
            changedFields.instructor_id = instructorObj.id;
            delete changedFields.instructor;
        }

        if (changedFields.cupo) {
            changedFields.cupo = parseInt(form.cupo);
        }

        try {
            await axios.put(`http://localhost:8080/actividad/${id}`, changedFields, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSuccess('Actividad editada exitosamente.');
            setTimeout(() => {
                setSuccess('');
                navigate('/AllActivities');
            }, 1500);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || 'Error al editar la actividad');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='background-new-activity'>
            <div className='form-new-activity-title'>EDITAR ACTIVIDAD</div>
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
                                <option key={c.id} value={c.descripcion}>{c.descripcion}</option>
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

export default EditActivity;
