// import { useNavigate } from 'react-router-dom';
// import { useExibirMedidas } from '../../hooks/useExibirMedidas';
// import { fetchWithAuth } from '../../services/api';
// import Aside from "../shared/aside/Aside";
// import Medidas from '../../model/Medidas';
// import { useMedidasContext } from '../../context/MedidasContext';

// export default function Medida() {
//   const navigate = useNavigate();
//   const { setMedidaAtual } = useMedidasContext();
//   const { medidas, isLoading, getParametroInfo, formatDateTime, recarregarMedidas } = useExibirMedidas();

//   const handleEditar = (idEdicao: number) => {
//     navigate(`/editarmedida/${idEdicao}`);
//   };

//   const handleExcluir = async (id: number) => {
//     if (confirm("Tem certeza que deseja excluir esta medida?")) {
//       try {
//         console.log('Tentando excluir medida com ID:', id); // Debug do ID
        
//         const response = await fetchWithAuth(`http://localhost:3000/api/medidas/${id}`, { // Alterado de medidas para medida
//           method: "DELETE",
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         });

//         console.log('Resposta do servidor:', response); // Debug da resposta

//         if (!response.ok && response.status !== 204) {
//           throw new Error(`Erro na requisição: ${response.status}`);
//         }
        
//         await recarregarMedidas();
//         alert("Medida excluída com sucesso!");
        
//       } catch (error) {
//         console.error("Erro completo:", error); // Debug completo do erro
//         if (error instanceof Error) {
//           alert(`Erro ao excluir medida: ${error.message}`);
//         } else {
//           alert("Erro ao excluir medida. Por favor, tente novamente.");
//         }
//       }
//     }
//   };

//   return (
//     <>
//       <Aside />
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
//           Medidas
//         </h1>
        
//         {isLoading ? (
//           <p className="text-center">Carregando...</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {medidas && medidas.map((medida: Medidas) => {
//               const paramInfo = getParametroInfo(medida.parametro?.id_parametro);
//               console.log('Medida:', medida);
//               console.log('ParamInfo:', paramInfo);
              
//               return (
//                 <div key={medida.id_medida} className="bg-white shadow-lg rounded-lg overflow-hidden">
//                   <div className="bg-gray-900 text-white px-4 py-3">
//                     <h2 className="text-lg font-semibold">
//                       {paramInfo?.nome || 'Parâmetro não encontrado'}
//                     </h2>
//                   </div>
                  
//                   <div className="p-4">
//                     <div className="mb-4">
//                       <p className="text-sm text-gray-600">Estação</p>
//                       <p className="text-gray-900 font-medium">
//                         {medida.estacao?.nome || 'Estação não encontrada'}
//                       </p>
//                     </div>
                    
//                     <div className="mb-4">
//                       <p className="text-sm text-gray-600">Valor</p>
//                       <p className="text-gray-900 font-medium">
//                         {medida.valor} {paramInfo?.unidade || ''}
//                       </p>
//                     </div>
                    
//                     <div className="mb-4">
//                       <p className="text-sm text-gray-600">Data/Hora</p>
//                       <p className="text-gray-900 font-medium">
//                         {formatDateTime(medida.unix_time)}
//                       </p>
//                     </div>

//                     <div className="flex justify-end space-x-2 mt-4">
//                       <button onClick={() => handleEditar(medida.id_medida)} className="btn-editar">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
//                           <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
//                             <path strokeDasharray="20" strokeDashoffset="20" d="M3 21h18">
//                               <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="20;0"/>
//                             </path>
//                             <path strokeDasharray="48" strokeDashoffset="48" d="M7 17v-4l10 -10l4 4l-10 10h-4">
//                               <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.6s" values="48;0"/>
//                             </path>
//                           </g>
//                         </svg>
//                       </button>
//                       <button onClick={() => {
//       console.log('Medida ID antes de excluir:', medida.id_medida); // Debug do ID no botão
//       handleExcluir(medida.id_medida);
//     }}  className="btn-delete">
//                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="24" stroke-dashoffset="24" d="M12 20h5c0.5 0 1 -0.5 1 -1v-14M12 20h-5c-0.5 0 -1 -0.5 -1 -1v-14"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="24;0"/></path><path stroke-dasharray="20" stroke-dashoffset="20" d="M4 5h16"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.2s" values="20;0"/></path><path stroke-dasharray="8" stroke-dashoffset="8" d="M10 4h4M10 9v7M14 9v7"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="8;0"/></path></g></svg>
                      
                      
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }



import { useNavigate } from 'react-router-dom';
import { useExibirMedidas } from '../../hooks/useExibirMedidas';
import { fetchWithAuth } from '../../services/api';
import Aside from "../shared/aside/Aside";
import Medidas from '../../model/Medidas';
import { useMedidasContext } from '../../context/MedidasContext';

export default function Medida() {
  const navigate = useNavigate();
  const { setMedidaAtual } = useMedidasContext();
  const { medidas, isLoading, getParametroInfo, formatDateTime, recarregarMedidas } = useExibirMedidas();

  const handleEditar = (medida: Medidas) => {
    setMedidaAtual(medida);
    navigate(`/editarmedida/${medida.id_medida}`);
  };

  const handleExcluir = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta medida?")) {
      try {
        console.log('Tentando excluir medida com ID:', id); // Debug do ID
        
        const response = await fetchWithAuth(`http://localhost:3000/api/medidas/${id}`, { // Alterado de medidas para medida
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json'
          }
        });

        console.log('Resposta do servidor:', response); // Debug da resposta

        if (!response.ok && response.status !== 204) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }
        
        await recarregarMedidas();
        alert("Medida excluída com sucesso!");
        
      } catch (error) {
        console.error("Erro completo:", error); // Debug completo do erro
        if (error instanceof Error) {
          alert(`Erro ao excluir medida: ${error.message}`);
        } else {
          alert("Erro ao excluir medida. Por favor, tente novamente.");
        }
      }
    }
  };

  return (
    <>
      <Aside />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Medidas
        </h1>
        
        {isLoading ? (
          <p className="text-center">Carregando...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {medidas && medidas.map((medida: Medidas) => {
              const paramInfo = getParametroInfo(medida.parametro?.id_parametro);
              console.log('Medida:', medida);
              console.log('ParamInfo:', paramInfo);
              
              return (
                <div key={medida.id_medida} className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <div className="bg-gray-900 text-white px-4 py-3">
                    <h2 className="text-lg font-semibold">
                      {paramInfo?.nome || 'Parâmetro não encontrado'}
                    </h2>
                  </div>
                  
                  <div className="p-4">
                    <div className="mb-4">
                      <p className="text-sm text-gray-600">Estação</p>
                      <p className="text-gray-900 font-medium">
                        {medida.estacao?.nome || 'Estação não encontrada'}
                      </p>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-600">Valor</p>
                      <p className="text-gray-900 font-medium">
                        {medida.valor} {paramInfo?.unidade || ''}
                      </p>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-600">Data/Hora</p>
                      <p className="text-gray-900 font-medium">
                        {formatDateTime(medida.unix_time)}
                      </p>
                    </div>

                    <div className="flex justify-end space-x-2 mt-4">
                      <button onClick={() => handleEditar(medida)} className="btn-editar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                            <path strokeDasharray="20" strokeDashoffset="20" d="M3 21h18">
                              <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="20;0"/>
                            </path>
                            <path strokeDasharray="48" strokeDashoffset="48" d="M7 17v-4l10 -10l4 4l-10 10h-4">
                              <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.6s" values="48;0"/>
                            </path>
                          </g>
                        </svg>
                      </button>
                      <button onClick={() => {
      console.log('Medida ID antes de excluir:', medida.id_medida); // Debug do ID no botão
      handleExcluir(medida.id_medida);
    }}  className="btn-delete">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="24" stroke-dashoffset="24" d="M12 20h5c0.5 0 1 -0.5 1 -1v-14M12 20h-5c-0.5 0 -1 -0.5 -1 -1v-14"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="24;0"/></path><path stroke-dasharray="20" stroke-dashoffset="20" d="M4 5h16"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.2s" values="20;0"/></path><path stroke-dasharray="8" stroke-dashoffset="8" d="M10 4h4M10 9v7M14 9v7"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="8;0"/></path></g></svg>
                      
                      
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}