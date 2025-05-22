import React from 'react';

import '../styles/Activities.css';

import Icons from '../components/Icons';

const Activities = () => {
    return (
        <div className='background-container'>
        <div>
            <Icons showHome={true} showUser={true} showMenu={true}/>
        </div>
        <div className='my-activities-container'>
            <h1>Todas las actividades</h1>
            <p>Aquí podrás ver todas las actividades</p>
            {/*Implementacion de la logica para ver las actividades*/}
            </div>
        </div>
     );
};

export default Activities;