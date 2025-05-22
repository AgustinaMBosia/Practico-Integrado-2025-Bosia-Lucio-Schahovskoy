import React from 'react';
import '../styles/home.css';

import GymHeader from '../components/GymHeader';
import SearchBar from '../components/SearchBar';
import Icons from '../components/Icons';

const Home = () => {
    return (
        <>

            <div>
                <GymHeader />
            </div>

            <div>
                <Icons showHome={false} showUser={true} showMenu={true}/>
            </div>

            <div>
                <SearchBar/>
            </div>

        </>
    );
};

export default Home;