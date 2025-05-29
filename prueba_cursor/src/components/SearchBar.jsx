import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import SearchIcon from '../styles/images/searchbaricon.svg';
import '../styles/SearchBar.css';
import '../styles/ActivityList.css';

import ActivityList from '../components/ActivityList';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [allActivities, setAllActivities] = useState([]);
    const [filteredActivities, setFilteredActivities] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const containerRef = useRef();

    // Cerrar lista al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    function normalize(text) {
        return text
          .toLowerCase()
          .normalize('NFD')                    // separa acentos
          .replace(/[\u0300-\u036f]/g, '')    // elimina acentos
          .replace(/[^a-zA-Z0-9]/g, '');      // elimina caracteres especiales
      }      

    const handleFocus = async () => {
        try {
            const response = await axios.get('http://localhost:8080/actividad');
            setAllActivities(response.data);
            setFilteredActivities(response.data);
            setShowResults(true);
        } catch (error) {
            console.error('Error al obtener actividades:', error);
        }
    };

    // Filtro en múltiples campos
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredActivities(allActivities);
            return;
        }

        const normalizedTerm = normalize(searchTerm);

        const filtro = allActivities.filter((actividad) =>
            [
                normalize(actividad.titulo),
                normalize(actividad.nombre_instructor),
                normalize(actividad.descripcion),
                normalize(actividad.horario),
                normalize(actividad.dia)
            ].some((campo) =>
                campo?.toLowerCase().includes(normalizedTerm)
            )
        );

        setFilteredActivities(filtro);
    }, [searchTerm, allActivities]);

    return (
        <>
            {showResults && <div className="search-overlay" />} {/* Fondo oscurecido */}

            <div className="search-container" ref={containerRef}>
                <div className="search-pack">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Buscar actividad..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={handleFocus}
                    />
                    <img
                        src={SearchIcon}
                        className="search-icon"
                        alt="Buscar"
                    />
                </div>

                {showResults && (

                    <div className="search-results">
                        <div className='activity-list-container'>
                            <ActivityList
                                activities={filteredActivities}
                                title=""
                                emptyMessage="No hay actividades disponibles en este momento"
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default SearchBar;
