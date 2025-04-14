
// import { useState, useEffect } from "react";
// import Medidas from "../../model/Medidas";
// import Aside from "../shared/aside/Aside";
// import { useNavigate } from "react-router-dom";
// import { fetchWithAuth } from "../../services/api";

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router";
// import Medidas from "../../model/Medidas";
// import { fetchWithAuth } from "../../services/api";
// import Aside from "../shared/aside/Aside";

// export default function Medida() {
//   const navigate = useNavigate();
//   const [medidas, setMedidas] = useState<Medidas[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     async function getMedidas() {
//       try {
//         const data = await fetchWithAuth("http://localhost:3000/api/medidas");
//         console.log("Dados recebidos:", data);
//         setMedidas(data);
//       } catch (error) {
//         console.error("Erro ao carregar as medidas:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     getMedidas();
//   }, []);

//   const handleEditar = (idEdicao: number) => {
//     navigate(`/editarmedida/${idEdicao}`);
//   };

//   const handleExcluir = async (id: number) => {
//     if (confirm("Tem certeza que deseja excluir esta medida?")) {
//       try {
//         await fetchWithAuth(`http://localhost:3000/api/medidas/${id}`, { method: "DELETE" });
//         setMedidas(medidas.filter((medida) => medida.id_medida !== id));
//         alert("Medida excluída com sucesso!");
//         window.location.reload();
//       } catch (error) {
//         console.error("Erro ao excluir medida:", error);
//       }
//     }
//   };

//   return (
//     <>
//       <Aside />
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <h1 className="text-3xl font-bold text-gray-900 dark:text-black-100 text-center">
//           Medidas
//         </h1>
//         {isLoading ? (
//           <p className="text-center">Carregando...</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full mt-4 border-collapse border border-gray-300 dark:border-gray-700 text-sm sm:text-base">
//               <thead>
//                 <tr className="bg-gray-50 dark:bg-gray-800 text-left text-white">
//                   <th className="py-2 px-4 border">Valor</th>
//                   <th className="py-2 px-4 border">UnixTime</th>
//                   <th className="py-2 px-4 border">Ações</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {medidas.map((medida) => (
//                   <tr key={medida.id_medida} className="border-b dark:border-gray-700">
//                     <td className="py-2 px-4 border">{medida.valor}</td>
//                     <td className="py-2 px-4 border">{medida.unix_time}</td>
//                     <td className="py-2 px-4 border flex space-x-2">
//                       <button onClick={() => handleEditar(medida.id_medida)} className="btn-editar">
                        
//                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="20" stroke-dashoffset="20" d="M3 21h18"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="20;0"/></path><path stroke-dasharray="48" stroke-dashoffset="48" d="M7 17v-4l10 -10l4 4l-10 10h-4"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.6s" values="48;0"/></path><path stroke-dasharray="8" stroke-dashoffset="8" d="M14 6l4 4"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.2s" values="8;0"/></path></g></svg>
//                       </button>
//                       <button onClick={() => handleExcluir(medida.id_medida)} className="btn-delete">
                        
//                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="24" stroke-dashoffset="24" d="M12 20h5c0.5 0 1 -0.5 1 -1v-14M12 20h-5c-0.5 0 -1 -0.5 -1 -1v-14"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="24;0"/></path><path stroke-dasharray="20" stroke-dashoffset="20" d="M4 5h16"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.2s" values="20;0"/></path><path stroke-dasharray="8" stroke-dashoffset="8" d="M10 4h4M10 9v7M14 9v7"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="8;0"/></path></g></svg>
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </>
//   );
// // }

// export default function Medida() {
//   const navigate = useNavigate();
//   const [medidas, setMedidas] = useState<Medidas[]>([]);
//   const [parametrosInfo, setParametrosInfo] = useState<Map<number, any>>(new Map());
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         // Buscar medidas
//         const medidasData = await fetchWithAuth("http://localhost:3000/api/medidas");
//         console.log("Medidas recebidas:", medidasData);
        
//         // Buscar informações de cada parâmetro
//         const paramInfoMap = new Map<number, any>();
//         for (const medida of medidasData) {
//           if (medida.parametro?.id_parametro) {
//             const paramInfo = await fetchWithAuth(`http://localhost:3000/api/parametro/${medida.parametro.id_parametro}`);
//             paramInfoMap.set(medida.parametro.id_parametro, paramInfo);
//           }
//         }

//         setParametrosInfo(paramInfoMap);
//         setMedidas(medidasData);
//       } catch (error) {
//         console.error("Erro ao carregar dados:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     fetchData();
//   }, []);

//   const handleEditar = (idEdicao: number) => {
//     navigate(`/editarmedida/${idEdicao}`);
//   };

//   const handleExcluir = async (id: number) => {
//     if (confirm("Tem certeza que deseja excluir esta medida?")) {
//       try {
//         await fetchWithAuth(`http://localhost:3000/api/medidas/${id}`, { method: "DELETE" });
//         setMedidas(medidas.filter((medida) => medida.id_medida !== id));
//         alert("Medida excluída com sucesso!");
//       } catch (error) {
//         console.error("Erro ao excluir medida:", error);
//         alert("Erro ao excluir medida");
//       }
//     }
//   };

//   const formatDateTime = (dateString: string) => {
//     try {
//       // Remove any timezone offset and get only the date part
//       const datePart = dateString.split('T')[0];
//       const timePart = dateString.split('T')[1].split('.')[0];
      
//       // Create date from parts
//       const [year, month, day] = datePart.split('-');
//       const [hour, minute] = timePart.split(':');
      
//       return `${day}/${month}/${year} ${hour}:${minute}`;
//     } catch {
//       return 'Data inválida';
//     }
//   };

//   return (
//     <>
//     <Aside />
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
//         Medidas
//       </h1>
      
//       {isLoading ? (
//         <p className="text-center">Carregando...</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {medidas.map((medida) => {
//             const paramInfo = parametrosInfo.get(medida.id_parametro);
            
//             return (
//               <div key={medida.id_medida} className="bg-white shadow-lg rounded-lg overflow-hidden">
//                 <div className="bg-gray-900 text-white px-4 py-3">
//                   <h2 className="text-lg font-semibold">
//                     {paramInfo?.tipoParametro.nome || 'Parâmetro não encontrado'}
//                   </h2>
//                 </div>
                
//                 <div className="p-4">
                  
//                   <div className="mb-4">
//                     <p className="text-sm text-gray-600">Estação</p>
//                     <p className="text-gray-900 font-medium">
//                       {medida.estacao?.nome || 'Estação não encontrada'}
//                     </p>
//                   </div>
                  
//                   <div className="mb-4">
//                     <p className="text-sm text-gray-600">Valor</p>
//                     <p className="text-gray-900 font-medium">
//                       {medida.valor} {paramInfo?.tipoParametro?.unidade || ''}
//                     </p>
//                   </div>
                  
//                   <div className="mb-4">
//                     <p className="text-sm text-gray-600">Data/Hora</p>
//                     <p className="text-gray-900 font-medium">
//                       {formatDateTime(medida.unix_time)}
//                     </p>
//                   </div>


//                   <div className="flex justify-end space-x-2 mt-4">
//                     <button onClick={() => handleEditar(medida.id_medida)} className="btn-editar">
//                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
//                         <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
//                           <path strokeDasharray="20" strokeDashoffset="20" d="M3 21h18">
//                             <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="20;0"/>
//                           </path>
//                           <path strokeDasharray="48" strokeDashoffset="48" d="M7 17v-4l10 -10l4 4l-10 10h-4">
//                             <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.6s" values="48;0"/>
//                           </path>
//                         </g>
//                       </svg>
//                     </button>
//                     <button onClick={() => handleExcluir(medida.id_medida)} className="btn-delete">
//                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
//                         <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
//                           <path strokeDasharray="24" strokeDashoffset="24" d="M12 20h5c0.5 0 1 -0.5 1 -1v-14M12 20h-5c-0.5 0 -1 -0.5 -1 -1v-14">
//                             <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="24;0"/>
//                           </path>
//                           <path strokeDasharray="20" strokeDashoffset="20" d="M4 5h16">
//                             <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.2s" values="20;0"/>
//                           </path>
//                         </g>
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//           </div>
//         )}
//       </div>
//     </>
//   );
//   }


import { useNavigate } from 'react-router-dom';
import { useExibirMedidas } from '../../hooks/useExibirMedidas';
import { fetchWithAuth } from '../../services/api';
import Aside from "../shared/aside/Aside";
import Medidas from '../../model/Medidas';

export default function Medida() {
  const navigate = useNavigate();
  const { medidas, isLoading, getParametroInfo, formatDateTime, recarregarMedidas } = useExibirMedidas();

  const handleEditar = (idEdicao: number) => {
    navigate(`/editarmedida/${idEdicao}`);
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
                      <button onClick={() => handleEditar(medida.id_medida)} className="btn-editar">
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