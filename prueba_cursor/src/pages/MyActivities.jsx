import React from 'react';
import axios from 'axios';

import '../styles/Activities.css';

import Icons from '../components/Icons';

const MyActivities = () => {
    
    return (
        <div className='background-container'>
        <div>
            <Icons showHome={true} showUser={true} showMenu={true}/>
        </div>
        <div className='my-activities-container'>
            <h1>Mis actividades</h1>
            <p>Aquí podrás ver todas tus actividades</p>
            {/*Implementacion de la logica para ver las actividades*/}
            </div>
        </div>
     );
};

export default MyActivities;