import { useState, useEffect } from "react";
import  Coleta  from "../../model/Coleta";
import DetalheColeta from "./DetalheColeta";


export default function Coletas() {
  
  const [coletas, setColetas] = useState<Coleta[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [coletaSelecionada, setColetaSelecionada] = useState<Coleta | null>(null);
  useEffect(() => {
    async function getColetas() {
      try {
        const response = await fetch("http://localhost:3000/api/coletar-parametros");
        const data = await response.json();
        console.log("Dados recebidos:", data);
        setColetas(data);
        
      } catch (error) {
        console.error("Erro ao carregar as coletas:", error);
      } finally {
        setIsLoading(false);
      }
    }
    getColetas();
  }, []);


//   const handleExcluir = async (id: number) => {
//     if (confirm("Tem certeza que deseja excluir esta coleta?")) {
//       try {
//         await fetch(`http://localhost:3000/api/coletar-parametros/${id}`, { method: "DELETE" });
//         setColetas(coletas.filter((coleta) => coleta.id !== id));
//       } catch (error) {
//         console.error("Erro ao excluir coleta:", error);
//       }
//     }
//   };

  return (
    
      
      <div className="ajuste-margem">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-black-100 text-center mt-10">
          Coletas de Parâmetros
        </h1>
       
        {isLoading ? (
          <p className="text-center mt-4">Carregando...</p>) : 
          (
            <div className="overflow-x-auto mt-4">

                <div className="flex gap-2 bg-gray-900 text-white font-bold">
                    <div className="w-[28%] ml-1">Data</div>
                    <div className="w-2/4">Estação</div>
                </div>


                {coletas.map((coleta) => (
                    <div key={coleta.id} className="">
                        <div className="box-coleta flex gap-2 w-full ">
                            <div className="w-[28%] ml-1 ">{new Date(coleta.data_coleta).toLocaleString()}</div>
                            <div className=" ">{coleta.estacao.nome}</div>
                            <div className=" ml-auto flex gap-2">
                                
                                <button onClick={() => setColetaSelecionada(coleta)}
                                    className="">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                        stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </button>
                                
                                
                                {/* <button onClick={() => handleExcluir(coleta.id)}
                                    className="bg-red-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                        stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button> */}

                            </div>
                        </div>
                        <h3 className="flex items-center w-full">
    <span className="flex-grow bg-gray-200 rounded h-1"></span>
    
    <span className="flex-grow bg-gray-200 rounded h-1"></span>
</h3>
                    </div>
                    
                   
                   
                ))}
        
            </div>
        )}
        {coletaSelecionada && (
          <DetalheColeta coleta={coletaSelecionada} onClose={() => setColetaSelecionada(null)} />
        )}

      </div>
      
    
  );
}





// return (
//     <>
//       <Aside />
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <h1 className="text-3xl font-bold text-gray-900 dark:text-black-100 text-center">
//           Coletas de Parâmetros
//         </h1>
//         <button 
//           onClick={() => navigate("/nova-coleta")}
//           className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4">
//           Nova Coleta
//         </button>
//         {isLoading ? (
//           <p className="text-center mt-4">Carregando...</p>
//         ) : (
//           <div className="overflow-x-auto mt-4">
//             <table className="w-full border-collapse border border-gray-300 dark:border-gray-700 text-sm sm:text-base">
//               <thead>
//                 <tr className="bg-gray-50 dark:bg-gray-800 text-left text-white">
//                   <th className="py-2 px-4 border">Data da Coleta</th>
//                   <th className="py-2 px-4 border">Estação</th>
//                   <th className="py-2 px-4 border">Temperatura (°C)</th>
//                   <th className="py-2 px-4 border">Umidade (%)</th>
//                   <th className="py-2 px-4 border">Chuva (mm)</th>
//                   <th className="py-2 px-4 border">Velocidade do Vento (m/s)</th>
//                   <th className="py-2 px-4 border">Direção do Vento (°)</th>
//                   <th className="py-2 px-4 border">CPF</th>
//                   <th className="py-2 px-4 border">Ações</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {coletas.map((coleta) => (
//                   <tr key={coleta.id} className="border-b dark:border-gray-700">
//                     <td className="py-2 px-4 border">{new Date(coleta.data_coleta).toLocaleString()}</td>
//                     <td className="py-2 px-4 border">{coleta.estacao.nome}</td>
                    
//                     <td className="py-2 px-4 border">{coleta.parametro.temperatura.toFixed(2)}</td>
//                     <td className="py-2 px-4 border">{coleta.parametro.umidade}</td>
//                     <td className="py-2 px-4 border">{coleta.parametro.chuva}</td>
//                     <td className="py-2 px-4 border">{coleta.parametro.velocidade_vento}</td>
//                     <td className="py-2 px-4 border">{coleta.parametro.direcao_vento}</td>
//                     <td className="py-2 px-4 border flex space-x-2">
//                       <button 
//                         onClick={() => handleEditar(coleta.id)}
//                         className="bg-yellow-500 text-white px-3 py-1 rounded-md">
//                         Editar
//                       </button>
//                       <button 
//                         onClick={() => handleExcluir(coleta.id)}
//                         className="bg-red-600 text-white px-3 py-1 rounded-md">
//                         Excluir
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
// }
