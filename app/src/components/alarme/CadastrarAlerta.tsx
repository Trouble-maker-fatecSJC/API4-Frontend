// import React, { useState, useEffect } from "react";
// import Aside from "../shared/aside/Aside";
// import TipoAlerta from "../../model/TipoAlerta";
// import { fetchWithAuth } from "../../services/api";

// export default function CadastrarAlerta() {
//   const [dataAlerta, setDataAlerta] = useState<string>("");
//   const [tipoAlerta, setTipoAlerta] = useState<number | string>("");
//   const [tiposAlerta, setTiposAlerta] = useState<TipoAlerta[]>([]);

//   useEffect(() => {
//     const fetchTiposAlerta = async () => {
//       try {
//         const data = await fetchWithAuth("http://localhost:3000/api/tipoalerta");
//         setTiposAlerta(data);
//       } catch (error) {
//         console.error("Erro ao buscar tipos de alerta:", error);
//       }
//     };

//     fetchTiposAlerta();

//     // Preencher o campo de data com a data e hora atuais
//     const getCurrentDateTime = () => {
//       const now = new Date();
//       now.setHours(now.getHours() - 3); // Ajusta para o horário de Brasília (UTC-3)
//       return now.toISOString().slice(0, 16); // Formato compatível com datetime-local
//     };

//     setDataAlerta(getCurrentDateTime());
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const novoAlerta = {
//       data_alerta: new Date(dataAlerta).toISOString(),
//       tipoAlerta: { id_tipo_alerta: Number(tipoAlerta) },
//     };

//     console.log("Enviando dados:", novoAlerta);

//     try {
//       const response = await fetchWithAuth("http://localhost:3000/api/alerta", {
//         method: "POST",
//         body: JSON.stringify(novoAlerta),
//       });

//       if (response.ok) {
//         alert("Erro ao cadastrar alerta");
//       } else {
//         alert("Alerta cadastrado com sucesso!");
//         setDataAlerta("");
//         setTipoAlerta("");
        
//       }
//     } catch (error) {
//       console.log("Erro ao conectar com o servidor");
//       console.error(error);
//     }
//   };

//   return (
//     <>
//       <Aside />
//       <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg overflow-hidden">
//         <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
//           Cadastro de Alerta
//         </div>
//         <form className="py-4 px-6" onSubmit={handleSubmit}>
//           {/* Campo Data do Alerta */}
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 font-bold mb-2"
//               htmlFor="dataAlerta"
//             >
//               Data do Alerta
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="dataAlerta"
//               type="datetime-local"
//               value={dataAlerta}
//               onChange={(e) => setDataAlerta(e.target.value)}
//             />
//           </div>

//           {/* Campo Tipo de Alerta */}
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 font-bold mb-2"
//               htmlFor="tipoAlerta"
//             >
//               Tipo de Alerta
//             </label>
//             <select
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="tipoAlerta"
//               value={tipoAlerta}
//               onChange={(e) => setTipoAlerta(e.target.value)}
//             >
//               <option value="">Selecione o tipo de alerta</option>
//               {tiposAlerta.length > 0 ? (
//                 tiposAlerta.map((tipo) => (
//                   <option key={tipo.id_tipo_alerta} value={tipo.id_tipo_alerta}>
//                     {tipo.nome}
//                   </option>
//                 ))
//               ) : (
//                 <option value="">Nenhum tipo de alerta cadastrado</option>
//               )}
//             </select>
//           </div>

//           <div className="flex items-center justify-center mt-6">
//             <button className="btn-cadastrar" type="submit">
//               Cadastrar Alerta
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }


