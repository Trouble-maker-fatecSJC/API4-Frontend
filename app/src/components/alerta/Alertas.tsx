import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Alerta from "../../model/Alerta";
import { fetchWithAuth } from "../../services/api";
import Aside from "../shared/aside/Aside"; // Import the Aside component

export default function Alertas() {
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlertas = async () => {
      try {
        const data: Alerta[] = await fetchWithAuth("http://localhost:3000/api/alerta");
        setAlertas(data);
      } catch (error) {
        console.error("Erro ao buscar alertas:", error);
      }
    };

    fetchAlertas();
  }, []);

  const handleEditar = (id: number) => {
    navigate(`/editaralerta/${id}`);
  };

  const handleExcluir = async (id: number) => {
    if (window.confirm("Deseja realmente excluir esse alerta?")) {
      try {
        await fetchWithAuth(`http://localhost:3000/api/alerta/${id}`, {
          method: "DELETE",
        });

        setAlertas((prevAlertas) =>
          prevAlertas.filter((alerta) => alerta.id_alerta !== id)
        );
        alert("Alerta excluído com sucesso!");
      } catch (error) {
        console.error("Erro ao excluir o alerta:", error);
        alert("Erro ao excluir o alerta.");
      }
    }
  };

  return (
    <>
      <Aside />
      <div style={{ maxWidth: "600px", margin: "20px auto", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h2>Lista de Alertas</h2>
        {alertas.map((alerta) => (
          <div key={alerta.id_alerta} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ddd", borderRadius: "6px" }}>
            <div>
              <p><strong>ID do Alerta:</strong> {alerta.id_alerta}</p>
              <p><strong>Data do Alerta:</strong> {new Date(alerta.data_alerta).toLocaleString()}</p>
              <p><strong>ID do Tipo de Alerta:</strong> {alerta.tipoAlerta.id_tipo_alerta}</p>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-start", marginTop: "10px", gap: "10px" }}>
              <button
                onClick={() => handleEditar(alerta.id_alerta!)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => handleExcluir(alerta.id_alerta!)}
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
