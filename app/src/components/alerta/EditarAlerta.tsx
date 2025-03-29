import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Alerta from "../../model/Alerta";
import TipoAlerta from "../../model/TipoAlerta";
import { fetchWithAuth } from "../../services/api";

export default function EditarAlerta() {
  const [alerta, setAlerta] = useState<Alerta | null>(null);
  const [dataAlerta, setDataAlerta] = useState<string>("");
  const [idTipoAlerta, setIdTipoAlerta] = useState<number | string>("");
  const [tiposAlerta, setTiposAlerta] = useState<TipoAlerta[]>([]);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTiposAlerta = async () => {
      try {
        const data = await fetchWithAuth("http://localhost:3000/api/tipoalerta");
        setTiposAlerta(data);
      } catch (error) {
        console.error("Erro ao buscar tipos de alerta:", error);
      }
    };

    const fetchAlerta = async () => {
      if (!id) return;

      try {
        const data: Alerta = await fetchWithAuth(`http://localhost:3000/api/alerta/${id}`);
        setAlerta(data);
        setDataAlerta(new Date(data.data_alerta).toISOString().slice(0, 16)); // Formato compatível com datetime-local
        setIdTipoAlerta(data.tipo_alerta);
      } catch (error) {
        console.error("Erro ao buscar o alerta:", error);
      }
    };

    fetchTiposAlerta();
    fetchAlerta();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const idTipoAlertaNumber = Number(idTipoAlerta);
    if (isNaN(idTipoAlertaNumber) || idTipoAlertaNumber <= 0) {
      alert("Por favor, selecione um tipo de alerta válido.");
      return;
    }

    const novoAlerta = {
      id_alerta: alerta?.id_alerta,
      data_alerta: new Date(dataAlerta).toISOString(),
      tipoAlerta: idTipoAlertaNumber,
    };

    try {
      const response = await fetchWithAuth(`http://localhost:3000/api/alerta/${id}`, {
        method: "PUT",
        body: JSON.stringify(novoAlerta),
      });

      if (response.ok) {
        alert("Alerta atualizado com sucesso!");
        navigate("/alertas");
      } else {
        const errorData = await response.json();
        console.error("Erro ao atualizar alerta:", errorData);
        alert("Erro ao atualizar alerta");
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      alert("Erro ao conectar com o servidor");
    }
  };

  const handleCancel = () => {
    navigate("/alertas");
  };

  if (!alerta) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
        Edição de Alerta
      </div>
      <form className="py-4 px-6" onSubmit={handleSubmit}>
        {/* Campo ID do Alerta (somente leitura) */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="idAlerta">
            ID do Alerta
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="idAlerta"
            type="text"
            value={alerta.id_alerta}
            readOnly
          />
        </div>

        {/* Campo Data do Alerta */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="dataAlerta">
            Data do Alerta
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="dataAlerta"
            type="datetime-local"
            value={dataAlerta}
            onChange={(e) => setDataAlerta(e.target.value)}
          />
        </div>

        {/* Campo Tipo de Alerta */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="idTipoAlerta">
            Tipo de Alerta
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="idTipoAlerta"
            value={idTipoAlerta}
            onChange={(e) => setIdTipoAlerta(e.target.value)}
          >
            <option value="">Selecione o Tipo de Alerta</option>
            {tiposAlerta.map((tipo) => (
              <option key={tipo.id_tipo_alerta} value={tipo.id_tipo_alerta}>
                {tipo.nome}
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


