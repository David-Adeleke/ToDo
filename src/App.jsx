import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import Navigation from './components/navigation';
import Home from './components/home';
import Login from './components/login';

import Register from './components/register';
import Profile from './components/profile';
import ProtectedRoute from './components/protectedRoute';

import ErrorTest from './components/error';
import NotFound from './components/notFound';
import TodoDetails from './components/todoDetails';

import './App.css';
import Loader from './components/loader';

const Todos = lazy(() => import('./components/todos'))

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

          <Route path="/tasks" element={
            <ProtectedRoute>
              <Suspense fallback={<Loader />}>
                <Todos />
              </Suspense>
            </ProtectedRoute>
          } />

          <Route path="/tasks/:id" element={
            <ProtectedRoute>
              <Suspense fallback={<Loader />}>
                <TodoDetails />
              </Suspense>
            </ProtectedRoute>
          } />

          <Route path='/error' element={<ErrorTest />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
