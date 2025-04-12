import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Alerta from "../../model/Alerta";
import { ChevronDown, ChevronUp } from "lucide-react";
import { fetchWithAuth } from "../../services/api";
import Aside from "../shared/aside/Aside"; // Import the Aside component

export default function Alertas() {
  const [Alertas, setAlertas] = useState<Alerta[]>([]);
  const [expandido, setExpandido] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlertas = async () => {
      try {
        const data: Alerta[] = await fetchWithAuth("http://localhost:3000/api/alerta");
        setAlertas(data);
      } catch (error) {
        console.error("Erro ao buscar tipos de alertas:", error);
      }
    };

    fetchAlertas();
  }, []);

  const handleEditar = (id: number) => {
    navigate(`/editarAlerta/${id}`);
  };

  const handleExcluir = async (id: number) => {
    if (window.confirm("Deseja realmente excluir esse tipo de alerta?")) {
      try {
        await fetchWithAuth(`http://localhost:3000/api/alerta/${id}`, {
          method: "DELETE",
        });

        setAlertas((prevAlertas) =>
          prevAlertas.filter((Alerta) => Alerta.id_alerta !== id)
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
        <h2>Lista de Alertas</h2>
        {Alertas.map((Alerta) => (
          <div key={Alerta.id_alerta} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ddd", borderRadius: "6px" }}>
            <div
              style={{ display: "flex", justifyContent: "space-between", cursor: "pointer" }}
              onClick={() => setExpandido(expandido === Alerta.id_alerta! ? null : Alerta.id_alerta!)}
            >
              <h3>Nome: {Alerta.nome}</h3>
              {expandido === Alerta.id_alerta ? <ChevronUp /> : <ChevronDown />}
            </div>
            {expandido === Alerta.id_alerta && (
              <div style={{ marginTop: "10px", paddingLeft: "10px" }}>
                <p><strong>Conteúdo:</strong> {Alerta.conteudo}</p>
                <p><strong>ID do Tipo de Alerta:</strong> {Alerta.id_alerta}</p>
                <p><strong>ID do Parâmetro:</strong> {Alerta.parametro.id_parametro}</p>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "flex-start", marginTop: "10px", gap: "10px" }}>
              <button
                onClick={() => handleEditar(Alerta.id_alerta!)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => handleExcluir(Alerta.id_alerta!)}
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
