// import React, { useEffect, useState } from 'react';

// interface EditarEstacaoProps {
//   estacaoId: number;
//   onClose: () => void;
// }

// export default function EditarEstacao({ estacaoId, onClose }: EditarEstacaoProps) {
//   // Estados para armazenar os dados do formulário
//   const [nome, setNome] = useState('');
//   const [endereco, setEndereco] = useState('');
//   const [latitude, setLatitude] = useState('');
//   const [longitude, setLongitude] = useState('');
//   const [dataInstalacao, setDataInstalacao] = useState('');
//   const [indicativoAtiva, setIndicativoAtiva] = useState(false);

//   // Carregar os dados da estação a ser editada
//   useEffect(() => {
//     const carregarEstacao = async () => {
//       try {
//         const response = await fetch(`http://localhost:3000/api/estacao/${estacaoId}`);
//         if (response.ok) {
//           const dados = await response.json();
//           setNome(dados.nome);
//           setEndereco(dados.endereco);
//           setLatitude(dados.latitude);
//           setLongitude(dados.longitude);
//           setDataInstalacao(dados.data_instalacao.split('T')[0]); // Formatar data
//           setIndicativoAtiva(dados.status);
//         } else {
//           alert('Erro ao carregar os dados da estação');
//         }
//       } catch (error) {
//         alert('Erro ao conectar com o servidor');
//         console.error(error);
//       }
//     };

//     carregarEstacao();
//   }, [estacaoId]);

//   // Função para enviar os dados editados para o servidor
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const dadosEstacao = {
//       nome,
//       endereco,
//       latitude: parseFloat(latitude),
//       longitude: parseFloat(longitude),
//       data_instalacao: new Date(dataInstalacao),
//       status: indicativoAtiva,
//     };

//     try {
//       const response = await fetch(`http://localhost:3000/api/estacao/${estacaoId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(dadosEstacao),
//       });

//       if (response.ok) {
//         alert('Estação editada com sucesso!');
//         onClose(); // Fecha o modal após edição
//       } else {
//         alert('Erro ao editar a estação');
//       }
//     } catch (error) {
//       alert('Erro ao conectar com o servidor');
//       console.error(error);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
//       <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
//         Editar Estação
//       </div>
//       <form className="py-4 px-6" onSubmit={handleSubmit}>
//         {/* Nome */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-bold mb-2" htmlFor="nome">
//             Nome
//           </label>
//           <input
//             id="nome"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             type="text"
//             placeholder="Nome da estação"
//             value={nome}
//             onChange={(e) => setNome(e.target.value)}
//           />
//         </div>

//         {/* Endereço */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-bold mb-2" htmlFor="endereco">
//             Endereço
//           </label>
//           <input
//             id="endereco"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             type="text"
//             placeholder="Endereço"
//             value={endereco}
//             onChange={(e) => setEndereco(e.target.value)}
//           />
//         </div>

//         {/* Latitude */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-bold mb-2" htmlFor="latitude">
//             Latitude
//           </label>
//           <input
//             id="latitude"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             type="text"
//             placeholder="Latitude"
//             value={latitude}
//             onChange={(e) => setLatitude(e.target.value)}
//           />
//         </div>

//         {/* Longitude */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-bold mb-2" htmlFor="longitude">
//             Longitude
//           </label>
//           <input
//             id="longitude"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             type="text"
//             placeholder="Longitude"
//             value={longitude}
//             onChange={(e) => setLongitude(e.target.value)}
//           />
//         </div>

//         {/* Data de Instalação */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-bold mb-2" htmlFor="data_instalacao">
//             Data de Instalação
//           </label>
//           <input
//             id="data_instalacao"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             type="date"
//             value={dataInstalacao}
//             onChange={(e) => setDataInstalacao(e.target.value)}
//           />
//         </div>

//         {/* Indicativo Ativa */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-bold mb-2" htmlFor="indicativo_ativa">
//             Indicativo Ativa
//           </label>
//           <input
//             id="indicativo_ativa"
//             type="checkbox"
//             checked={indicativoAtiva}
//             onChange={(e) => setIndicativoAtiva(e.target.checked)}
//           />
//         </div>

//         <div className="flex items-center justify-center mt-6">
//           <button className="btn-cadastrar" type="submit">
//             Editar
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }




// nova tentativa edit 

import React, { useEffect, useState } from 'react';
import Estacao from '../../model/Estacao';

interface EditarEstacaoProps {
  estacao: Estacao;
  onClose: () => void;
}


export default function EditarEstacao({ estacao, onClose }: EditarEstacaoProps) {
  // Estados para armazenar os dados do formulário
  const [id_estacao, setId] = useState(0);
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [dataInstalacao, setDataInstalacao] = useState('');
  const [indicativoAtiva, setIndicativoAtiva] = useState(false);

  
  


  // Carregar os dados da estação a ser editada
  useEffect(() => {
    setId(estacao.id_estacao);
    setNome(estacao.nome);
    setEndereco(estacao.endereco);
    setLatitude(estacao.latitude.toString());
    setLongitude(estacao.longitude.toString());
    setDataInstalacao(estacao.data_instalacao.split('T')[0]);
    setIndicativoAtiva(estacao.status);
  }, [estacao]);

  // Função para enviar os dados editados para o servidor
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataFormatada = new Date(dataInstalacao).toISOString().split("T")[0];
    const dadosEstacao = {
      nome,
      endereco,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      data_instalacao: dataFormatada,
      status: indicativoAtiva,
    };

    try {
      const response = await fetch(`http://localhost:3000/api/estacao/${estacao.id_estacao}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosEstacao),
      });
      console.log(estacao);
      console.log('Enviando JSON:', JSON.stringify(dadosEstacao));
      // console.log(id);
      // console.log(estacao.id_estacao);
      
      
      
      if (response.ok) {
        alert('Estação editada com sucesso!');
        onClose(); // Fecha o modal após edição
      } else {
        alert('Erro ao editar a estação');
      }
    } catch (error) {
      alert('Erro ao conectar com o servidor');
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
        Editar Estação
      </div>
      <form className="py-4 px-6" onSubmit={handleSubmit}>
        {/* Nome */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="nome">
            Nome
          </label>
          <input
            id="nome"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Nome da estação"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        {/* Endereço */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="endereco">
            Endereço
          </label>
          <input
            id="endereco"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Endereço"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />
        </div>

        {/* Latitude */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="latitude">
            Latitude
          </label>
          <input
            id="latitude"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </div>

        {/* Longitude */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="longitude">
            Longitude
          </label>
          <input
            id="longitude"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </div>

        {/* Data de Instalação */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="data_instalacao">
            Data de Instalação
          </label>
          <input
            id="data_instalacao"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="date"
            value={dataInstalacao}
            onChange={(e) => setDataInstalacao(e.target.value)}
          />
        </div>

        {/* Indicativo Ativa */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="indicativo_ativa">
            Indicativo Ativa
          </label>
          <input
            id="indicativo_ativa"
            type="checkbox"
            checked={indicativoAtiva}
            onChange={(e) => setIndicativoAtiva(e.target.checked)}
          />
        </div>

        <div className="flex items-center justify-center mt-6">
          <button className="btn-cadastrar" type="submit">
            Editar
          </button>
        </div>
      </form>
    </div>
  );
}
