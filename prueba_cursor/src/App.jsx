import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home'
import MyActivities from './pages/MyActivities';
import Activities from './pages/Activities';
import ActivityDetail from './pages/ActivityDetail';
import Login from './pages/Login';

function App() {

  return (

    <Router>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/MyActivities" element={<MyActivities />} />
        <Route path="/Activities" element={<Activities />} />
        <Route path="/Activities/:id" element={<ActivityDetail />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>

  )
}

export default App
