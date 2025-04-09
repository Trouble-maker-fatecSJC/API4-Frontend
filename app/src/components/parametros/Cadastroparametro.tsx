// import React, { useState, useEffect } from "react";
// import Aside from "../shared/aside/Aside";
// import Estacao from "../../model/Estacao";
// import Parametro from "../../model/Parametro";
// import TipoParametro from "../../model/TipoParametros";
// import { fetchWithAuth } from "../../services/api";

// export default function CadastroParametro() {
//   const [id_parametro, setIdParametro] = useState<number>(0);
//   const [tipoParametros, setTipoParametros] = useState<TipoParametro[]>([]);
//   const [estacoes, setEstacoes] = useState<Estacao[]>([]);
//   const [tipoParametro, setTipoParametro] = useState<number | string>("");
//   const [idEstacao, setIdEstacao] = useState<string>("");


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const dataTipoParametros = await fetchWithAuth("http://localhost:3000/api/tipoparametro");
//         const dataEstacoes = await fetchWithAuth("http://localhost:3000/api/estacoes");
      
//         setTipoParametros(dataTipoParametros);
//         setEstacoes(dataEstacoes);
        
//       } catch (error) {
//         console.error("Erro ao buscar dados:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const idEstacaoNumber = Number(idEstacao);

//     const novoParametro: Parametro = {
//       id_parametro: id_parametro,
//       tipo_parametro: Number(tipoParametro),
//       id_da_estacao: idEstacaoNumber,
//     };

//     console.log("Enviando dados:", novoParametro);

//     try {
//       const response = await fetchWithAuth("http://localhost:3000/api/parametro", {
//         method: "POST",
//         body: JSON.stringify(novoParametro),
//       });

//       if (response.ok) {
//         alert("Erro ao cadastrar parâmetro");
//       } else {
//         alert("Parâmetro cadastrado com sucesso!");
//         setIdParametro(0);
//         setTipoParametro("");
//         setIdEstacao("");
        
//       }
//     } catch (error) {
//       alert("Erro ao conectar com o servidor");
//       console.error(error);
//     }
//   };

//   return (
//     <>
//       <Aside />
//       <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg overflow-hidden">
//         <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
//           Cadastro de Parâmetro
//         </div>
//         <form className="py-4 px-6" onSubmit={handleSubmit}>
//           {/* Id do parametro */}
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 font-bold mb-2"
//               htmlFor="idParametro"
//             >
//               Id do parametro
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="idParametro"
//               type="number"
//               step="0.01"
//               placeholder="Digite o id do parametro"
//               value={id_parametro}
//               onChange={(e) => setIdParametro(Number(e.target.value))}
//             />
//           </div>

//           {/* Campo Tipo de Parâmetro */}
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 font-bold mb-2"
//               htmlFor="idTipoParametro"
//             >
//               Tipo de Parâmetro
//             </label>
//             <select
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="idTipoParametro"
//               value={tipoParametro}
//               onChange={(e) => setTipoParametro(e.target.value)}
//             >
//               <option value="">Selecione o Tipo de Parâmetro</option>
//               {tipoParametros.length > 0 ? (
//                 tipoParametros.map((tipo) => (
//                   <option key={tipo.id_tipo_param} value={tipo.id_tipo_param}>
//                     {tipo.nome}
//                   </option>
//                 ))
//               ) : (
//                 <option value="">Nenhum tipo de parâmetro cadastrado</option>
//               )}
//             </select>
//           </div>

//           <div className="flex items-center justify-center mt-6">
//             <button className="btn-cadastrar" type="submit">
//               Cadastrar Parâmetro
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }
