// interface Estacao {
//   nome: string;
//   latitude: number;
//   longitude: number;
//   endereco: string;
//   parametros: string[];
// }

// export default function DetalheEstacao({ estacao }: { estacao: Estacao }) {
//   return (
//     <div className="overflow-y-auto overflow-x-hidden 
//     fixed top-0 right-0 left-0 z-50  items-center justify-center 
//     flex-col max-w-md mx-5 md:mx-auto mt-10 bg-white rounded-lg overflow-hidden shadow-2xl">
      
//       <div className="relative text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
      
//           <button  className=" absolute top-0 right-1 btn-close p-1 ">
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6">
//                 <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
//               </svg>
//             </button>
  
//         Detalhes da Estação
        
//       </div>

//       <div className="py-4 px-6">
//         <div className="mb-4">
//           <h2 className="text-gray-700 font-bold mb-2">Nome:</h2>
//           <p>{estacao.nome}</p>
//         </div>

//         <div className="mb-4">
//           <h2 className="text-gray-700 font-bold mb-2">Latitude:</h2>
//           <p>{estacao.latitude}</p>
//         </div>

//         <div className="mb-4">
//           <h2 className="text-gray-700 font-bold mb-2">Longitude:</h2>
//           <p>{estacao.longitude}</p>
//         </div>

//         <div className="mb-4">
//           <h2 className="text-gray-700 font-bold mb-2">Endereço:</h2>
//           <p>{estacao.endereco}</p>
//         </div>

//         <div className="mb-4">
//           <h2 className="text-gray-700 font-bold mb-2">Parâmetros:</h2>
//           <ul>
//             {estacao.parametros.map((parametro, index) => (
//               <li key={index}>{parametro}</li>
//             ))}
//           </ul>
//         </div>
//         <div className="mb-4 flex justify-center gap-4">
//           <button className="btn-editar">
//             Editar
//           </button>
//           <button className="btn-delete">
//             Deletar
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


interface Estacao {
  nome: string;
  latitude: number;
  longitude: number;
  endereco: string;
  parametros: string[];
}

interface DetalheEstacaoProps {
  estacao: Estacao;
  onClose: () => void; // Função de fechamento
}

export default function DetalheEstacao({ estacao, onClose }: DetalheEstacaoProps) {
  return (
    <div className="overflow-y-auto overflow-x-hidden 
    fixed top-0 right-0 left-0 z-50  items-center justify-center 
    flex-col max-w-md mx-5 md:mx-auto mt-10 bg-white rounded-lg overflow-hidden shadow-2xl">
      
      <div className="relative text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
      
          <button onClick={onClose} className=" absolute top-0 right-1 btn-close p-1 ">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
  
        Detalhes da Estação
        
      </div>

      <div className="py-4 px-6">
        <div className="mb-4">
          <h2 className="text-gray-700 font-bold mb-2">Nome:</h2>
          <p>{estacao.nome}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-gray-700 font-bold mb-2">Latitude:</h2>
          <p>{estacao.latitude}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-gray-700 font-bold mb-2">Longitude:</h2>
          <p>{estacao.longitude}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-gray-700 font-bold mb-2">Endereço:</h2>
          <p>{estacao.endereco}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-gray-700 font-bold mb-2">Parâmetros:</h2>
          <ul>
            {estacao.parametros.map((parametro, index) => (
              <li key={index}>{parametro}</li>
            ))}
          </ul>
        </div>
        <div className="mb-4 flex justify-center gap-4">
          <button className="btn-editar">
            Editar
          </button>
          <button className="btn-delete">
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
}
