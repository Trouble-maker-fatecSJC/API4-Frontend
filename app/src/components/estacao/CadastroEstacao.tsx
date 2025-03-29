import React, { useState } from "react";
import Aside from "../shared/aside/Aside";
import { fetchWithAuth } from "../../services/api";

export default function CadastroEstacao() {
  // Estado para armazenar os dados do formulário
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [dataInstalacao, setDataInstalacao] = useState("");
  const [indicativoAtiva, setIndicativoAtiva] = useState(false);

  // Função para enviar os dados para o back-end
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Converter latitude e longitude para float
    const latitudeFloat = parseFloat(latitude);
    const longitudeFloat = parseFloat(longitude);

    // Converter a data para o formato YYYY-MM-DD (sem hora)
    const dataFormatada = new Date(dataInstalacao).toISOString().split("T")[0];

    // Criar o objeto com os dados do formulário
    const dadosEstacao = {
      nome: nome,
      endereco: endereco,
      latitude: latitudeFloat, // Envia como float
      longitude: longitudeFloat, // Envia como float
      data_instalacao: dataFormatada, // Envia a data no formato YYYY-MM-DD
      status: indicativoAtiva, // Corrigido de "estatus" para "status"
    };

    // Exibe os dados no console antes de enviar
    console.log("Dados enviados:", dadosEstacao);

    try {
      const response = await fetchWithAuth("http://localhost:3000/api/estacao", {
        method: "POST",
        body: JSON.stringify(dadosEstacao),
      });

      if (response.ok) {
        alert("Estação cadastrada com sucesso!");
        // Limpar os campos do formulário após o envio
        setNome("");
        setEndereco("");
        setLatitude("");
        setLongitude("");
        setDataInstalacao("");
        setIndicativoAtiva(false);
      } else {
        alert("Erro ao cadastrar a estação");
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
          Estação
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
              id="name"
              type="text"
              placeholder="Nome estação"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          {/* Campo Endereco */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="nome"
            >
              Endereco
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Endereço"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />
          </div>

          {/* Campo Latitude */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="latitude"
            >
              Latitude
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="latitude"
              type="text"
              placeholder="Lat"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </div>

          {/* Campo Longitude */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="longitude"
            >
              Longitude
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="longitude"
              type="text"
              placeholder="Long"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </div>

          {/* Campo Data de Instalação */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="data_instalacao"
            >
              Data de Instalação
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="data_instalacao"
              type="date"
              value={dataInstalacao}
              onChange={(e) => setDataInstalacao(e.target.value)}
            />
          </div>

          {/* Campo Indicativo Ativa */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="indicativo_ativa"
            >
              Indicativo Ativa
            </label>
            <input
              type="checkbox"
              id="indicativo_ativa"
              checked={indicativoAtiva}
              onChange={(e) => setIndicativoAtiva(e.target.checked)}
            />
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