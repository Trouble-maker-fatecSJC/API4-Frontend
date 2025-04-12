// import React, { useState, useEffect } from "react";
// import Aside from "../shared/aside/Aside";
// import Estacao from "../../model/Estacao";
// import Parametro from "../../model/Parametro";
// import TipoParametro from "../../model/TipoParametros";
// import { useParams, useNavigate } from "react-router-dom";
// import { fetchWithAuth } from "../../services/api";

// export default function EditarParametro() {
//   const [id_parametro, setIdParametro] = useState<number>(0);
//   const [tipoParametros, setTipoParametros] = useState<TipoParametro[]>([]);
//   const [estacoes, setEstacoes] = useState<Estacao[]>([]);

//   const [tipoParametro, setTipoParametro] = useState<number | string>(""); // Tipo como número ou string vazia
//   const [idEstacao, setIdEstacao] = useState<string>(""); // Tipo como número ou string vazia
//   const [idMedida, setIdMedida] = useState<number | string>(""); // Tipo como número ou string vazia

//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

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

//   useEffect(() => {
//     const fetchParametro = async () => {
//       if (!id) return; // Verifica se o id_parametro está disponível
  
//       try {
//         const data = await fetchWithAuth(`http://localhost:3000/api/parametro/${id}`);
  
//         // Atualiza os estados com os dados do parâmetro
//         setVelocidadeVento(data.velocidade_vento || 0);
//         setDirecaoVento(data.direcao_vento || 0);
//         setTemperatura(data.temperatura || 0);
//         setUmidade(data.umidade || 0);
//         setChuva(data.chuva || 0);
//         setCpfUsuario(data.cpf_usuario || "");
//         setTipoParametro(data.id_tipo_parametro || "");
//         setIdEstacao(data.id_estacao?.toString() || "");
//         setIdMedida(data.id_medida?.toString() || "");
//       } catch (error) {
//         console.error("Erro ao buscar o parâmetro:", error);
//       }
//     };
  
//     fetchParametro();
//   }, [id]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const idParametro = Number(id); // Converte o id para número
//     const idEstacaoNumber = Number(idEstacao);
//     console.log("ID do parâmetro:", id);

//     const novoParametro: Parametro = {
//       id_parametro: id_parametro,
//       tipo_parametro: Number(tipoParametro),
//       id_da_estacao: idEstacaoNumber,
//     };

//     console.log("Enviando dados:", novoParametro);

//     try {
//       const response = await fetchWithAuth(
//         `http://localhost:3000/api/parametro/${idParametro}`,
//         {
//           method: "PUT",
//           body: JSON.stringify(novoParametro),
//         }
//       );

//       console.log("Resposta do servidor:", response);

//       // Exibe mensagem de sucesso e navega para /parametros
//       console.log("Erro ao conectar com o servidor.");
      
//     } catch (error) {
//       alert("Parâmetro atualizado com sucesso!");
//       navigate("/parametros");
      
//     }
//   };

//   const handleCancel = () => {
//     navigate("/parametros"); // Navegar para /parametros
//   };

//   return (
//     <>
//       <Aside />
//       <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg overflow-hidden">
//         <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
//           Edição de Parâmetro
//         </div>
//         <form className="py-4 px-6" onSubmit={handleSubmit}>
//           {/* Campo Velocidade do Vento */}
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 font-bold mb-2"
//               htmlFor="idParametro"
//             >
//               Id do parametro
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="IdParametro"
//               type="number"
//               step="0.01"
//               placeholder="Digite o Id do parametro"
//               value={id_parametro}
//               onChange={(e) => setIdParametro(Number(e.target.value))}
//             />
//           </div>

//           {/* Campo Estação */}
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 font-bold mb-2"
//               htmlFor="idEstacao"
//             >
//               Estação
//             </label>
//             <select
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="idEstacao"
//               value={idEstacao}
//               onChange={(e) => {
//                 console.log("Estação selecionada:", e.target.value); // Aqui você verá o valor selecionado
//                 setIdEstacao(e.target.value);
//               }}
//             >
//               <option value="">Selecione a Estação</option>
//               {estacoes.length > 0 ? (
//                 estacoes.map((estacao) => (
//                   <option key={estacao.id_estacao} value={estacao.id_estacao}>
//                     {estacao.id_estacao}
//                   </option>
//                 ))
//               ) : (
//                 <option value="">Nenhuma estação cadastrada</option>
//               )}
//             </select>
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
//               Salvar Alterações
//             </button>
//             <button
//               type="button"
//               className="btn-cancelar ml-4" // Classe para o botão cancelar
//               onClick={handleCancel} // Chamando a função de cancelar
//             >
//               Cancelar Alterações
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }
