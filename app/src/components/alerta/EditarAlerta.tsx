import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Parametro from "../../model/Parametro";
import { fetchWithAuth } from "../../services/api";
import Aside from "../shared/aside/Aside";

export default function EditarAlerta() {
  const [nome, setNome] = useState<string>("");
  const [conteudo, setConteudo] = useState<string>("");
  const [idParametro, setIdParametro] = useState<number | string>("");
  const [parametros, setParametros] = useState<Parametro[]>([]);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParametros = async () => {
      try {
        const data = await fetchWithAuth("http://localhost:3000/api/parametro");
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
        const data = await fetchWithAuth(`http://localhost:3000/api/alerta/${id}`);
        setNome(data.nome || "");
        setConteudo(data.conteudo || "");
        setIdParametro(data.parametro?.id_parametro || "");
      } catch (error) {
        console.error("Erro ao buscar o tipo de alerta:", error);
      }
    };

    fetchTipoAlerta();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const idParametroNumber = Number(idParametro);
    if (isNaN(idParametroNumber) || idParametroNumber <= 0) {
      alert("Por favor, selecione um parâmetro válido.");
      console.error("Erro: idParametro não é um número válido.");
      return;
    }

    const idAlerta = Number(id);
    if (isNaN(idAlerta) || idAlerta <= 0) {
      alert("Erro interno: ID do tipo de alerta inválido.");
      console.error("Erro: idAlerta não é um número válido.");
      return;
    }

    const novoAlerta = {
      id_alerta: idAlerta,
      nome,
      conteudo,
      parametro: { id: idParametroNumber },
    };

    console.log("Enviando dados para o backend:", novoAlerta);

    try {
      const response = await fetchWithAuth(
        `http://localhost:3000/api/alerta/${idAlerta}`,
        {
          method: "PUT",
          body: JSON.stringify(novoAlerta),
        }
      );

      if (response.ok) {
        console.log("Erro ao atualizar alerta");
      } else {
        alert("Alerta atualizado com sucesso!");
        navigate("/alertas");
       
        
        
      }
    } catch (error) {
      console.log("Erro ao conectar com o servidor:", error);
    }
  };

  const handleCancel = () => {
    navigate("/alertas");
  };

  return (
    <>
    <Aside />
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
        Edição de Alerta
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
                {parametro.tipoParametro.nome}
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
    </>
  );
}


