// import React, { useState, useEffect } from "react";
// import Aside from "../shared/aside/Aside";
// import { fetchWithAuth } from "../../services/api";
// import Estacao from "../../model/Estacao";
// // import Parametro from "../../model/Parametro";
// import TipoParametro from "../../model/TipoParametros";

// export default function CadastroMedidas() {
//   const [valor, setValor] = useState("");
//   const [unixTime, setUnixTime] = useState("");
//   const [idEstacao, setIdEstacao] = useState<string>("");
//   const [idParametro, setIdParametro] = useState<string>("");
//   const [estacoes, setEstacoes] = useState<Estacao[]>([]);
//   // const [parametros, setParametros] = useState<Parametro[]>([]);
//   const [tipoParametros, setTipoParametros] = useState<TipoParametro[]>([]);
//   // const [parametroId, setParametroId] = useState<number | null>(null);


//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       // Buscar a estação completa (não precisa do .json())
//       const estacaoData = await fetchWithAuth(`http://localhost:3000/api/estacoes/${idEstacao}`);

//       const medida = {
//         valor: parseFloat(valor),
//         unix_time: unixTime,
//         estacao: estacaoData, // Usar a estação completa
//         parametro: {
//           id_parametro: parseInt(idParametro)
//         }
//       };

//       console.log("Dados enviados:", medida);

//      const response = await fetchWithAuth("http://localhost:3000/api/medidas", {
//         method: "POST",
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(medida),
//       });

//       // Fix the response handling logic
//       if (response.status >= 200 && response.status < 300) {
//         alert("Medida cadastrada com sucesso!");
//         setValor("");
//         setUnixTime("");
//         setIdEstacao("");
//         setIdParametro("");
//       } else {
//         alert("Erro ao cadastrar a medida");
//         console.error("Erro na resposta:", response);
//       }
//     } catch (error) {
//       alert("Erro ao conectar com o servidor");
//       console.error("Erro detalhado:", error);
//     }
//   };
//    // Função para buscar estações
//    useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [dataEstacoes, dataTipoParametros] = await Promise.all([
//           fetchWithAuth("http://localhost:3000/api/estacoes"),
//           fetchWithAuth("http://localhost:3000/api/tipoparametro")
//         ]);
        
//         setEstacoes(dataEstacoes);
//         setTipoParametros(dataTipoParametros);
//       } catch (error) {
//         console.error("Erro ao buscar dados:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <>
//       <Aside />
//       <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg overflow-hidden">
//         <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
//           Cadastro de Medidas
//         </div>
//         <form className="py-4 px-6" onSubmit={handleSubmit}>
//           {/* Campo Valor */}
//           <div className="mb-4">
//             <label className="block text-gray-700 font-bold mb-2" htmlFor="valor">
//               Valor
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="valor"
//               type="number"
//               placeholder="Digite o valor da medida"
//               value={valor}
//               onChange={(e) => setValor(e.target.value)}
//             />
//           </div>

//           {/* Campo Unix Time */}
//           <div className="mb-4">
//             <label className="block text-gray-700 font-bold mb-2" htmlFor="unixTime">
//               Unix Time
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="unixTime"
//               type="text"
//               placeholder="Digite o timestamp Unix"
//               value={unixTime}
//               onChange={(e) => setUnixTime(e.target.value)}
//             />
//           </div>
//         {/* Campo id estação */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-bold mb-2" htmlFor="estacao">
//             Estação
//           </label>
//           <select
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             id="idEstacao"
//             value={idEstacao}
//             onChange={(e) => {
//               console.log("Estação selecionada:", e.target.value);
//               setIdEstacao(e.target.value);
//             }}
//           >
//             <option value="">Selecione a Estação</option>
//             {estacoes.length > 0 ? (
//               estacoes.map((estacao) => (
//                 <option key={estacao.id_estacao} value={estacao.id_estacao}>
//                   {estacao.nome}
//                 </option>
//               ))
//             ) : (
//               <option value="">Nenhuma estação cadastrada</option>
//             )}
//           </select>
//         </div>
//           {/* id parametro */}
//           <div className="mb-4">
//     <label className="block text-gray-700 font-bold mb-2" htmlFor="parametro">
//       Tipo de Parâmetro
//     </label>
//     <select
//       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//       id="idParametro"
//       value={idParametro}
//       onChange={(e) => {
//         console.log("Tipo de Parâmetro selecionado:", e.target.value);
//         setIdParametro(e.target.value);
//       }}
//     >
//       <option value="">Selecione o Tipo de Parâmetro</option>
//       {tipoParametros.length > 0 ? (
//         tipoParametros.map((tipo) => (
//           <option key={tipo.id_tipo_param} value={tipo.id_tipo_param}>
//             {tipo.nome}
//           </option>
//         ))
//       ) : (
//         <option value="">Nenhum tipo de parâmetro cadastrado</option>
//       )}
//     </select>
//   </div>

//           {/* Botão de Cadastro */}
//           <div className="flex items-center justify-center mt-6">
//             <button className="btn-cadastrar" type="submit">
//               Cadastrar Medida
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }
