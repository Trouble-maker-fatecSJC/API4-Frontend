import React, { useState } from "react";
import Aside from "../shared/aside/Aside";
import { fetchWithAuth } from "../../services/api";

export default function CadastroTipoParametro() {
    const [jsonParam, setJsonParam] = useState("");
    const [nome, setNome] = useState("");
    const [unidade, setUnidade] = useState("");
    const [offsett, setOffset] = useState("");
    const [qtd_casadesc, setQtd] = useState("");
    const [fator, setFator] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const TipoParametro = {
      json_param: jsonParam,
      nome: nome,
        unidade: unidade,
        offset: offsett,
        qtd_casadesc: qtd_casadesc,
        fator: fator
    };

    console.log("Dados enviados:", TipoParametro);

    try {
      const response = await fetchWithAuth("http://localhost:3000/api/tipoparametro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(TipoParametro),
      });

      if (response.ok) {
        alert("Erro ao cadastrar o TipoParametro");
      } else {
        alert("TipoParametro cadastrado com sucesso!");
        setJsonParam("");
        setNome("");
        setUnidade("");
        setQtd("");
        setFator("");
        
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
          Cadastro de TipoParametros
        </div>
        <form className="py-4 px-6" onSubmit={handleSubmit}>
          {/* Campo jsonParam */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="jsonParam">
              Json Parametro
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="jsonParam"
              type="text"
              placeholder="Digite o parametro json"
              value={jsonParam}
              onChange={(e) => setJsonParam(e.target.value)}
            />
          </div>
          {/* Campo Nome */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="nome">
              Nome
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nome"
              type="text"
              placeholder="Digite o nome do tipo de parametro"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
        {/* Campo Unidade */}
        <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="unidade">
                    Unidade
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="unidade"
                    type="text"
                    placeholder="Digite a unidade do parametro"
                    value={unidade}
                    onChange={(e) => setUnidade(e.target.value)}
                />
            </div>
        {/* Campo offset */}
        <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="offset">
                    Offset
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="unidade"
                    type="text"
                    placeholder="Digite o offset"
                    value={offsett}
                    onChange={(e) => setOffset(e.target.value)}
                />
            </div>
            {/* Campo Qtd Casa Decimais */}
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="qtd">
                    Quantidade de casas decimais
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="qtd"
                    type="text"
                    placeholder="Digite a quantidade de casas decimais que vão ser consideradas"
                    value={qtd_casadesc}
                    onChange={(e) => setQtd(e.target.value)}
                />
            </div>
            {/* Campo Fator */}
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="fator">
                    Fator
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="fator"
                    type="text"
                    placeholder="Digite o fator"
                    value={fator}
                    onChange={(e) => setFator(e.target.value)}
                />
            </div>
          {/* Botão de Cadastro */}
          <div className="flex items-center justify-center mt-6">
            <button className="btn-cadastrar" type="submit">
              Cadastrar TipoParametro
            </button>
          </div>
        </form>
      </div>
    </>
  );
}