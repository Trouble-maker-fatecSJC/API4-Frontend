import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Parametro from "../../model/Parametro";

export default function EditarTipoAlerta() {
  const [nome, setNome] = useState<string>("");
  const [conteudo, setConteudo] = useState<string>("");
  const [idParametro, setIdParametro] = useState<number | string>(""); // Select para id_parametro
  const [parametros, setParametros] = useState<Parametro[]>([]);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParametros = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/parametro");
        const data = await response.json();
        setParametros(data);
      } catch (error) {
        console.error("Erro ao buscar parâmetros:", error);
      }
    };

    fetchParametros();
  }, []);

  useEffect(() => {
    const fetchTipoAlerta = async () => {
      if (!id) return;

      try {
        const response = await fetch(`http://localhost:3000/api/tipoalerta/${id}`);
        if (response.ok) {
          const data = await response.json();
          setNome(data.nome || "");
          setConteudo(data.conteudo || "");
          setIdParametro(data.parametro?.id || ""); // Ajustado para usar "id"
        } else {
          console.error("Erro ao buscar o tipo de alerta:", response.statusText);
        }
      } catch (error) {
        console.error("Erro ao conectar com o servidor:", error);
      }
    };

    fetchTipoAlerta();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const idParametroNumber = Number(idParametro); // Converter idParametro para número
    if (isNaN(idParametroNumber) || idParametroNumber <= 0) {
      alert("Por favor, selecione um parâmetro válido.");
      console.error("Erro: idParametro não é um número válido."); // Log do erro
      return;
    }

    const idTipoAlerta = Number(id); // Converter id para número
    if (isNaN(idTipoAlerta) || idTipoAlerta <= 0) {
      alert("Erro interno: ID do tipo de alerta inválido.");
      console.error("Erro: idTipoAlerta não é um número válido."); // Log do erro
      return;
    }

    const novoTipoAlerta = {
      id_tipo_alerta: idTipoAlerta,
      nome,
      conteudo,
      parametro: { id: idParametroNumber }, // Ajustado para enviar o parâmetro como objeto aninhado
    };

    console.log("Enviando dados para o backend:", novoTipoAlerta);

    try {
      const response = await fetch(
        `http://localhost:3000/api/tipoalerta/${idTipoAlerta}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(novoTipoAlerta),
        }
      );

      if (response.ok) {
        alert("Tipo de alerta atualizado com sucesso!");
        navigate("/tipoalertas");
      } else {
        const errorData = await response.json();
        console.error("Erro ao atualizar tipo de alerta:", errorData);
        alert("Erro ao atualizar tipo de alerta");
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      alert("Erro ao conectar com o servidor");
    }
  };

  const handleCancel = () => {
    navigate("/tipoalertas");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
        Edição de Tipo de Alerta
      </div>
      <form className="py-4 px-6" onSubmit={handleSubmit}>
        {/* Campo Nome */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="nome">
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

        {/* Campo Conteúdo */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="conteudo"
          >
            Conteúdo
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="conteudo"
            placeholder="Digite o conteúdo do tipo de alerta"
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
          />
        </div>

        {/* Campo ID do Parâmetro */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="idParametro"
          >
            Parâmetro
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="idParametro"
            value={idParametro}
            onChange={(e) => setIdParametro(e.target.value)}
          >
            <option value="">Selecione o Parâmetro</option>
            {parametros.map((parametro) => (
              <option key={parametro.id_parametro} value={parametro.id_parametro}>
                {parametro.id_parametro}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-center mt-6">
          <button className="btn-cadastrar" type="submit">
            Salvar Alterações
          </button>
          <button
            type="button"
            className="btn-cancelar ml-4"
            onClick={handleCancel}
          >
            Cancelar Alterações
          </button>
        </div>
      </form>
    </div>
  );
}
