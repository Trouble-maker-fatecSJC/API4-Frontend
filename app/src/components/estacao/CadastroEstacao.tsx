import React, { useState } from 'react';
import Header from '../header/Header';

export default function CadastroEstacao() {
  // Estado para armazenar os dados do formulário
  const [nome, setNome] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [dataInstalacao, setDataInstalacao] = useState('');
  const [tipoEstacao, setTipoEstacao] = useState('');
  const [indicativoAtiva, setIndicativoAtiva] = useState(false);
  const [estacao, setEstacao] = useState(['']);

  // Função para adicionar um novo campo de serviço
  const adicionarServico = () => {
    setEstacao([...estacao, '']);
  };

  // Função para lidar com a mudança de valor de cada campo de seleção
  const handleEstacaoChange = (index: number, event: React.ChangeEvent<HTMLSelectElement>) => {
    const novaEstacao = [...estacao];
    novaEstacao[index] = event.target.value;
    setEstacao(novaEstacao);
  };

  // Função para enviar os dados para o back-end
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Criar o objeto com os dados do formulário
    const dadosEstacao = {
      Nome: nome,
      Latitude: parseFloat(latitude),
      Longitude: parseFloat(longitude),
      Data_Instalacao: new Date(dataInstalacao), // Converte a data para o formato correto
      Tipo_Estacao: tipoEstacao,
      Indicativo_Ativa: indicativoAtiva,
      Servicos: estacao, // Enviar os parâmetros selecionados
    };

    try {
      // Enviar a requisição para a API
      const response = await fetch('http://localhost:8800/estacao/cadastrar-estacao', {
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
        setLatitude('');
        setLongitude('');
        setDataInstalacao('');
        setTipoEstacao('');
        setIndicativoAtiva(false);
        setEstacao(['']);
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
    <Header />
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
        Estação
      </div>
      <form className="py-4 px-6" onSubmit={handleSubmit}>
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
            value={nome}
            onChange={(e) => setNome(e.target.value)}
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

        {/* Campo Tipo de Estação */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="tipo_estacao">
            Tipo de Estação
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="tipo_estacao"
            type="text"
            placeholder="Tipo de Estação"
            value={tipoEstacao}
            onChange={(e) => setTipoEstacao(e.target.value)}
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

        {/* Campos de Parâmetros (select) */}
        {estacao.map((servico, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor={`service-${index}`}>
              Parâmetros
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id={`service-${index}`}
              name={`service-${index}`}
              value={servico}
              onChange={(e) => handleEstacaoChange(index, e)}
            >
              <option value="">Selecione um serviço</option>
              <option value="vento">Vento</option>
              <option value="umidade">Umidade</option>
              <option value="temperatura">Temperatura</option>
              <option value="pressao">Pressão</option>
            </select>
          </div>
        ))}

        {/* Botão para adicionar um novo campo de serviço */}
        <button
          type="button"
          onClick={adicionarServico}
          className="btn-adicionar"
        >
          Adicionar Outro Parâmetro
        </button>

        {/* Botão para enviar o formulário */}
        <div className="flex items-center justify-center mt-6">
          <button
            className="btn-cadastrar"
            type="submit"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
    </>
  );
}


