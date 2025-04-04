import { useState, useEffect } from "react";
import Medidas from "../../model/Medidas";
import Aside from "../shared/aside/Aside";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../../services/api";

export default function Medida() {
  const navigate = useNavigate();
  const [medidas, setMedidas] = useState<Medidas[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getMedidas() {
      try {
        const data = await fetchWithAuth("http://localhost:3000/api/medidas");
        console.log("Dados recebidos:", data);
        setMedidas(data);
      } catch (error) {
        console.error("Erro ao carregar as medidas:", error);
      } finally {
        setIsLoading(false);
      }
    }
    getMedidas();
  }, []);

  const handleEditar = (idEdicao: number) => {
    navigate(`/editarmedida/${idEdicao}`);
  };

  const handleExcluir = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta medida?")) {
      try {
        await fetchWithAuth(`http://localhost:3000/api/medidas/${id}`, { method: "DELETE" });
        setMedidas(medidas.filter((medida) => medida.id_medida !== id));
        alert("Medida excluída com sucesso!");
        window.location.reload();
      } catch (error) {
        console.error("Erro ao excluir medida:", error);
      }
    }
  };

  return (
    <>
      <Aside />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-black-100 text-center">
          Medidas
        </h1>
        {isLoading ? (
          <p className="text-center">Carregando...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full mt-4 border-collapse border border-gray-300 dark:border-gray-700 text-sm sm:text-base">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800 text-left text-white">
                  <th className="py-2 px-4 border">Valor</th>
                  <th className="py-2 px-4 border">UnixTime</th>
                  <th className="py-2 px-4 border">Ações</th>
                </tr>
              </thead>
              <tbody>
                {medidas.map((medida) => (
                  <tr key={medida.id_medida} className="border-b dark:border-gray-700">
                    <td className="py-2 px-4 border">{medida.valor}</td>
                    <td className="py-2 px-4 border">{medida.unix_time}</td>
                    <td className="py-2 px-4 border flex space-x-2">
                      <button onClick={() => handleEditar(medida.id_medida)} className="btn-editar">
                        Editar
                      </button>
                      <button onClick={() => handleExcluir(medida.id_medida)} className="btn-delete">
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}



