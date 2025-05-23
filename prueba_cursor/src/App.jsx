import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/home'
import MyActivities from './pages/MyActivities';
import Activities from './pages/activities';
import ActivityDetail from './pages/ActivityDetail';
import Login from './pages/login';

function App() {

  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/MyActivities" element={<MyActivities />} />
        <Route path="/Activities" element={<Activities />} />
        <Route path="/Activities/:id" element={<ActivityDetail />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </Router>

  )
}

export default App
