import { Routes, Route } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navigation from './components/navigation';
import Home from './components/home';
import Login from './components/login1';

import './App.css';
import Register from './components/register2';
import Profile from './components/profile';
import ProtectedRoute from './components/protectedRoute';
import Todos from './components/todos';

function App() {
  return (
    <>
      <div className="py-5 px-12">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/todo" element={
            <ProtectedRoute>
              <Todos />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </>
  );
}

export default App;
