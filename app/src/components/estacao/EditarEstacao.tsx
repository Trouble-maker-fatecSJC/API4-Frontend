import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { fetchWithAuth } from '../../services/api';

export default function EditarEstacao() {
  const navigate = useNavigate();
  const { idEstacao } = useParams<{ idEstacao: string }>();
  const id = idEstacao ? Number(idEstacao) : null;
  const location = useLocation();
  const estacao = location.state?.estacao; // Pegando os dados passados na navegação
  console.log("estacao location", estacao.id_estacao);

  const [nome, setNome] = useState(estacao?.nome || '');
  const [endereco, setEndereco] = useState(estacao?.endereco || '');
  const [latitude, setLatitude] = useState(estacao?.latitude?.toString() || '');
  const [longitude, setLongitude] = useState(estacao?.longitude?.toString() || '');
  const [dataInstalacao, setDataInstalacao] = useState(estacao?.data_instalacao?.split('T')[0] || '');
  const [indicativoAtiva, setIndicativoAtiva] = useState(estacao?.status ?? false);

  useEffect(() => {
    if (estacao) return; // Se já temos os dados, não precisa buscar novamente

    if (!id) return;

    async function fetchEstacao() {
      try {
        const data = await fetchWithAuth(`http://localhost:3000/api/estacao/${id}`);
        setNome(data.nome);
        setEndereco(data.endereco);
        setLatitude(data.latitude.toString());
        setLongitude(data.longitude.toString());
        setDataInstalacao(data.data_instalacao.split('T')[0]);
        setIndicativoAtiva(data.status);
      } catch (error) {
        console.error(error);
        navigate('/estacoes');
      }
    }
    fetchEstacao();
  }, [id, estacao, navigate]);

  // Função para enviar os dados editados para o servidor
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!estacao.id_estacao) return;

    const dadosEstacao = {
      nome,
      endereco,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      data_instalacao: new Date(dataInstalacao).toISOString().split('T')[0],
      status: indicativoAtiva,
    };

    try {
      const response = await fetchWithAuth(`http://localhost:3000/api/estacao/${estacao.id_estacao}`, {
        method: 'PUT',
        body: JSON.stringify(dadosEstacao),
      });
      if (!response.ok) {;
      alert('Estação editada com sucesso!');
      navigate('/estacoes');
      } else {
        alert('Erro ao editar a estação. Verifique os dados e tente novamente.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao conectar com o servidor');
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
            placeholder={nome}
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
            placeholder={endereco}
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
            placeholder={latitude}
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
            placeholder={longitude}
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
            type={dataInstalacao}
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

        <div className="flex items-center justify-center mt-6 gap-6">
          <button className="btn-cadastrar" type="submit">
            Salvar
          </button>
          <button className="btn-cancelar"
              type="button" onClick={() => navigate('/estacoes')}
          >
               Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

