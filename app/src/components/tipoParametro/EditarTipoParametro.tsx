import React, { useState, useEffect } from 'react';
import Aside from '../shared/aside/Aside';
import { useNavigate, useParams } from 'react-router-dom';
import TipoParametro from '../../model/TipoParametros';

export default function EditarTipoParametro() {
    const navigate = useNavigate();
    const { idEdicao } = useParams(); // Usando o hook useParams para pegar o ID da URL
    const [id, setId] = useState<number | null>(null);  // Variável para armazenar id_medida
    const [json_param, setJsonParam] = useState<string>('');
    const [nome, setNome] = useState<string>('');
    const [unidade, setUnidade] = useState<string>('');
    const [qtd_casadec, setQtdCasaDec] = useState<string>('');
    const [fator, setFator] = useState<string>('');

    useEffect(() => {
        if (!idEdicao) return;
        async function fetchTipoParametro() {
            try {
                const response = await fetch(`http://localhost:3000/api/tipoparametro/${idEdicao}`);
                if (response.ok) {
                    const data: TipoParametro = await response.json();
                    setId(data.id_tipo_param);
                    setNome(data.nome);
                    setJsonParam(data.json_param);
                    setUnidade(data.unidade);
                    setQtdCasaDec(data.qtd_casadesc);
                    setFator(data.fator);
                } else {
                    alert('Tipo do parametro não encontrado');
                    navigate('/tipoparametro');
                }
            } catch (error) {
                alert('Erro ao buscar tipo do parametro');
                console.error(error);
                navigate('/tipoparametro');
            }
        }

        fetchTipoParametro();
    }, [idEdicao, navigate]); // Dependência de idEdicao para carregar os dados novamente


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const tipoParametroAtualizado = { json_param, nome, unidade, qtd_casadesc: qtd_casadec, fator };

        try {
            // Usando id como id_medida para a atualização
            const response = await fetch(`http://localhost:3000/api/tipoparametro/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tipoParametroAtualizado),
            });

            const responseData = await response.json();
            if (response.ok) {
                alert('Tipo do parametro atualizado com sucesso!');
                navigate('/tipoparametro');
            } else {
                alert(`Erro ao atualizar tipo do parametro: ${responseData.message || "Erro desconhecido"}`);
            }
        } catch (error) {
            console.error("Erro ao conectar com o servidor:", error);
            alert('Erro ao conectar com o servidor');
        }
    };

    return (
        <>
            <Aside />
            <div className="w-full sm:max-w-md mx-auto mt-6 p-4 bg-white shadow-lg rounded-lg">
                <div className="text-xl sm:text-2xl py-3 sm:py-4 px-4 sm:px-6 bg-gray-900 text-white text-center font-bold uppercase">
                    Editar Tipo do parametro
                </div>
                <form className="py-4 px-4 sm:px-6" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-1 sm:mb-2">ID do tipo de parametro</label>
                        <input 
                            className="w-full p-2 border rounded bg-gray-100" 
                            type="text" 
                            value={id || ''} 
                            readOnly 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-1 sm:mb-2">Json parametro</label>
                        <input
                            className="w-full p-2 border rounded bg-gray-100"
                            type="text" 
                            value={json_param}
                            onChange={(e) => setJsonParam(e.target.value)}
                            placeholder="Digite o parametro json"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-1 sm:mb-2">Nome</label>
                        <input
                            className="w-full p-2 border rounded bg-gray-100"
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Digite o nome"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-1 sm:mb-2">Unidade</label>
                        <input
                            className="w-full p-2 border rounded bg-gray-100"
                            type="text"
                            value={unidade}
                            onChange={(e) => setUnidade(e.target.value)}
                            placeholder="Digite a unidade"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-1 sm:mb-2">Quantidade de casas decimais</label>
                        <input
                            className="w-full p-2 border rounded bg-gray-100"
                            type="text"
                            value={qtd_casadec}
                            onChange={(e) => setQtdCasaDec(e.target.value)}
                            placeholder="Digite a quantidade de casas decimais"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-1 sm:mb-2">Fator</label>
                        <input
                            className="w-full p-2 border rounded bg-gray-100"
                            type="text"
                            value={fator}
                            onChange={(e) => setFator(e.target.value)}
                            placeholder="Digite o fator"
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                        <button className="bg-blue-600 text-white p-2 rounded w-full sm:w-auto" type="submit">
                            Salvar
                        </button>
                        <button
                            className="border border-red-500 p-2 rounded w-full sm:w-auto"
                            type="button"
                            onClick={() => navigate('/tipoparametro')}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
