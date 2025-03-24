import { Routes, Route } from "react-router";
import Home from "../pages/home";
import Login from "../pages/login";
import PaginaNaoEncontrada from "../pages/paginaNaoEncontrada";
import AdmHome from "../pages/adm";
import Estacoes from "../components/estacao/Estacoes";
import CadastroEstacao from "../components/estacao/CadastroEstacao";
import CadastroUsuario from "../components/usuario/CadastroUsuario";
import Usuarios from "../components/usuario/Usuarios";
import EditarUsuario from "../components/usuario/EditarUsuario";

export default function AppRoutes(){
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adm" element={<AdmHome />} />
        <Route path="/estacoes" element={<Estacoes />} />
        <Route path="/cadastroestacao" element={<CadastroEstacao />} />
        <Route path="/cadastrousuario" element={<CadastroUsuario />} />
        <Route path='/usuarios' element={<Usuarios />} />
        <Route path="/editarusuario/:cpfEdicao" element={<EditarUsuario />} />

        

        <Route path="*" element={<PaginaNaoEncontrada />} />
        {/* Rota para página 404 */}
      </Routes>
    );
  };