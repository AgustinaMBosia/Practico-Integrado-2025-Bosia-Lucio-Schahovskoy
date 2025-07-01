import React from 'react';
import '../styles/Home.css';

import GymHeader from '../components/GymHeader';
import SearchBar from '../components/SearchBar';
import Icons from '../components/Icons';

const Home = () => {
    return (
        <>
            <div className='background-home'>
                <div>
                    <GymHeader />
                </div>

                <div>
                    <Icons showHome={false} showUser={true} showMenu={true} />
                </div>

                <div>
                    <SearchBar />
                </div>
            </div>
        </>
    );
};

export default Home;