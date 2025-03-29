import React, { useState } from "react";
import { fetchWithAuth } from "../../services/api";
// Importa o contexto de autenticação
import Aside from "../shared/aside/Aside";


export default function CadastroUsuario() {

  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [tipo, setTipo] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const usuario = {
      cpf: cpf,
      email: email,
      nome: nome,
      senha: senha,
      telefone: telefone,
      tipo: tipo,
    };

    console.log("Dados enviados:", usuario);

    try {
      const response = await fetchWithAuth("http://localhost:3000/api/usuarios", {
        method: "POST",
        body: JSON.stringify(usuario),
      });

      if (response.ok) {
        alert("Usuário cadastrado com sucesso!");
        setCpf("");
        setEmail("");
        setNome("");
        setSenha("");
        setTelefone("");
        setTipo(0);
      } else {
        alert("Erro ao cadastrar o usuário.");
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor.");
      console.error(error);
    }
  };


  return (
    <>
      <Aside />
      <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
          Usuario
        </div>
        <form className="py-4 px-6" onSubmit={handleSubmit}>
          {/* Campo Nome */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="nome">
              Nome
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Nome usuario"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          {/* Campo CPF */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="cpf">
              CPF
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="cpf"
              type="text"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </div>

          {/* Campo Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Campo Senha */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="senha">
              Senha
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="senha"
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          {/* Campo Telefone */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="telefone">
                      Telefone
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="telefone"
              type="text"
              placeholder="telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </div>

          {/* Campo Tipo */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="tipo">
              Tipo
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={tipo}
              onChange={(e) => setTipo(Number(e.target.value))}
            >
              <option value="0">Selecione o tipo</option>
              <option value="1">Administrador</option>
              <option value="2">Usuário</option>
            </select>
          </div>

          {/* Botão para enviar o formulário */}
          <div className="flex items-center justify-center mt-6">
            <button className="btn-cadastrar" type="submit">
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}






