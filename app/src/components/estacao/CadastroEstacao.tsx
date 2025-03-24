import React, { useState } from 'react';
import Header from '../header/Header';
import Aside from '../aside/Aside';

export default function CadastroEstacao() {
  // Estado para armazenar os dados do formulário
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [dataInstalacao, setDataInstalacao] = useState('');
  const [indicativoAtiva, setIndicativoAtiva] = useState(false);

  // Função para enviar os dados para o back-end
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Converter latitude e longitude para float
    const latitudeFloat = parseFloat(latitude);
    const longitudeFloat = parseFloat(longitude);

    // Converter a data para o formato YYYY-MM-DD (sem hora)
    const dataFormatada = new Date(dataInstalacao).toISOString().split('T')[0];

    // Criar o objeto com os dados do formulário
    const dadosEstacao = {
      nome: nome,
      endereco: endereco,
      latitude: latitudeFloat, // Envia como float
      longitude: longitudeFloat, // Envia como float
      data_instalacao: dataFormatada, // Envia a data no formato YYYY-MM-DD
      status: indicativoAtiva, // Corrigido de "estatus" para "status"
    };

    // Exibe os dados no console antes de enviar
    console.log("Dados enviados:", dadosEstacao);

    try {
      // Enviar a requisição para a API
      const response = await fetch('http://localhost:3000/api/estacao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosEstacao), // Envia os dados no formato JSON
      });

      if (response.ok) {
        alert('Estação cadastrada com sucesso!');
        // Limpar os campos do formulário após o envio
        setNome('');
        setEndereco('');
        setLatitude('');
        setLongitude('');
        setDataInstalacao('');
        setIndicativoAtiva(false);
      } else {
        alert('Erro ao cadastrar a estação');
      }
    } catch (error) {
      alert('Erro ao conectar com o servidor');
      console.error(error);
    }
  };

  return (
    <>
      <Aside />
      <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
          Estação
        </div>
        <form className="py-4 px-6" onSubmit={handleSubmit}>
          {/* Campo Nome */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="nome">
              Nome
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Nome estação"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          {/* Campo Endereco */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="nome">
              Endereco
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Endereço"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />
          </div>

          {/* Campo Latitude */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="latitude">
              Latitude
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="latitude"
              type="text"
              placeholder="Lat"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </div>

          {/* Campo Longitude */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="longitude">
              Longitude
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="longitude"
              type="text"
              placeholder="Long"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </div>

          {/* Campo Data de Instalação */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="data_instalacao">
              Data de Instalação
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="data_instalacao"
              type="date"
              value={dataInstalacao}
              onChange={(e) => setDataInstalacao(e.target.value)}
            />
          </div>

          {/* Campo Indicativo Ativa */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="indicativo_ativa">
              Indicativo Ativa
            </label>
            <input
              type="checkbox"
              id="indicativo_ativa"
              checked={indicativoAtiva}
              onChange={(e) => setIndicativoAtiva(e.target.checked)}
            />
          </div>

          {/* Botão para enviar o formulário */}
          <div className="flex items-center justify-center mt-6">
            <button className="btn-cadastrar" type="submit">
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}



// Antigo

// import React, { useState } from 'react';
// import Header from '../header/Header';

// export default function CadastroEstacao() {
//   // Estado para armazenar os dados do formulário
//   const [nome, setNome] = useState('');
//   const [latitude, setLatitude] = useState('');
//   const [longitude, setLongitude] = useState('');
//   const [dataInstalacao, setDataInstalacao] = useState('');
//   const [indicativoAtiva, setIndicativoAtiva] = useState(false);
//   const [estacao, setEstacao] = useState(['']);

//   // Função para adicionar um novo campo de serviço
//   // const adicionarParametro = () => {
//   //   setEstacao([...estacao, '']);
//   // };

//   // Função para lidar com a mudança de valor de cada campo de seleção
//   const handleEstacaoChange = (index: number, event: React.ChangeEvent<HTMLSelectElement>) => {
//     const novaEstacao = [...estacao];
//     novaEstacao[index] = event.target.value;
//     setEstacao(novaEstacao);
//   };

//   // Função para enviar os dados para o back-end
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Criar o objeto com os dados do formulário
//     const dadosEstacao = {
//       nome: nome,
//       latitude: parseFloat(latitude),
//       longitude: parseFloat(longitude),
//       data_instalacao: new Date(dataInstalacao), // Converte a data para o formato correto
//       estatus: indicativoAtiva,
//       // Parametros: estacao, // Enviar os parâmetros selecionados
//     };

//     try {
//       // Enviar a requisição para a API
//       const response = await fetch('http://localhost:3000/api/estacoes', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(dadosEstacao), // Envia os dados no formato JSON
//       });

//       if (response.ok) {
//         alert('Estação cadastrada com sucesso!');
//         // Limpar os campos do formulário após o envio
//         setNome('');
//         setLatitude('');
//         setLongitude('');
//         setDataInstalacao('');
//         setIndicativoAtiva(false);
//         setEstacao(['']);
//       } else {
//         alert('Erro ao cadastrar a estação');
//       }
//     } catch (error) {
//       alert('Erro ao conectar com o servidor');
//       console.error(error);
//     }
//   };

//   return (
//     <>
//     <Header />
//     <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
//       <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
//         Estação
//       </div>
//       <form className="py-4 px-6" onSubmit={handleSubmit}>
//         {/* Campo Nome */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-bold mb-2" htmlFor="nome">
//             Nome
//           </label>
//           <input
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             id="name"
//             type="text"
//             placeholder="Nome estação"
//             value={nome}
//             onChange={(e) => setNome(e.target.value)}
//           />
//         </div>

//         {/* Campo Latitude */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-bold mb-2" htmlFor="latitude">
//             Latitude
//           </label>
//           <input
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             id="latitude"
//             type="text"
//             placeholder="Lat"
//             value={latitude}
//             onChange={(e) => setLatitude(e.target.value)}
//           />
//         </div>

//         {/* Campo Longitude */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-bold mb-2" htmlFor="longitude">
//             Longitude
//           </label>
//           <input
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             id="longitude"
//             type="text"
//             placeholder="Long"
//             value={longitude}
//             onChange={(e) => setLongitude(e.target.value)}
//           />
//         </div>

//         {/* Campo Data de Instalação */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-bold mb-2" htmlFor="data_instalacao">
//             Data de Instalação
//           </label>
//           <input
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             id="data_instalacao"
//             type="date"
//             value={dataInstalacao}
//             onChange={(e) => setDataInstalacao(e.target.value)}
//           />
//         </div>


//         {/* Campo Indicativo Ativa */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-bold mb-2" htmlFor="indicativo_ativa">
//             Indicativo Ativa
//           </label>
//           <input
//             type="checkbox"
//             id="indicativo_ativa"
//             checked={indicativoAtiva}
//             onChange={(e) => setIndicativoAtiva(e.target.checked)}
//           />
//         </div>

//         {/* Campos de Parâmetros (select) */}
//         {/*
//         {estacao.map((servico, index) => (
//           <div key={index} className="mb-4">
//             <label className="block text-gray-700 font-bold mb-2" htmlFor={`service-${index}`}>
//               Parâmetros
//             </label>
//             <select
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id={`service-${index}`}
//               name={`service-${index}`}
//               value={servico}
//               onChange={(e) => handleEstacaoChange(index, e)}
//             >
//               <option value="">Selecione um serviço</option>
//               <option value="vento">Vento</option>
//               <option value="umidade">Umidade</option>
//               <option value="temperatura">Temperatura</option>
//               <option value="pressao">Pressão</option>
//             </select>
//           </div>
//         ))}

//         // Botão para adicionar um novo campo de serviço 
//         <button
//           type="button"
//           onClick={adicionarParametro}
//           className="btn-adicionar"
//         >
//           Adicionar Outro Parâmetro
//         </button>
//         */}

//         {/* Botão para enviar o formulário */}
//         <div className="flex items-center justify-center mt-6">
//           <button
//             className="btn-cadastrar"
//             type="submit"
//           >
//             Cadastrar
//           </button>
//         </div>
//       </form>
//     </div>
//     </>
//   );
// }


