import React, { useState } from 'react';

export default function CadastroEstacao() {
  // Estado para armazenar os serviços selecionados
  const [servicos, setServicos] = useState(['']);

  // Função para adicionar um novo campo de serviço
  const adicionarServico = () => {
    setServicos([...servicos, '']);
  };

  // Função para lidar com a mudança de valor de cada campo de seleção
  const handleServicoChange = (index: number, event: React.ChangeEvent<HTMLSelectElement>) => {
    const novosServicos = [...servicos];
    novosServicos[index] = event.target.value;
    setServicos(novosServicos);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
        Estação
      </div>
      <form className="py-4 px-6" action="" method="POST">
        {/* Campo Nome */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Nome
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Nome estação"
          />
        </div>

        {/* Campo Endereço */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Endereço
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Endereço estação"
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
          />
        </div>

        {/* Campos de Parâmetros (select) */}
        {servicos.map((servico, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor={`service-${index}`}>
              Parâmetros
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id={`service-${index}`}
              name={`service-${index}`}
              value={servico}
              onChange={(e) => handleServicoChange(index, e)}
            >
              <option value="">Selecione um serviço</option>
              <option value="haircut">Corte de cabelo</option>
              <option value="coloring">Coloração</option>
              <option value="styling">Penteado</option>
              <option value="facial">Facial</option>
            </select>
          </div>
        ))}

        {/* Botão para adicionar um novo campo de serviço */}
        <button
          type="button"
          onClick={adicionarServico}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Adicionar Outro Parametro
        </button>

        {/* Botão para enviar o formulário */}
        <div className="flex items-center justify-center mt-6">
          <button
            className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}






{/* <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="parametros">
                Parametros
            </label>
            <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="service" name="service">
                <option value="">Select a service</option>
                <option value="haircut">Haircut</option>
                <option value="coloring">Coloring</option>
                <option value="styling">Styling</option>
                <option value="facial">Facial</option>
            </select>
        </div> */}
