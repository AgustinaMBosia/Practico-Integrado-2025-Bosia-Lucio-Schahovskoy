import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/NewActivity.css';
import Icons from '../components/Icons';
import axios from 'axios';
import { useUser } from '../context/UserContext';

// Función para normalizar strings (quita tildes y pasa a minúsculas)
const normalize = (str) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const EditActivity = () => {
    // Contexto de usuario y navegación
    const { isLoggedIn, isAdmin, token } = useUser();
    const navigate = useNavigate();
    const { id } = useParams(); // ID de la actividad a editar

    // Días válidos con formato correcto
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

    // Estados del componente
    const [form, setForm] = useState(initialForm);
    const [categorias, setCategorias] = useState([]);
    const [instructores, setInstructores] = useState([]);
    const [loading, setLoading] = useState(false);

    // Carga los datos de la actividad a editar
    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/actividad/${id}`);
                const data = res.data;

                // Normaliza el día para que coincida con la lista de opciones
                const diaNormalizado = diasValidos.find(
                    d => normalize(d) === normalize(data.dia)
                ) || '';

                // Carga los datos en el formulario
                const loadedForm = {
                    titulo: data.titulo,
                    dia: diaNormalizado,
                    horario: data.horario,
                    cupo: data.cupo.toString(),
                    categoria: data.Categoria_description || '',
                    imagen: data.imagen || '',
                    instructor: data.nombre_instructor || '',
                    descripcion: data.descripcion || '',
                };

                setForm(loadedForm);
            } catch (err) {
                console.error("Error al cargar actividad:", err);
                alert("No se pudo cargar la actividad.");
            }
        };

        if (id) fetchActivity();
    }, [id]);

    // Carga todas las categorías e instructores para los selects
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

    // Si el usuario no es admin o no está logueado, muestra error
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

    // Maneja los cambios en los inputs del formulario
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Valida que los campos principales tengan el formato correcto
    const validateInputs = () => {
        const diaValido = diasValidos.find(d => normalize(d) === normalize(form.dia));
        if (!diaValido) return "Día inválido. Use por ejemplo: Lunes, Martes...";
        if (!/^\d{2}:\d{2}$/.test(form.horario)) return "Horario inválido. Use formato 24hs (ej: 14:30)";
        const [hh, mm] = form.horario.split(':');
        if (+hh > 23 || +mm > 59) return "Horario fuera de rango válido (00:00 - 23:59)";
        if (parseInt(form.cupo) < 0) return "El cupo no puede ser negativo.";
        return null;
    };

    // Envía el formulario editado al backend
    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);

        // Validaciones de campos
        const validationError = validateInputs();
        if (validationError) {
            alert(validationError);
            setLoading(false);
            return;
        }

        // Busca el ID de la categoría e instructor seleccionados
        const categoriaObj = categorias.find(c => c.Nombre === form.categoria);
        const instructorObj = instructores.find(i => i.nombre === form.instructor);

        if (!categoriaObj) {
            alert("Categoría inválida.");
            setLoading(false);
            return;
        }

        if (!instructorObj) {
            alert("Instructor inválido.");
            setLoading(false);
            return;
        }

        // Construye el payload para actualizar la actividad
        const payload = {
            titulo: form.titulo,
            dia: diasValidos.find(d => normalize(d) === normalize(form.dia)),
            horario: form.horario,
            cupo: parseInt(form.cupo),
            imagen: form.imagen,
            descripcion: form.descripcion,
            categoria_id: categoriaObj.id,
            instructor_id: instructorObj.id
        };

        // Envía la actualización al backend
        try {
            await axios.put(`http://localhost:8080/actividad/${id}`, payload, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Actividad editada exitosamente.');
            navigate('/AllActivities');
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.error || 'Error al editar la actividad');
        } finally {
            setLoading(false);
        }
    };

    // Renderizado principal del formulario
    return (
        <div className='background-new-activity'>
            <div className='form-new-activity-title'>EDITAR ACTIVIDAD</div>
            <Icons showHome={true} showUser={true} showMenu={true} />

            {/* Vista previa de la imagen */}
            <div className='preview-container'>
                {form.imagen ? (
                    <img src={form.imagen} alt="Previsualización" className='preview-image' />
                ) : (
                    <div className='preview-placeholder'>Previsualización</div>
                )}
            </div>

            {/* Formulario de edición */}
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

            {/* Botón para enviar el formulario */}
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