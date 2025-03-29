import React, { useState, useEffect } from "react";
import Aside from "../shared/aside/Aside";
import Usuario from "../../model/usuario";
import { useNavigate, useParams } from "react-router-dom";
import { fetchWithAuth } from "../../services/api";

export default function EditarUsuario() {
  const navigate = useNavigate();
  const { cpfEdicao } = useParams(); // Usando o hook useParams para pegar o CPF da URL
  const [cpf, setCpf] = useState<string>("");
  const [cpfNovo, setCpfNovo] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [tipo, setTipo] = useState<number>(0);

  useEffect(() => {
    if (!cpfEdicao) return; // Se cpfEdicao não estiver definido, não faz nada

    async function fetchUsuario() {
      try {
        const data: Usuario = await fetchWithAuth(`http://localhost:3000/api/usuarios/${cpfEdicao}`);
        console.log("Usuário carregado do backend:", data);
        setCpf(data.cpf);
        setCpfNovo(data.cpf); // Deixar o cpfNovo com o valor inicial do cpf
        setEmail(data.email);
        setNome(data.nome);
        setTelefone(data.telefone);
        setTipo(data.tipo);
      } catch (error) {
        alert("Erro ao buscar usuário");
        console.error(error);
        navigate("/usuarios");
      }
    }

    fetchUsuario();
  }, [cpfEdicao, navigate]); // Dependência de cpfEdicao para carregar os dados novamente

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const usuarioAtualizado = { cpf: cpfNovo, email, nome, telefone, tipo };

    console.log("Enviando dados para atualização:", usuarioAtualizado);

    try {
      const response = await fetchWithAuth(`http://localhost:3000/api/usuarios/${cpf}`, {
        method: "PUT",
        body: JSON.stringify(usuarioAtualizado),
      });

      if (response.ok) {
        alert("Usuário atualizado com sucesso!");
        navigate("/usuarios");
      } else {
        const responseData = await response.json();
        alert(`Erro ao atualizar usuário: ${responseData.message || "Erro desconhecido"}`);
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      alert("Erro ao conectar com o servidor");
    }
  };

  return (
    <>
      <Aside />
      <div className="w-full sm:max-w-md mx-auto mt-6 p-4 bg-white shadow-lg rounded-lg">
        <div className="text-xl sm:text-2xl py-3 sm:py-4 px-4 sm:px-6 bg-gray-900 text-white text-center font-bold uppercase">
          Editar Usuário
        </div>
        <form className="py-4 px-4 sm:px-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-1 sm:mb-2">CPF</label>
            <input
              className="w-full p-2 border rounded bg-gray-100"
              type="text"
              value={cpf}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-1 sm:mb-2">Nome</label>
            <input
              className="w-full p-2 border rounded bg-gray-100"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-1 sm:mb-2">Email</label>
            <input
              className="w-full p-2 border rounded bg-gray-100"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-1 sm:mb-2">Telefone</label>
            <input
              className="w-full p-2 border rounded bg-gray-100"
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-1 sm:mb-2">Tipo</label>
            <select
              className="w-full p-2 border rounded bg-gray-100"
              value={tipo}
              onChange={(e) => setTipo(Number(e.target.value))}
            >
              <option value="1">Administrador</option>
              <option value="2">Usuário</option>
            </select>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <button className="bg-blue-600 text-white p-2 rounded w-full sm:w-auto" type="submit">
              Salvar
            </button>
            <button
              className="border border-red-500 p-2 rounded w-full sm:w-auto"
              type="button"
              onClick={() => navigate("/usuarios")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
