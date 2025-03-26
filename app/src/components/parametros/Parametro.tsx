import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Parametro from "../../model/Parametros";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Parametros() {
  const [parametros, setParametros] = useState<Parametro[]>([]);
  const [expandido, setExpandido] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParametros = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/parametro");

        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        }

        const text = await response.text();
        console.log("Resposta do servidor:", text);

        const data: Parametro[] = JSON.parse(text);
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
  const handleExcluir = async (id: string) => {
    if (window.confirm("Deseja realmente excluir esse parâmetro?")) {
      try {
        const response = await fetch(`http://localhost:3000/api/parametro/${id}`, {
          method: "DELETE",
        });
  
        if (!response.ok) {
          const errorData = await response.json(); // Para capturar a resposta de erro
          console.error("Erro ao excluir parâmetro:", errorData);
          alert("Erro ao excluir o parâmetro.");
        } else {
          alert("Parâmetro excluído com sucesso!");
          // Atualize o estado para remover o parâmetro da lista
          setParametros((prevParametros) =>
            prevParametros.filter((parametro) => parametro.id_parametro !== id)
          );
        }
      } catch (error) {
        console.error("Erro ao excluir o parâmetro:", error);
        alert("Erro ao excluir o parâmetro.");
      }
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Lista de Parâmetros</h2>
      {parametros.map((parametro) => (
        <div key={parametro.id_parametro} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ddd", borderRadius: "6px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", cursor: "pointer" }} 
               onClick={() => setExpandido(expandido === parametro.id_parametro! ? null : parametro.id_parametro!)}>
            <h3>ID: {parametro.id_parametro} - CPF: {parametro.usuario.cpf}</h3>
            {expandido === parametro.id_parametro! ? <ChevronUp /> : <ChevronDown />}
          </div>
          {expandido === parametro.id_parametro! && (
            <div style={{ marginTop: "10px", paddingLeft: "10px" }}>
              <p><strong>Velocidade do Vento:</strong> {parametro.velocidade_vento} m/s</p>
              <p><strong>Direção do Vento:</strong> {parametro.direcao_vento}°</p>
              <p><strong>Temperatura:</strong> {parametro.temperatura}°C</p>
              <p><strong>Umidade:</strong> {parametro.umidade}%</p>
              <p><strong>Chuva:</strong> {parametro.chuva} mm</p>
              <p><strong>ID Tipo Parâmetro:</strong> {parametro.tipo_parametro}</p>
              <p><strong>ID Estação:</strong> {parametro.id_da_estacao}</p>
              <p><strong>ID Medida:</strong> {parametro.id_de_medida}</p>
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
  );
}
