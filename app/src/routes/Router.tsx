import { Routes, Route } from "react-router";
import Home from "../pages/home";
import Login from "../pages/login";
import PaginaNaoEncontrada from "../pages/paginaNaoEncontrada";

export default function AppRoutes(){
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PaginaNaoEncontrada />} /> 
        {/* Rota para página 404 */}
      </Routes>
    );
  };