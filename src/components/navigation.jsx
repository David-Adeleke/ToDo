import { Menubar, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../utils/auth';

function Navigation() {
  const navigate = useNavigate()
  const authenticated = isAuthenticated()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }
  return (
    <nav className="flex justify-between gap-5 mx-auto items-center">
      <h1 className="text-3xl font-poppins font-bold">MONKE</h1>
      <Menubar className="flex items-center gap-4">

        {!authenticated ? (
          <>
            <MenubarMenu>
              <MenubarTrigger>
                <Link className="text-lg font-poppins" to="/">Home</Link>
              </MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger asChild>
                <Link className="text-lg font-poppins" to="/login">Login</Link>
              </MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger asChild>
                <Link className="text-lg font-poppins" to="/register">Register</Link>
              </MenubarTrigger>
            </MenubarMenu>
          </>
        ) : (
          <>
            <MenubarMenu>
              <MenubarTrigger>
                <Link className="text-lg font-poppins" to="/profile">Home</Link>
              </MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>
                <Link className="text-lg font-poppins" to="/todo">Todos</Link>
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger className="text-lg font-poppins" onClick={handleLogout}>
                Logout
              </MenubarTrigger>
            </MenubarMenu>
          </>
        )}
      </Menubar>
    </nav>
  );
}


export default Navigation;
