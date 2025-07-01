// Importación de hooks y módulos necesarios
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NewActivity.css';
import Icons from '../components/Icons';
import axios from 'axios';
import { useUser } from '../context/UserContext';

const NewActivity = () => {
    // Trae información de sesión desde el contexto
    const { isLoggedIn, isAdmin, token } = useUser();
    const navigate = useNavigate();

    // Lista fija de días válidos
    const diasValidos = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    // Estado inicial del formulario
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

    // Estados locales
    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(false);
    const [categorias, setCategorias] = useState([]);     // Lista de categorías para el select
    const [instructores, setInstructores] = useState([]); // Lista de instructores para el select

    // Al montar, se cargan categorías e instructores desde la API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, instRes] = await Promise.all([
                    axios.get('http://localhost:8080/categoria'),
                    axios.get('http://localhost:8080/instructor')
                ]);
                setCategorias(catRes.data);
                setInstructores(instRes.data);
            } catch (err) {
                console.error("Error al cargar datos auxiliares:", err);
                alert("Error al cargar categorías o instructores.");
            }
        };
        fetchData();
    }, []);

    // Si el usuario no es admin o no está logueado, se restringe el acceso
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

    // Maneja cambios en los inputs del formulario
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Validación básica del formulario antes de enviarlo
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

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);

        const validationError = validateInputs();
        if (validationError) {
            alert(validationError);
            setLoading(false);
            return;
        }

        // Busca los IDs de categoría e instructor según el nombre seleccionado
        const selectedCategoria = categorias.find(c => c.Nombre === form.categoria);
        const selectedInstructor = instructores.find(i => i.nombre === form.instructor);

        if (!selectedCategoria || !selectedInstructor) {
            alert("Seleccione una categoría e instructor válidos.");
            setLoading(false);
            return;
        }

        // Payload con todos los campos requeridos por la API
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

        // Envío del formulario al backend
        try {
            await axios.post('http://localhost:8080/actividad', payload, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Actividad creada exitosamente.');
            navigate('/AllActivities');
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.error || 'Error al crear la actividad');
        } finally {
            setLoading(false);
        }
    };

    // Render principal del componente
    return (
        <div className='background-new-activity'>
            <div className='form-new-activity-title'>Nueva actividad</div>
            <Icons showHome={true} showUser={true} showMenu={true} />

            {/* Vista previa de imagen */}
            <div className='preview-container'>
                {form.imagen ? (
                    <img src={form.imagen} alt="Previsualización" className='preview-image' />
                ) : (
                    <div className='preview-placeholder'>Previsualización</div>
                )}
            </div>

            {/* Formulario para ingresar los datos */}
            <div className='form-container'>
                <form id="New-Activity" onSubmit={handleSubmit}>
                    <div className='tupla-new-activity'><h2>Título</h2><input name='titulo' value={form.titulo} onChange={handleChange} required /></div>

                    <div className='tupla-new-activity'>
                        <h2>Día</h2>
                        <select name='dia' className="custom-select" value={form.dia} onChange={handleChange} required>
                            <option value='' disabled>Seleccionar</option>
                            {diasValidos.map(dia => (
                                <option key={dia} value={dia}>{dia}</option>
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

            {/* Botón de envío del formulario */}
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