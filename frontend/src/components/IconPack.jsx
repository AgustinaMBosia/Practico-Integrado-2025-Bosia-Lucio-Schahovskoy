import React from 'react';
import HomeIcon from '../styles/images/homeicon.svg';
import UserIcon from '../styles/images/usericon.svg';
import MenuIcon from '../styles/images/menuicon.svg';
import ActivityCard from './ActivityCard';

import '../styles/iconpack.css';

const IconPack = () => {
    const [showActivities, setShowActivities] = React.useState(false);

    const handleClick = () => {
        setShowActivities(!showActivities);
    };

    useEffect(() => {
        if (showActivities && activities.length === 0) {
            fetch('http://localhost:8080/actividades')
                .then(res => res.json())
                .then(data => setActivities(data))
                .catch(error => console.error("Error al cargar actividades:", error));
        }
    }, [showActivities]);

    return (
        <div>
            <div className="icon-pack" >
                <img src={HomeIcon} className="home-icon" alt="Inicio" />
                <img src={UserIcon} className="user-icon" alt="Usuario" />
                <img src={MenuIcon} className="menu-icon" alt="Menú" onClick={handleClick}/>
            </div>
            {showActivities && (
                <div className="activities-container">
                    <div className="activities-grid">
                        {activities.map(activity => (
                            <ActivityCard key={activity.id} activity={activity} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default IconPack;
