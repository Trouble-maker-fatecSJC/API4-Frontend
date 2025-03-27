import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext"; // Importa o contexto de autenticação

export default function PrivateRoute() {
  const { user } = useAuth(); // Pega o usuário autenticado

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
