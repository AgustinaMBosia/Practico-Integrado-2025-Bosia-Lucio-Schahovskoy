import React from 'react';
import SearchIcon from '../styles/images/searchbaricon.svg';
import '../styles/searchpack.css';

const SearchPack = () => {
    return (
        <div className="search-container">
            <div className="search-pack">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Buscar actividad..."
                />
                <img
                    src={SearchIcon}
                    className="search-icon"
                    alt="Buscar"
                />
            </div>
        </div>
    );
};

export default SearchPack;