import { Menubar, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="flex justify-between gap-6 mx-auto items-center">
      <h1 className="text-xl font-bold">MONKE</h1>
      <Menubar className="flex items-center gap-2">
        <MenubarMenu>
          <MenubarTrigger>
            <Link to="/">Home</Link>
          </MenubarTrigger>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>
            <Link to="/todo">Todos</Link>
          </MenubarTrigger>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>
            <Link to="/login">Login</Link>
          </MenubarTrigger>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>
            <Link to="register">Register</Link>
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </nav>
  );
}

export default Navigation;
