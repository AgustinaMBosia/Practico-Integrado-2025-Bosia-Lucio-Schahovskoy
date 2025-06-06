import '../styles/ActivityCard.css';
import { useNavigate } from 'react-router-dom';

// Muestra los datos "basicos" de una actividad, al clickear te lleva a la página de la actividad
const ActivityCard = ({ activity, isAdmin }) => {
  const navigate = useNavigate();

  // Funcionalidades de admins
  const handleDelete = (e) => {
    e.stopPropagation();
    console.log('Eliminar actividad:', activity.id);
    //implementar delete
    window.location.reload();
  };
  const handleInfoClick = (e) => {
    e.stopPropagation();
    navigate(`/Activity/${activity.id}`);
  };

  // Funcionalidad de usuarios
  const handleCardClick = () => {
    if (!isAdmin) {
      navigate(`/Activity/${activity.id}`);
    }
  };

  return (
    <div
      className={`activity-card ${isAdmin ? 'admin-card' : ''}`}
      onClick={handleCardClick}
      style={{ cursor: isAdmin ? 'default' : 'pointer' }}
    >
      <h3>{activity.titulo}</h3>
      <div>
        <p><strong>Día:</strong> {activity.dia}</p>
        <p><strong>Horario:</strong> {activity.horario}</p>
        <p><strong>Profesor:</strong> {activity.nombre_instructor || 'Por asignar'}</p>
      </div>

      {isAdmin && (
        <>
          <div className="admin-overlay"></div>
          <div className="admin-controls">
            <button
              className="icon-button delete-button"
              onClick={handleDelete}
              title="Eliminar actividad"
            />
            <button
              className="icon-button info-button"
              onClick={handleInfoClick}
              title="Ver detalles"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ActivityCard;
