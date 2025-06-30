import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import MyActivities from './pages/MyActivities';
import AllActivities from './pages/AllActivities';
import ActivityDetail from './pages/ActivityDetail';
import Login from './pages/Login';
import { useUser } from './context/UserContext';
import NewActivity from './pages/NewActivity';
import AxiosInterceptor from './context/AxiosInterceptor';
import EditActivity from './pages/EditActivity';

function PrivateRoute({ children }) {
  const { isLoggedIn } = useUser();
  return isLoggedIn ? children : <Navigate to="/" replace />;
}

function PublicOnlyRoute({ children }) {
  const { isLoggedIn } = useUser();
  return isLoggedIn ? <Navigate to="/Home" replace /> : children;
}

function App() {
  return (
    <Router>
      <AxiosInterceptor />
      <Routes>
        <Route path="/" element={
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        } />
        <Route path="/Home" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path="/MyActivities" element={
          <PrivateRoute>
            <MyActivities />
          </PrivateRoute>
        } />
        <Route path="/AllActivities" element={
          <PrivateRoute>
            <AllActivities />
          </PrivateRoute>
        } />
        <Route path="/Activity/:id" element={
          <PrivateRoute>
            <ActivityDetail />
          </PrivateRoute>
        } />
        <Route path="/NewActivity" element={
          <PrivateRoute>
            <NewActivity />
          </PrivateRoute>
        } />
        <Route path="/EditActivity/:id" element={
          <PrivateRoute>
            <EditActivity />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
