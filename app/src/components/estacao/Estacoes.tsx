import React, { useState, useEffect } from 'react';
import DetalheEstacao from './DetalheEstacao'; // Importando o componente de detalhes

export default function Estacoes() {
  // Simulando a resposta da API com uma lista de estações
  const [estacoes, setEstacoes] = useState([]);
  const [estacaoSelecionada, setEstacaoSelecionada] = useState(null);

  // Aqui, você faria a requisição para buscar a lista de estações da sua API usando useEffect
  useEffect(() => {
    // Simulação de fetch da API
    const fetchEstacoes = async () => {
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              nome: "Estação Central",
              latitude: "-23.5505",
              longitude: "-46.6333",
              endereco: "Av. Paulista, 1000, São Paulo, SP",
              parametros: [1, 2, 3]
            },
            {
              nome: "Estação Norte",
              latitude: "-23.5636",
              longitude: "-46.6565",
              endereco: "Rua do Norte, 200, São Paulo, SP",
              parametros: [4, 5, 6]
            },
          ]);
        }, 1000);
      });

      setEstacoes(response);
    };

    fetchEstacoes();
  }, []);

  // Função para exibir os detalhes de uma estação
  const mostrarDetalhes = (estacao) => {
    setEstacaoSelecionada(estacao);
  };

  return (
    <div className="flex sm:flex-row gap-4 bg-gray-800 items-center flex-col">
      {/* Exibe a lista de estações */}
      {estacoes.map((estacao, index) => (
        <div key={index} className="relative bg-gray-900 block p-6 border border-gray-100 rounded-lg w-[300px] mx-auto mt-8">
          <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-green-500 to-green-600"></span>

          <div className="my-4">
            <h2 className="text-white text-2xl font-bold pb-2">{estacao.nome}</h2>
            <p className="text-gray-300 py-1">Latitude: {estacao.latitude}</p>
            <p className="text-gray-300 py-1">Longitude: {estacao.longitude}</p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => mostrarDetalhes(estacao)}
              className="px-2 py-1 text-white border border-gray-200 font-semibold rounded hover:bg-gray-800"
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






// export default function Estacoes(){
//     return(
//         <div className="flex sm:flex-row gap-4 bg-gray-800 items-center flex-col ">
//         <div className="relative bg-gray-900 block p-6 border border-gray-100 rounded-lg w-[300px]  mx-auto mt-8">
  
//             <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-green-500 to-green-600">
//             </span>

//             <div className="my-4">
//                 <h2 className="text-white text-2xl font-bold pb-2">Nome</h2>
//                 <p className="text-gray-300 py-1">Lat</p>
//                 <p className="text-gray-300 py-1">Long</p>
//             </div>

//             <div className="flex justify-end">
//                 <button className="px-2 py-1 text-white border border-gray-200 font-semibold rounded hover:bg-gray-800">
//                     Detalhe
//                 </button>
//             </div>
//         </div>

//         </div>
//     );
// }