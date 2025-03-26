import { useState, useEffect } from 'react';
import Usuario from '../../model/usuario';
import Aside from '../shared/aside/Aside';
import { useNavigate } from 'react-router-dom';


export default function Usuarios() {
    
    const navigate = useNavigate();

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getUsuarios() {
            try {
                const response = await fetch('http://localhost:3000/api/usuarios');
                const data = await response.json();
                console.log('Dados recebidos:', data); // Verificando o que foi recebido
                setUsuarios(data);
            } catch (error) {
                console.error('Erro ao carregar os usuários:', error);
            } finally {
                setIsLoading(false);
            }
        }
        getUsuarios();
    }, []);


    const handleEditar = (cpfEdicao: string) => {
        navigate(`/editarusuario/${cpfEdicao}`)
    };

    const handleExcluir = async (cpf: string) => {
        if (confirm('Tem certeza que deseja excluir este usuário?')) {
            try {
                await fetch(`http://localhost:3000/api/usuarios/${cpf}`, { method: 'DELETE' });
                setUsuarios(usuarios.filter(usuario => usuario.cpf !== cpf));
            } catch (error) {
                console.error('Erro ao excluir usuário:', error);
            }
        }
    };

    return (
        <>
            <Aside />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-black-100 text-center">
                    Usuários
                </h1>
                {isLoading ? (
                    <p className="text-center">Carregando...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full mt-4 border-collapse border border-gray-300 dark:border-gray-700 text-sm sm:text-base">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-800 text-left text-white">
                                    <th className="py-2 px-4 border">Nome</th>
                                    <th className="py-2 px-4 border">Email</th>
                                    <th className="py-2 px-4 border">Telefone</th>
                                    <th className="py-2 px-4 border">Tipo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map((usuario) => (
                                    <tr key={usuario.cpf} className="border-b dark:border-gray-700">
                                        <td className="py-2 px-4 border">{usuario.nome}</td>
                                        <td className="py-2 px-4 border">{usuario.email}</td>
                                        <td className="py-2 px-4 border">{usuario.telefone}</td>
                                        <td className="py-2 px-4 border">{usuario.tipo === 1 ? 'Administrador' : 'Usuário'}</td>
                                        <td className="py-2 px-4 border flex space-x-2">
                                            <button 
                                                onClick={() => handleEditar(usuario.cpf)}
                                                className="btn-editar">
                                                Editar
                                            </button>
                                            <button 
                                                onClick={() => handleExcluir(usuario.cpf)}
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
