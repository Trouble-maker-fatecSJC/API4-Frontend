// import React from 'react';

// export default function MsgErro({ tipo, mensagem }) {
//   // Definir as classes CSS com base no tipo do alerta
//   const classes = tipo === 'sucesso' 
//     ? 'bg-green-100 border border-green-400 text-green-700'
//     : 'bg-red-100 border border-red-400 text-red-700';

//   return (
//     <div className={`flex inline-flex justify-between ${classes} px-4 py-3 my-2 rounded`}>
//       <span className="block sm:inline pl-2">
//         <strong className="font-bold">{tipo === 'sucesso' ? 'Sucesso' : 'Erro'}</strong>
//         {mensagem}
//       </span>
//       <span className="inline" onClick={(e) => e.target.parentNode.remove()}>
//         <svg className="fill-current h-6 w-6" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
//           <title>Fechar</title>
//           <path
//             d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
//         </svg>
//       </span>
//     </div>
//   );
// }
