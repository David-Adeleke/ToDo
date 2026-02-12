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
    <nav className="flex justify-between gap-6 mx-auto items-center">
      <h1 className="text-xl font-bold">MONKE</h1>
      <Menubar className="flex items-center gap-2">
        <MenubarMenu>
          <MenubarTrigger>
            <Link to="/">Home</Link>
          </MenubarTrigger>
        </MenubarMenu>

        {!authenticated ? (
          <>
            <MenubarMenu>
              <MenubarTrigger asChild>
                <Link to="/login">Login</Link>
              </MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger asChild>
                <Link to="/register">Register</Link>
              </MenubarTrigger>
            </MenubarMenu>
          </>
        ) : (
          <>
            <MenubarMenu>
              <MenubarTrigger>
                <Link to="/todo">Todos</Link>
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger onClick={handleLogout}>
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
