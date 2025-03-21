// import { useState, useEffect } from 'react';
// import DetalheEstacao from './DetalheEstacao'; // Importando o componente de detalhes

// export default function Estacoes() {
//   // Simulando a resposta da API com uma lista de estações
//   interface Estacao {
//     nome: string;
//     latitude: number;
//     longitude: number;
//     endereco: string;
//     parametros: string[];
//   }

//   const [estacoes, setEstacoes] = useState<Estacao[]>([]);
//   const [estacaoSelecionada, setEstacaoSelecionada] = useState<Estacao | null>(null);

//   // Aqui, você faria a requisição para buscar a lista de estações da sua API usando useEffect
//   useEffect(() => {
//     // Simulação de fetch da API
//     const fetchEstacoes = async () => {
//       const response = await new Promise<Estacao[]>((resolve) => {
//         setTimeout(() => {
//           resolve([
//             {
//               nome: "Estação Central",
//               latitude: -23.5505,
//               longitude: -46.6333,
//               endereco: "Av. Paulista, 1000, São Paulo, SP",
//               parametros: ["1", "2", "3"]
//             },
//             {
//               nome: "Estação Norte",
//               latitude: -23.5636,
//               longitude: -46.6565,
//               endereco: "Rua do Norte, 200, São Paulo, SP",
//               parametros: ["4", "5", "6"]
//             },
//           ]);
//         }, 1000);
//       });

//       setEstacoes(response);
//     };

//     fetchEstacoes();
//   }, []);

//   // Função para exibir os detalhes de uma estação
//   const mostrarDetalhes = (estacao: Estacao) => {
//     setEstacaoSelecionada(estacao);
//   };

//   return (
//     <div className="flex sm:flex-row gap-4 bg-gray-800 items-center flex-col">
//       {/* Exibe a lista de estações */}
//       {estacoes.map((estacao, index) => (
//         <div key={index} className="relative bg-gray-900 block p-6 border border-gray-100 rounded-lg w-[300px] mt-4">
//           <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-green-500 to-green-600"></span>

//           <div className="my-4">
//             <h2 className="text-white text-2xl font-bold pb-2">{estacao.nome}</h2>
//             <p className="text-gray-300 py-1">Latitude: {estacao.latitude}</p>
//             <p className="text-gray-300 py-1">Longitude: {estacao.longitude}</p>
//           </div>

//           <div className="flex justify-end">
//             <button
//               onClick={() => mostrarDetalhes(estacao)}
//               className="btn-detalhe"
//             >
//               Detalhe
//             </button>
//           </div>
//         </div>
//       ))}

//       {/* Se houver uma estação selecionada, exibe o componente de detalhes */}
//       {estacaoSelecionada && <DetalheEstacao estacao={estacaoSelecionada} />}
//     </div>
//   );
// }

// funcionando
// import { useState, useEffect } from 'react';
// import DetalheEstacao from './DetalheEstacao'; // Importando o componente de detalhes

// export default function Estacoes() {
//   interface Estacao {
//     nome: string;
//     latitude: number;
//     longitude: number;
//     endereco: string;
//     parametros: string[];
//   }

//   const [estacoes, setEstacoes] = useState<Estacao[]>([]);
//   const [estacaoSelecionada, setEstacaoSelecionada] = useState<Estacao | null>(null);

//   useEffect(() => {
//     const fetchEstacoes = async () => {
//       const response = await new Promise<Estacao[]>((resolve) => {
//         setTimeout(() => {
//           resolve([
//             {
//               nome: "Estação Central",
//               latitude: -23.5505,
//               longitude: -46.6333,
//               endereco: "Av. Paulista, 1000, São Paulo, SP",
//               parametros: ["1", "2", "3"]
//             },
//             {
//               nome: "Estação Norte",
//               latitude: -23.5636,
//               longitude: -46.6565,
//               endereco: "Rua do Norte, 200, São Paulo, SP",
//               parametros: ["4", "5", "6"]
//             },
//           ]);
//         }, 1000);
//       });

//       setEstacoes(response);
//     };

//     fetchEstacoes();
//   }, []);

//   const mostrarDetalhes = (estacao: Estacao) => {
//     setEstacaoSelecionada(estacao);
//   };

//   // Função para fechar os detalhes
//   const fecharDetalhes = () => {
//     setEstacaoSelecionada(null);
//   };

//   return (
//     <div className="flex sm:flex-row gap-4 bg-gray-800 items-center flex-col">
//       {estacoes.map((estacao, index) => (
//         <div key={index} className="relative bg-gray-900 block p-6 border border-gray-100 rounded-lg w-[300px] mt-4">
//           <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-green-500 to-green-600"></span>

//           <div className="my-4">
//             <h2 className="text-white text-2xl font-bold pb-2">{estacao.nome}</h2>
//             <p className="text-gray-300 py-1">Latitude: {estacao.latitude}</p>
//             <p className="text-gray-300 py-1">Longitude: {estacao.longitude}</p>
//           </div>

//           <div className="flex justify-end">
//             <button
//               onClick={() => mostrarDetalhes(estacao)}
//               className="btn-detalhe"
//             >
//               Detalhe
//             </button>
//           </div>
//         </div>
//       ))}

//       {/* Se houver uma estação selecionada, exibe o componente de detalhes */}
//       {estacaoSelecionada && <DetalheEstacao estacao={estacaoSelecionada} onClose={fecharDetalhes} />}
//     </div>
//   );
// }


// sem erro ao enviar DetalheEstacao
// import { useState, useEffect } from 'react';
// import DetalheEstacao from './DetalheEstacao'; // Importando o componente de detalhes

// export default function Estacoes() {
//   interface Estacao {
//     ID_Estacao: number;
//     Nome: string;
//     Latitude: number;
//     Longitude: number;
//     Data_Instalacao: string;
//     Tipo_Estacao: string;
//     Indicativo_Ativa: boolean;
//   }

//   const [estacoes, setEstacoes] = useState<Estacao[]>([]);
//   const [estacaoSelecionada, setEstacaoSelecionada] = useState<Estacao | null>(null);

//   useEffect(() => {
//     // Função para buscar as estações da API
//     const fetchEstacoes = async () => {
//       try {
//         const response = await fetch('http://localhost:8800/estacao'); // URL para buscar as estações
//         if (response.ok) {
//           const data = await response.json();
//           setEstacoes(data);
//         } else {
//           alert('Erro ao carregar as estações');
//         }
//       } catch (error) {
//         console.error('Erro ao buscar as estações:', error);
//         alert('Erro ao conectar com o servidor');
//       }
//     };

//     fetchEstacoes();
//   }, []); // O array vazio indica que a requisição será feita apenas uma vez, na montagem do componente

//   const mostrarDetalhes = (estacao: Estacao) => {
//     setEstacaoSelecionada(estacao);
//   };

//   // Função para fechar os detalhes
//   const fecharDetalhes = () => {
//     setEstacaoSelecionada(null);
//   };

//   return (
//     <div className="flex sm:flex-row gap-4 bg-gray-800 items-center flex-col">
//       {estacoes.map((estacao) => (
//         <div key={estacao.ID_Estacao} className="relative bg-gray-900 block p-6 border border-gray-100 rounded-lg w-[300px] mt-4">
//           <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-green-500 to-green-600"></span>

//           <div className="my-4">
//             <h2 className="text-white text-2xl font-bold pb-2">{estacao.Nome}</h2>
//             <p className="text-gray-300 py-1">Latitude: {estacao.Latitude}</p>
//             <p className="text-gray-300 py-1">Longitude: {estacao.Longitude}</p>
//           </div>

//           <div className="flex justify-end">
//             <button
//               onClick={() => mostrarDetalhes(estacao)}
//               className="btn-detalhe"
//             >
//               Detalhe
//             </button>
//           </div>
//         </div>
//       ))}

//       {/* Se houver uma estação selecionada, exibe o componente de detalhes */}
//       {estacaoSelecionada && <DetalheEstacao estacao={estacaoSelecionada} onClose={fecharDetalhes} />}
//     </div>
//   );
// }



import { useState, useEffect } from 'react';
import DetalheEstacao from './DetalheEstacao'; // Importando o componente de detalhes
import Header from '../header/Header';

export default function Estacoes() {
  interface Estacao {
    ID_Estacao: number;
    Nome: string;
    Latitude: number;
    Longitude: number;
    Data_Instalacao: string;
    Tipo_Estacao: string;
    Indicativo_Ativa: boolean;
  }

  const [estacoes, setEstacoes] = useState<Estacao[]>([]);
  const [estacaoSelecionada, setEstacaoSelecionada] = useState<Estacao | null>(null);

  useEffect(() => {
    // Função para buscar as estações da API
    const fetchEstacoes = async () => {
      try {
        const response = await fetch('http://localhost:8800/estacao'); // URL para buscar as estações
        if (response.ok) {
          const data = await response.json();
          setEstacoes(data);
        } else {
          alert('Erro ao carregar as estações');
        }
      } catch (error) {
        console.error('Erro ao buscar as estações:', error);
        alert('Erro ao conectar com o servidor');
      }
    };

    fetchEstacoes();
  }, []); // O array vazio indica que a requisição será feita apenas uma vez, na montagem do componente

  const mostrarDetalhes = (estacao: Estacao) => {
    setEstacaoSelecionada(estacao);
  };

  // Função para fechar os detalhes
  const fecharDetalhes = () => {
    setEstacaoSelecionada(null);
  };

  // Função para deletar uma estação
  const deletarEstacao = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8800/estacao/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setEstacoes(estacoes.filter((estacao) => estacao.ID_Estacao !== id));
        alert('Estação deletada com sucesso');
      } else {
        alert('Erro ao deletar a estação');
      }
    } catch (error) {
      console.error('Erro ao deletar a estação:', error);
      alert('Erro ao conectar com o servidor');
    }
  };

  return (
    <>
    <Header />
    <div className="flex sm:flex-row gap-4 bg-gray-800 items-center flex-col">
      {estacoes.map((estacao) => (
        <div key={estacao.ID_Estacao} className="relative bg-gray-900 block p-6 border border-gray-100 rounded-lg w-[300px] mt-4">
          <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-green-500 to-green-600"></span>

          <div className="my-4">
            <h2 className="text-white text-2xl font-bold pb-2">{estacao.Nome}</h2>
            <p className="text-gray-300 py-1">Latitude: {estacao.Latitude}</p>
            <p className="text-gray-300 py-1">Longitude: {estacao.Longitude}</p>
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
      {estacaoSelecionada && (
        <DetalheEstacao 
          estacao={estacaoSelecionada} 
          onClose={fecharDetalhes} 
          onDeleteEstacao={deletarEstacao}  // Passando a função de deletar como prop
        />
      )}
    </div>
    </>
  );
}
