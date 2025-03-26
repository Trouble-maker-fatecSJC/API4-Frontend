import { useState, useEffect } from 'react';
import TipoParametro from '../../model/TipoParametros';
import Aside from '../shared/aside/Aside';
import { useNavigate } from 'react-router-dom';

export default function TipoParametros() {
    
    const navigate = useNavigate();

    const [TipoParametros, setTipoParametros] = useState<TipoParametro[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getTipoParametro() {
            try {
                const response = await fetch('http://localhost:3000/api/tipoparametro');
                const data = await response.json();
                console.log('Dados recebidos:', data);
                setTipoParametros(data);
            } catch (error) {
                console.error('Erro ao carregar os tipos de parametro:', error);
            } finally {
                setIsLoading(false);
            }
        }
        getTipoParametro();
    }, []);

    

    const handleEditar = (idEdicao: number) => {
        navigate(`/editartipoparametro/${idEdicao}`);
    };

    const handleExcluir = async (id: number) => {
        if (confirm('Tem certeza que deseja excluir este tipo de parametro?')) {
            try {
                await fetch(`http://localhost:3000/api/tipoparametro/${id}`, { method: 'DELETE' });
                setTipoParametros(TipoParametros.filter(TipoParametros => TipoParametros.id_tipo_param !== id));
            } catch (error) {
                console.error('Erro ao excluir tipo parametro:', error);
            }
        }
    };

    return (
        <>
            <Aside />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-black-100 text-center">
                    Tipo de Parametros
                </h1>
                {isLoading ? (
                    <p className="text-center">Carregando...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full mt-4 border-collapse border border-gray-300 dark:border-gray-700 text-sm sm:text-base">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-800 text-left text-white">
                                    <th className="py-2 px-4 border">Josn Param</th>
                                    <th className="py-2 px-4 border">Nome</th>
                                    <th className="py-2 px-4 border">Unidade</th>
                                    <th className="py-2 px-4 border">Quantidade de casas decimais</th>
                                    <th className="py-2 px-4 border">Fator</th>
                                </tr>
                            </thead>
                            <tbody>
                                {TipoParametros.map((TipoParametros) => (
                                    <tr key={TipoParametros.id_tipo_param} className="border-b dark:border-gray-700">
                                        <td className="py-2 px-4 border">{TipoParametros.json_param}</td>
                                        <td className="py-2 px-4 border">{TipoParametros.nome}</td>
                                        <td className="py-2 px-4 border">{TipoParametros.unidade}</td>
                                        <td className="py-2 px-4 border">{TipoParametros.qtd_casadesc}</td>
                                        <td className="py-2 px-4 border">{TipoParametros.fator}</td>
                                        <td className="py-2 px-4 border flex space-x-2">
                                            <button 
                                                onClick={() => handleEditar(TipoParametros.id_tipo_param)}
                                                className="btn-editar">
                                                Editar
                                            </button>
                                            <button 
                                                onClick={() => handleExcluir(TipoParametros.id_tipo_param)}
                                                className="btn-delete">
                                                Excluir
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
}
