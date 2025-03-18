import { useState, useEffect } from 'react';
import DetalheEstacao from './DetalheEstacao'; // Importando o componente de detalhes

export default function Estacoes() {
  // Simulando a resposta da API com uma lista de estações
  interface Estacao {
    nome: string;
    latitude: number;
    longitude: number;
    endereco: string;
    parametros: string[];
  }

  const [estacoes, setEstacoes] = useState<Estacao[]>([]);
  const [estacaoSelecionada, setEstacaoSelecionada] = useState<Estacao | null>(null);

  // Aqui, você faria a requisição para buscar a lista de estações da sua API usando useEffect
  useEffect(() => {
    // Simulação de fetch da API
    const fetchEstacoes = async () => {
      const response = await new Promise<Estacao[]>((resolve) => {
        setTimeout(() => {
          resolve([
            {
              nome: "Estação Central",
              latitude: -23.5505,
              longitude: -46.6333,
              endereco: "Av. Paulista, 1000, São Paulo, SP",
              parametros: ["1", "2", "3"]
            },
            {
              nome: "Estação Norte",
              latitude: -23.5636,
              longitude: -46.6565,
              endereco: "Rua do Norte, 200, São Paulo, SP",
              parametros: ["4", "5", "6"]
            },
          ]);
        }, 1000);
      });

      setEstacoes(response);
    };

    fetchEstacoes();
  }, []);

  // Função para exibir os detalhes de uma estação
  const mostrarDetalhes = (estacao: Estacao) => {
    setEstacaoSelecionada(estacao);
  };

  return (
    <div className="flex sm:flex-row gap-4 bg-gray-800 items-center flex-col">
      {/* Exibe a lista de estações */}
      {estacoes.map((estacao, index) => (
        <div key={index} className="relative bg-gray-900 block p-6 border border-gray-100 rounded-lg w-[300px] mt-4">
          <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-green-500 to-green-600"></span>

          <div className="my-4">
            <h2 className="text-white text-2xl font-bold pb-2">{estacao.nome}</h2>
            <p className="text-gray-300 py-1">Latitude: {estacao.latitude}</p>
            <p className="text-gray-300 py-1">Longitude: {estacao.longitude}</p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => mostrarDetalhes(estacao)}
              className="btn-detalhe"
            >
              Detalhe
            </button>
          </div>
        </div>
      ))}

      {/* Se houver uma estação selecionada, exibe o componente de detalhes */}
      {estacaoSelecionada && <DetalheEstacao estacao={estacaoSelecionada} />}
    </div>
  );
}