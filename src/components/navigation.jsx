import { useState } from 'react';
import { Menubar, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../utils/auth';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; // Hamburger icons

function Navigation() {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  // Common links
  const guestLinks = (
    <>
      <Link className="block py-2 px-4 text-lg font-poppins hover:bg-gray-100 rounded" to="/" onClick={() => setMobileOpen(false)}>Home</Link>
      <Link className="block py-2 px-4 text-lg font-poppins hover:bg-gray-100 rounded" to="/login" onClick={() => setMobileOpen(false)}>Login</Link>
      <Link className="block py-2 px-4 text-lg font-poppins hover:bg-gray-100 rounded" to="/register" onClick={() => setMobileOpen(false)}>Register</Link>
    </>
  );

  const authLinks = (
    <>
      <Link className="block py-2 px-4 text-lg font-poppins hover:bg-gray-100 rounded" to="/profile" onClick={() => setMobileOpen(false)}>Profile</Link>
      <Link className="block py-2 px-4 text-lg font-poppins hover:bg-gray-100 rounded" to="/tasks" onClick={() => setMobileOpen(false)}>Todos</Link>
      <button
        className="block py-2 px-4 text-lg font-poppins hover:bg-gray-100 rounded text-left w-full"
        onClick={() => { handleLogout(); setMobileOpen(false); }}
      >
        Logout
      </button>
    </>
  );

  return (
    <nav className="bg-white shadow-md px-4 py-3 flex items-center justify-between relative">
      <h1 className="text-3xl font-poppins font-bold">MONKE</h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-4 items-center">
        <Menubar className="flex items-center gap-4">
          {!authenticated ? guestLinks : authLinks}
        </Menubar>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button onClick={toggleMobileMenu} className="p-2 rounded hover:bg-gray-100">
          {mobileOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col md:hidden z-50">
          {!authenticated ? guestLinks : authLinks}
        </div>
      )}
    </nav>
  );
}

export default Navigation;
