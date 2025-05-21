import React from 'react';
import '../styles/home.css';
import IconPack from '../components/IconPack';
import SearchPack from '../components/SearchPack';
import GymHeader from '../components/GymHeader';

const Home = () => {
  return (
    <div className="home-page">
        <IconPack/>
        <SearchPack/>
        <GymHeader/>
    </div>
  );
};

export default Home;