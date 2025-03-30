import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TipoAlerta from "../../model/TipoAlertas";
import { ChevronDown, ChevronUp } from "lucide-react";
import { fetchWithAuth } from "../../services/api";
import Aside from "../shared/aside/Aside"; // Import the Aside component

export default function TipoAlertas() {
  const [tipoAlertas, setTipoAlertas] = useState<TipoAlerta[]>([]);
  const [expandido, setExpandido] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTipoAlertas = async () => {
      try {
        const data: TipoAlerta[] = await fetchWithAuth("http://localhost:3000/api/tipoalerta");
        setTipoAlertas(data);
      } catch (error) {
        console.error("Erro ao buscar tipos de alertas:", error);
      }
    };

    fetchTipoAlertas();
  }, []);

  const handleEditar = (id: number) => {
    navigate(`/editartipoalerta/${id}`);
  };

  const handleExcluir = async (id: number) => {
    if (window.confirm("Deseja realmente excluir esse tipo de alerta?")) {
      try {
        await fetchWithAuth(`http://localhost:3000/api/tipoalerta/${id}`, {
          method: "DELETE",
        });

        setTipoAlertas((prevTipoAlertas) =>
          prevTipoAlertas.filter((tipoAlerta) => tipoAlerta.id_tipo_alerta !== id)
        );
        alert("Tipo de alerta excluído com sucesso!");
      } catch (error) {
        console.error("Erro ao excluir o tipo de alerta:", error);
        alert("Erro ao excluir o tipo de alerta.");
      }
    }
  };

  return (
    <>
      <Aside />
      <div style={{ maxWidth: "600px", margin: "20px auto", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h2>Lista de Tipos de Alertas</h2>
        {tipoAlertas.map((tipoAlerta) => (
          <div key={tipoAlerta.id_tipo_alerta} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ddd", borderRadius: "6px" }}>
            <div
              style={{ display: "flex", justifyContent: "space-between", cursor: "pointer" }}
              onClick={() => setExpandido(expandido === tipoAlerta.id_tipo_alerta ? null : tipoAlerta.id_tipo_alerta)}
            >
              <h3>Nome: {tipoAlerta.nome}</h3>
              {expandido === tipoAlerta.id_tipo_alerta ? <ChevronUp /> : <ChevronDown />}
            </div>
            {expandido === tipoAlerta.id_tipo_alerta && (
              <div style={{ marginTop: "10px", paddingLeft: "10px" }}>
                <p><strong>Conteúdo:</strong> {tipoAlerta.conteudo}</p>
                <p><strong>ID do Tipo de Alerta:</strong> {tipoAlerta.id_tipo_alerta}</p>
                <p><strong>ID do Parâmetro:</strong> {tipoAlerta.parametro.id_parametro}</p>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "flex-start", marginTop: "10px", gap: "10px" }}>
              <button
                onClick={() => handleEditar(tipoAlerta.id_tipo_alerta!)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => handleExcluir(tipoAlerta.id_tipo_alerta!)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
