import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Parametro from "../../model/Parametro";
import { ChevronDown, ChevronUp } from "lucide-react";
import { fetchWithAuth } from "../../services/api";
import Aside from "../shared/aside/Aside"; // Import the Aside component

export default function Parametros() {
  const [parametros, setParametros] = useState<Parametro[]>([]);
  const [expandido, setExpandido] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParametros = async () => {
      try {
        const data: Parametro[] = await fetchWithAuth("http://localhost:3000/api/parametro");
        setParametros(data);
      } catch (error) {
        console.error("Erro ao buscar parâmetros:", error);
      }
    };

    fetchParametros();
  }, []);

  // Função para navegar para a página de edição
  const handleEditar = (id: number) => {
    navigate(`/editarparametro/${id}`);
  };

  // Função para deletar o parâmetro com confirmação
  const handleExcluir = async (id: number) => {
    if (window.confirm("Deseja realmente excluir esse parâmetro?")) {
      try {
        await fetchWithAuth(`http://localhost:3000/api/parametro/${id}`, { method: "DELETE" });
        setParametros((prevParametros) =>
          prevParametros.filter((parametro) => typeof parametro.id_parametro === "number" && parametro.id_parametro !== id)
        );
        alert("Parâmetro excluído com sucesso!");
        window.location.reload();
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
        console.error("Erro ao excluir o parâmetro:", errorMessage);
        alert(errorMessage || "Erro ao excluir o parâmetro.");
      }
    }
  };

  return (
    <>
      <Aside />
      <div style={{ maxWidth: "600px", margin: "20px auto", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h2>Lista de Parâmetros</h2>
        {parametros.map((parametro) => (
          <div key={parametro.id_parametro} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ddd", borderRadius: "6px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", cursor: "pointer" }} 
                 onClick={() => setExpandido(expandido === parametro.id_parametro! ? null : parametro.id_parametro!)}>
              <h3>ID: {parametro.id_parametro}</h3>
              {expandido === parametro.id_parametro! ? <ChevronUp /> : <ChevronDown />}
            </div>
            {expandido === parametro.id_parametro! && (
              <div style={{ marginTop: "10px", paddingLeft: "10px" }}>
                <p><strong>Velocidade do Vento:</strong> {parametro.velocidade_vento} m/s</p>
                <p><strong>Direção do Vento:</strong> {parametro.direcao_vento}°</p>
                <p><strong>Temperatura:</strong> {parametro.temperatura}°C</p>
                <p><strong>Umidade:</strong> {parametro.umidade}%</p>
                <p><strong>Chuva:</strong> {parametro.chuva} mm</p>
                <p><strong>ID Tipo Parâmetro:</strong> {parametro.tipoParametro.id_tipo_param}</p>
                <p><strong>ID Estação:</strong> {parametro.estacao.id_estacao}</p>
                <p><strong>ID Medida:</strong> {parametro.medida.id_medida}</p>
              </div>
            )}

            {/* Botões de Editar e Excluir */}
            <div style={{ display: "flex", justifyContent: "flex-start", marginTop: "10px", gap: "10px" }}>
              <button 
                onClick={() => handleEditar(parametro.id_parametro!)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
                Editar
              </button>
              <button 
                onClick={() => handleExcluir(parametro.id_parametro!)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
