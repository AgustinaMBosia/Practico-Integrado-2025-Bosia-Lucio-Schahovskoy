import React from 'react';
import '../styles/Home.css';

import GymHeader from '../components/GymHeader';
import SearchBar from '../components/SearchBar';
import Icons from '../components/Icons';
import TestCard from '../components/TestCard';

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

            <div>
                <TestCard/>
            </div>

        </>
    );
};

export default Home;