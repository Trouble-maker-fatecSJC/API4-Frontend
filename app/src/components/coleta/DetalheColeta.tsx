// import Coleta from "../../model/Coleta";

//   interface DetalheColetaProps {
//     coleta: Coleta;
//     onClose: () => void;
//   }
  
  
//   export default function DetalheColeta({ coleta, onClose }: DetalheColetaProps) {
//     console.log(coleta);
//   return (
    
//         <div
//             className="overflow-y-auto overflow-x-hidden  top-0 right-0 left-0 z-50 
//             items-center justify-center flex-col  max-w-md mx-5 md:mx-auto mt-16 bg-white rounded-lg overflow-hidden shadow-2xl "
//             >
//             <div className="relative text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase ">
//                 <button
//                     onClick={onClose}
//                     className="absolute top-0 right-1 btn-close p-1"
//                 >
//                     {/* Ícone de fechar */}
//                     <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                     className="h-6 w-6"
//                     >
//                     <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
//                     </svg>
//                 </button>
//                 Coleta {new Date(coleta.data_coleta).toLocaleString()}
//             </div>
            
//             <div className="py-4 px-6">
            
//             <div className="mb-4">
//                 <h2 className="text-gray-700 font-bold mb-2">Nome:</h2>
//                 <p>{coleta.estacao.nome}</p>
//             </div>
//             <div className="mb-4">
//                 <h2 className="text-gray-700 font-bold mb-2">Endereço:</h2>
//                 <p>{coleta.estacao.endereco}</p>
//             </div>
//             <div className="mb-4">
//                 <h2 className="text-gray-700 font-bold mb-2">Latitude:</h2>
//                 <p>{coleta.estacao.latitude}</p>
//             </div>
//             <div className="mb-4">
//                 <h2 className="text-gray-700 font-bold mb-2">Longitude:</h2>
//                 <p>{coleta.estacao.longitude}</p>
//             </div>
           
//             {coleta.parametro.velocidade_vento !== 0 && (
//                  <div className="mb-4">
//                     <h2 className="text-gray-700 font-bold mb-2">Velocidade do Vento:</h2>
//                     <p>{coleta.parametro.velocidade_vento}</p>
//                 </div>
//             )}
//             {coleta.parametro.direcao_vento !== 0 && (
//                  <div className="mb-4">
//                     <h2 className="text-gray-700 font-bold mb-2">Direção do Vento:</h2>
//                     <p>{coleta.parametro.direcao_vento}°</p>
//                 </div>
//             )}
//             {coleta.parametro.temperatura !== 0 && (
//                  <div className="mb-4">
//                     <h2 className="text-gray-700 font-bold mb-2">Temperatura:</h2>
//                     <p>{coleta.parametro.temperatura.toFixed(2)} °C</p>
//                 </div>
//             )}
//             {coleta.parametro.umidade !== 0 && (
//                  <div className="mb-4">
//                     <h2 className="text-gray-700 font-bold mb-2">Umidade:</h2>
//                     <p>{coleta.parametro.umidade} %</p>
//                 </div>
//             )}
//             {coleta.parametro.chuva !== 0 && (  
//                 <div className="mb-4">
//                     <h2 className="text-gray-700 font-bold mb-2">Chuva:</h2>
//                     <p>{coleta.parametro.chuva} mm</p>
//                 </div>
//             )}
//             {/* Exibir usuário */}
// <div className="mb-4">
//     <h2 className="text-gray-700 font-bold mb-2">Usuário:</h2>
//     <p>{coleta.parametro?.usuario?.nome}</p>
// </div>

// {/* Exibir tipo do parâmetro */}
// <div className="mb-4">
//     <h2 className="text-gray-700 font-bold mb-2">Tipo do Parâmetro:</h2>
//     <p>{coleta.parametro?.tipoParametro?.nome} ({coleta.parametro?.tipoParametro?.unidade})</p>
// </div>

// {/* Exibir medida */}
// <div className="mb-4">
//     <h2 className="text-gray-700 font-bold mb-2">Medida:</h2>
//     <p>{coleta.parametro?.medida?.valor} (Unix Time: {coleta.parametro?.medida?.unix_time})</p>
// </div>
            
            
                
//             </div>
//             </div>
            

//   );
// }

import Coleta from "../../model/Coleta";

interface DetalheColetaProps {
    coleta: Coleta;
    onClose: () => void;
}

export default function DetalheColeta({ coleta, onClose }: DetalheColetaProps) {
    console.log(coleta);

    return (
        <div
            className="overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 
            items-center justify-center flex-col max-w-md mx-5 md:mx-auto mt-16 bg-white rounded-lg overflow-hidden shadow-2xl"
        >
            <div className="relative text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
                <button
                    onClick={onClose}
                    className="absolute top-0 right-1 btn-close p-1"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-6 w-6"
                    >
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                </button>
                Coleta {new Date(coleta?.data_coleta).toLocaleString()}
            </div>

            <div className="py-4 px-6">
                <div className="mb-4">
                    <h2 className="text-gray-700 font-bold mb-2">Nome:</h2>
                    <p>{coleta?.estacao?.nome}</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-gray-700 font-bold mb-2">Endereço:</h2>
                    <p>{coleta?.estacao?.endereco}</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-gray-700 font-bold mb-2">Latitude:</h2>
                    <p>{coleta?.estacao?.latitude}</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-gray-700 font-bold mb-2">Longitude:</h2>
                    <p>{coleta?.estacao?.longitude}</p>
                </div>

                {coleta?.parametro?.velocidade_vento !== undefined && (
                    <div className="mb-4">
                        <h2 className="text-gray-700 font-bold mb-2">Velocidade do Vento:</h2>
                        <p>{coleta.parametro.velocidade_vento}</p>
                    </div>
                )}
                {coleta?.parametro?.direcao_vento !== 0 && (
                    <div className="mb-4">
                        <h2 className="text-gray-700 font-bold mb-2">Direção do Vento:</h2>
                        <p>{coleta.parametro.direcao_vento}°</p>
                    </div>
                )}
                {coleta?.parametro?.temperatura !== 0 && (
                    <div className="mb-4">
                        <h2 className="text-gray-700 font-bold mb-2">Temperatura:</h2>
                        <p>{coleta.parametro.temperatura.toFixed(2)} °C</p>
                    </div>
                )}
                {coleta?.parametro?.umidade !== 0 && (
                    <div className="mb-4">
                        <h2 className="text-gray-700 font-bold mb-2">Umidade:</h2>
                        <p>{coleta.parametro.umidade} %</p>
                    </div>
                )}
                {coleta?.parametro?.chuva !== 0 && (
                    <div className="mb-4">
                        <h2 className="text-gray-700 font-bold mb-2">Chuva:</h2>
                        <p>{coleta.parametro.chuva} mm</p>
                    </div>
                )}

                {/* Exibir novos dados */}
                <div className="mb-4">
                    <h2 className="text-gray-700 font-bold mb-2">Usuário:</h2>
                    <p>{coleta?.parametro?.usuario?.nome}</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-gray-700 font-bold mb-2">Tipo do Parâmetro:</h2>
                    <p>{coleta?.parametro?.tipoParametro?.nome} ({coleta?.parametro?.tipoParametro?.unidade})</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-gray-700 font-bold mb-2">Medida:</h2>
                    <p>{coleta?.parametro?.medida?.valor} (Unix Time: {coleta?.parametro?.medida?.unix_time})</p>
                </div>
            </div>
        </div>
    );
}
