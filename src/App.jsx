import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import { Button } from '@/components/ui/button';

import Navigation from './components/navigation';
import Home from './components/home';
import Login from './components/login1';

import Register from './components/register2';
import Profile from './components/profile';
import ProtectedRoute from './components/protectedRoute';
// import Todos from './components/todos';

import './App.css';
import ErrorTest from './components/error';
import NotFound from './components/notFound';
import TodoDetails from './components/todoDetails';

const Todos = lazy(() => import('./components/todos'))
// const Profile = lazy(() => import('./components/profile'))

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
              <Suspense fallback={<div>Loading...</div>}>
                <Todos />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path='/todo/:id' element={<TodoDetails /> } />

          <Route path='/error' element={<ErrorTest />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
