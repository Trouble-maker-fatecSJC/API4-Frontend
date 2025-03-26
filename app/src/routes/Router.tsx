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
import CadastroMedidas from "../components/medidas/CadastroMedidas";
import Medida from "../components/medidas/Medidas";
import EditarMedida from "../components/medidas/EditarMedidas";
import CadastroTipoParametro from "../components/tipoParametro/CadastroTipoParametro";
import EditarTipoParametro from "../components/tipoParametro/EditarTipoParametro";
import TipoParametros from "../components/tipoParametro/TipoParametros";
import CadastroParametro from "../components/parametros/Cadastroparametro";

export default function AppRoutes(){
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adm" element={<AdmHome />} />

        <Route path="/estacoes" element={<Estacoes />} />
        <Route path="/cadastroestacao" element={<CadastroEstacao />} />

        <Route path='/usuarios' element={<Usuarios />} />
        <Route path="/cadastrousuario" element={<CadastroUsuario />} />
        <Route path="/editarusuario/:cpfEdicao" element={<EditarUsuario />} />
        
        <Route path="/medidas" element={<Medida />} />
        <Route path="/cadastromedidas" element={<CadastroMedidas />} />
        <Route path="/editarmedida/:idEdicao" element={<EditarMedida />} />
        
        <Route path="/tipoparametro" element={<TipoParametros />} />
        <Route path="/cadastrotipoparametro" element={<CadastroTipoParametro />} />
        <Route path="/editartipoparametro/:idEdicao" element={<EditarTipoParametro />} />

        <Route path="/cadastroparametro" element={<CadastroParametro />} />

        <Route path="*" element={<PaginaNaoEncontrada />} />
        {/* Rota para página 404 */}
      </Routes>
    );
  };