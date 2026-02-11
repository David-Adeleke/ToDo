import { Routes, Route } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navigation from './components/navigation';
import Home from './components/home';
import Login from './components/login';

import './App.css';
import Register from './components/register2';
import Profile from './components/profile';
import ProtectedRoute from './components/protectedRoute';

function App() {
  return (
    <>
      <div className="py-4 px-4">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/todo" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </>
  );
}

export default App;
