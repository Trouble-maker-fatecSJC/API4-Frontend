import { useState, useEffect } from "react";
import Coleta from "../../model/Coleta";
import Coletados from "./Coletados";
import { fetchWithAuth } from "../../services/api"; // Import fetchWithAuth

export default function Coletas() {
  const [coletasPorEstacao, setColetasPorEstacao] = useState<Map<number, Coleta[]>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [estacaoSelecionada, setEstacaoSelecionada] = useState<number | null>(null);

  useEffect(() => {
    async function getColetas() {
      try {
        const data = await fetchWithAuth("http://localhost:3000/api/coletar-parametros"); // Use fetchWithAuth
        console.log("Dados recebidos:", data);

        // Agrupa as coletas por ID da estação
        const coletasMap = new Map<number, Coleta[]>();
        data.forEach((coleta: Coleta) => {
          const idEstacao = coleta.estacao.id_estacao;
          if (!coletasMap.has(idEstacao)) {
            coletasMap.set(idEstacao, []);
          }
          coletasMap.get(idEstacao)?.push(coleta);
        });

        setColetasPorEstacao(coletasMap);
      } catch (error) {
        console.error("Erro ao carregar as coletas:", error);
      } finally {
        setIsLoading(false);
      }
    }

    getColetas();
  }, []);

  return (
    <div className="ajuste-margem">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-black-100 text-center mt-10">
        Coletas de Parâmetros
      </h1>

      {isLoading ? (
        <p className="text-center mt-4">Carregando...</p>
      ) : (
        <div className="overflow-x-auto mt-4">
          {/* Lista de estações */}
          <div className="flex gap-2 bg-gray-900 text-white font-bold">
            <div className="w-2/4">Estação</div>
          </div>

          {[...coletasPorEstacao.keys()].map((idEstacao) => {
            const coletasDaEstacao = coletasPorEstacao.get(idEstacao) || [];
            const nomeEstacao = coletasDaEstacao[0]?.estacao.nome || "Estação Desconhecida";

            return (
              <div key={idEstacao} className="box-coleta flex-col gap-2 w-full">
                <div className=" w-full flex py-2 align-middle">
                  <div className="w-[28%] ml-1 flex">{nomeEstacao}</div>
                  <div className="ml-auto my-auto">
                    <button
                      onClick={() => setEstacaoSelecionada(idEstacao)}
                      className=""
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <h3 className="flex items-center w-full">
                  <span className="flex-grow bg-gray-200 rounded h-1"></span>
                  <span className="flex-grow bg-gray-200 rounded h-1"></span>
                </h3>
              </div>
            );
          })}
        </div>
      )}

      {/* Exibe as coletas da estação selecionada */}
      {estacaoSelecionada !== null && (
        <Coletados
          coletas={coletasPorEstacao.get(estacaoSelecionada) || []}
          onClose={() => setEstacaoSelecionada(null)}
        />
      )}
    </div>
  );
}