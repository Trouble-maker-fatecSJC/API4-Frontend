import React, { useState, useEffect } from "react";
import Aside from "../shared/aside/Aside";
import TipoAlerta from "../../model/TipoAlerta";
import Parametro from "../../model/Parametro";
import { fetchWithAuth } from "../../services/api";

export default function CadastroTipoAlerta() {
  const [nome, setNome] = useState<string>("");
  const [conteudo, setConteudo] = useState<string>("");
  const [parametros, setParametros] = useState<Parametro[]>([]);
  const [Parametro, setParametro] = useState<number | string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataParametros = await fetchWithAuth("http://localhost:3000/api/parametro");
        console.log("Dados recebidos:", dataParametros);
        setParametros(dataParametros);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const novoTipoAlerta: TipoAlerta = {
      nome: nome,
      conteudo: conteudo,
      id_do_parametro: Number(Parametro),
    };

    console.log("Enviando dados:", novoTipoAlerta);

    try {
      const response = await fetchWithAuth("http://localhost:3000/api/tipoalerta", {
        method: "POST",
        body: JSON.stringify(novoTipoAlerta),
      });

      if (response.ok) {
        alert("Tipo de alerta cadastrado com sucesso!");
        setNome("");
        setConteudo("");
        setParametro(0);
      } else {
        alert("Erro ao cadastrar Tipo de alerta");
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor");
      console.error(error);
    }
  };

  return (
    <>
      <Aside />
      <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
          Cadastro de Tipo Alerta
        </div>
        <form className="py-4 px-6" onSubmit={handleSubmit}>
          {/* Campo Nome */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="nome"
            >
              Nome
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nome"
              type="text"
              placeholder="Digite o nome do tipo de alerta"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          {/* Campo Conteudo */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="conteudo"
            >
              Conteudo
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="conteudo"
              type="text"
              placeholder="Digite o conteudo do tipo de alerta"
              value={conteudo}
              onChange={(e) => setConteudo(e.target.value)}
            />
          </div>

          {/* Campo do Parâmetro */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="idParametro"
            >
              Id do Parâmetro
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="idParametro"
              value={Parametro}
              onChange={(e) => setParametro(e.target.value)}
            >
              <option value="">Selecione o id do Parâmetro</option>
              {parametros.length > 0 ? (
                parametros.map((parametro) => (
                  <option key={parametro.id_parametro} value={parametro.id_parametro}>
                    {parametro.id_parametro}
                  </option>
                ))
              ) : (
                <option value="">Nenhum parâmetro cadastrado</option>
              )}
            </select>
          </div>

          <div className="flex items-center justify-center mt-6">
            <button className="btn-cadastrar" type="submit">
              Cadastrar Tipo de alerta
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
