import React, { useEffect, useState } from 'react';
import Header from '../header/Header';

interface EditarEstacaoProps {
    estacaoId: number; // ID da estação que será editada
    onClose: () => void; // Função para fechar o componente
}

export default function EditarEstacao({ estacaoId, onClose }: EditarEstacaoProps) {
    // Estado para armazenar os dados do formulário
    const [nome, setNome] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [dataInstalacao, setDataInstalacao] = useState('');
    const [tipoEstacao, setTipoEstacao] = useState('');
    const [indicativoAtiva, setIndicativoAtiva] = useState(false);
    const [estacao, setEstacao] = useState(['']);

    // Função para carregar os dados da estação a ser editada
    useEffect(() => {
        const carregarEstacao = async () => {
            try {
                const response = await fetch(`http://localhost:8800/estacao/${estacaoId}`);
                if (response.ok) {
                    const dados = await response.json();
                    setNome(dados.Nome);
                    setLatitude(dados.Latitude);
                    setLongitude(dados.Longitude);
                    setDataInstalacao(dados.Data_Instalacao.split('T')[0]); // Formato de data
                    setTipoEstacao(dados.Tipo_Estacao);
                    setIndicativoAtiva(dados.Indicativo_Ativa);
                    setEstacao(dados.Servicos); // Carregar os serviços existentes
                } else {
                    alert('Erro ao carregar os dados da estação');
                }
            } catch (error) {
                alert('Erro ao conectar com o servidor');
                console.error(error);
            }
        };

        carregarEstacao();
    }, [estacaoId]);

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
            Data_Instalacao: new Date(dataInstalacao),
            Tipo_Estacao: tipoEstacao,
            Indicativo_Ativa: indicativoAtiva,
            Servicos: estacao,
        };

        try {
            // Enviar a requisição para a API
            const response = await fetch(`http://localhost:8800/estacao/editar-estacao/${estacaoId}`, {
                method: 'PUT', // Usar PUT para edição
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dadosEstacao),
            });

            if (response.ok) {
                alert('Estação editada com sucesso!');
                // Limpar os campos do formulário após o envio
                setNome('');
                setLatitude('');
                setLongitude('');
                setDataInstalacao('');
                setTipoEstacao('');
                setIndicativoAtiva(false);
                setEstacao(['']);
                onClose(); // Chamar a função de fechamento após a edição
            } else {
                alert('Erro ao editar a estação');
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
                    Editar Estação
                </div>
                <form className="py-4 px-6" onSubmit={handleSubmit}>
                    {/* Campos do formulário */}
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
                    </div >
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
                            Editar
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}