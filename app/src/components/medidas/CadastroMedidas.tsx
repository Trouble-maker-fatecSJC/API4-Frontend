import React, { useState } from "react";
import Aside from "../shared/aside/Aside";
import { fetchWithAuth } from "../../services/api";

export default function CadastroMedidas() {
  const [valor, setValor] = useState("");
  const [unixTime, setUnixTime] = useState("");
  const [idEstacao, setIdEstacao] = useState<string>("");
  const [idParametro, setIdParametro] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const medida = {
      valor: parseFloat(valor),
      unix_time: unixTime,
    };

    console.log("Dados enviados:", medida);

    try {
      const response = await fetchWithAuth("http://localhost:3000/api/medidas", {
        method: "POST",
        body: JSON.stringify(medida),
      });

      if (response.ok) {
        alert("Erro ao cadastrar a medida");
      } else {
        alert("Medida cadastrada com sucesso!");
        setValor("");
        setUnixTime("");
        setIdEstacao("");
        setIdParametro("");
        
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
          Cadastro de Medidas
        </div>
        <form className="py-4 px-6" onSubmit={handleSubmit}>
          {/* Campo Valor */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="valor">
              Valor
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="valor"
              type="number"
              placeholder="Digite o valor da medida"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
            />
          </div>

          {/* Campo Unix Time */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="unixTime">
              Unix Time
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="unixTime"
              type="text"
              placeholder="Digite o timestamp Unix"
              value={unixTime}
              onChange={(e) => setUnixTime(e.target.value)}
            />
          </div>
        {/* Campo id estação */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="estacao">
              id estação
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="estacao"
              type="number"
              placeholder="Digite o id da estação"
              value={idEstacao}
              onChange={(e) => setValor(e.target.value)}
            />
          </div>
          {/* id parametro */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="parametro">
              Parametro
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="aprametro"
              type="number"
              placeholder="Digite o parametro"
              value={idParametro}
              onChange={(e) => setValor(e.target.value)}
            />
          </div>

          {/* Botão de Cadastro */}
          <div className="flex items-center justify-center mt-6">
            <button className="btn-cadastrar" type="submit">
              Cadastrar Medida
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
