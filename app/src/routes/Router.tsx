import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
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
// import CadastroParametro from "../components/parametros/Cadastroparametro";
import EditarEstacao from "../components/estacao/EditarEstacao";
import Parametros from "../components/parametros/Parametro";
// import EditarParametro from "../components/parametros/EditarParametro";
import CadastroAlerta from "../components/alerta/CadastroAlerta";
import Alertas from "../components/alerta/Alertas";
import EditarAlerta from "../components/alerta/EditarAlerta";

import AlarmeList from "../components/alarme/Alarme";


import { ComponentType } from "react";
import PaginaPrincipal from "../pages/paginaPrincipal/paginaprincipal"; // Import the PaginaPrincipal component
import PaginaTeste from "../components/usuario/paginaTeste";


// Componente para proteger rotas
const ProtectedRoute = ({
  component: Component,
}: {
  component: ComponentType<any>;
}) => {
  const { isAuthenticated } = useAuth();

  const isUserAuthenticated = isAuthenticated();
  console.log("Usuário autenticado:", isUserAuthenticated);

  return isUserAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/adm" element={<AdmHome />} />
      
      {/* Rota pública */}
      <Route
        path="/pagina-principal"
        element={<ProtectedRoute component={PaginaPrincipal} />}
      />
      
      <Route path="/pagina-teste" Component={PaginaTeste}/>
      {/* Rotas protegidas */}
      
      <Route path="/estacoes" element={<ProtectedRoute component={Estacoes} />} />
      <Route
        path="/cadastroestacao"
        element={<ProtectedRoute component={CadastroEstacao} />}
      />
      <Route
        path="/editarestacao/:idEdicao"
        element={<ProtectedRoute component={EditarEstacao} />}
      />
      <Route path="/usuarios" element={<ProtectedRoute component={Usuarios} />} />
      <Route
        path="/cadastrousuario"
        element={<ProtectedRoute component={CadastroUsuario} />}
      />
      <Route
        path="/editarusuario/:cpfEdicao"
        element={<ProtectedRoute component={EditarUsuario} />}
      />
      <Route path="/medidas" element={<ProtectedRoute component={Medida} />} />
      <Route
        path="/cadastromedidas"
        element={<ProtectedRoute component={CadastroMedidas} />}
      />
      <Route
        path="/editarmedida/:idEdicao"
        element={<ProtectedRoute component={EditarMedida} />}
      />
      <Route path="/tipoparametros" element={<ProtectedRoute component={TipoParametros} />} />

      <Route
        path="/cadastrotipoparametro"
        element={<ProtectedRoute component={CadastroTipoParametro} />}
      />
      <Route
        path="/editartipoparametro/:idEdicao"
        element={<ProtectedRoute component={EditarTipoParametro} />}
      />
      {/* <Route
        path="/cadastroparametro"
        element={<ProtectedRoute component={CadastroParametro} />}
      /> */}
      <Route
        path="/parametros"
        element={<ProtectedRoute component={Parametros} />}
      />
      <Route
        path="/cadastroalerta"
        element={<ProtectedRoute component={CadastroAlerta} />}
      />
      <Route
        path="/alertas"
        element={<ProtectedRoute component={Alertas} />}
      />
      <Route
        path="/editarAlerta/:id"
        element={<ProtectedRoute component={EditarAlerta} />}
      />
      <Route
        path="/alarmes"
        element={<ProtectedRoute component={AlarmeList} />} 
      />


      
      <Route path="*" element={<PaginaNaoEncontrada />} />
    </Routes>
  );
}


