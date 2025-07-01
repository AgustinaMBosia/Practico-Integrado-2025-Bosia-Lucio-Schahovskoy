import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import SearchIcon from '../styles/images/searchbaricon.svg';
import '../styles/SearchBar.css';
import '../styles/ActivityList.css';

import ActivityList from './ActivityList';

// Barra de búsqueda onchange por diversos parámetros, normalizado
const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [allActivities, setAllActivities] = useState([]);
    const [filteredActivities, setFilteredActivities] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const containerRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Normaliza el texto en todos los aspectos
    function normalize(text) {
        return (text || '')
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-zA-Z0-9]/g, '');
    }

    const handleFocus = async () => {
        try {
            const response = await axios.get('http://localhost:8080/actividad');
            const data = response.data || [];
            setAllActivities(data);
            setFilteredActivities(data);
            setShowResults(true);
        } catch (error) {
            console.error('Error al obtener actividades:', error);
            setAllActivities([]);
            setFilteredActivities([]);
        }
    };

    // Realiza la búsqueda contra el backend
    useEffect(() => {
        const fetchFilteredActivities = async () => {
            if (!searchTerm.trim()) {
                setFilteredActivities([]);
                return;
            }

            try {
                const res = await axios.get(`http://localhost:8080/actividad/buscar`, {
                    params: { query: searchTerm }
                });
                setFilteredActivities(res.data || []);
            } catch (error) {
                console.error('Error al buscar actividades:', error);
                setFilteredActivities([]);
            }
        };

        const delayDebounce = setTimeout(() => {
            fetchFilteredActivities();
        }, 300); // Espera 300ms luego de que el usuario deje de tipear

        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

    return (
        <>
            {showResults && <div className="search-overlay" />}

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
                                activities={filteredActivities || []}
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