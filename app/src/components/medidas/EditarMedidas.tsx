import React, { useState, useEffect } from 'react';
import Aside from '../shared/aside/Aside';
import { useNavigate, useParams } from 'react-router-dom';
import Medidas from '../../model/Medidas';

export default function EditarMedida() {
    const navigate = useNavigate();
    const { idEdicao } = useParams(); // Usando o hook useParams para pegar o ID da URL
    const [id, setId] = useState<number | null>(null);  // Variável para armazenar id_medida
    const [valor, setValor] = useState<number | string>('');
    const [unix_time, setUnixTime] = useState<string>('');

    useEffect(() => {
        if (!idEdicao) return; // Se idEdicao não estiver definido, não faz nada

        async function fetchMedida() {
            try {
                const response = await fetch(`http://localhost:3000/api/medidas/${idEdicao}`);
                if (response.ok) {
                    const data: Medidas = await response.json();
                    setId(data.id_medida); // Atribuindo o id_medida à variável id
                    setValor(data.valor);
                    setUnixTime(data.unix_time);
                } else {
                    alert('Medida não encontrada');
                    navigate('/medidas');
                }
            } catch (error) {
                alert('Erro ao buscar medida');
                console.error(error);
                navigate('/medidas');
            }
        }

        fetchMedida();
    }, [idEdicao, navigate]); // Dependência de idEdicao para carregar os dados novamente

    const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Aceita apenas números ou vazio
        const value = e.target.value;
        if (value === '' || !isNaN(Number(value))) {
            setValor(value);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const medidaAtualizada = { valor, unix_time };

        try {
            // Usando id como id_medida para a atualização
            const response = await fetch(`http://localhost:3000/api/medidas/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(medidaAtualizada),
            });

            const responseData = await response.json();
            if (response.ok) {
                alert('Medida atualizada com sucesso!');
                navigate('/medidas');
            } else {
                alert(`Erro ao atualizar medida: ${responseData.message || "Erro desconhecido"}`);
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
                    Editar Medida
                </div>
                <form className="py-4 px-4 sm:px-6" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-1 sm:mb-2">ID da Medida</label>
                        <input 
                            className="w-full p-2 border rounded bg-gray-100" 
                            type="text" 
                            value={id || ''} 
                            readOnly 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-1 sm:mb-2">Valor</label>
                        <input
                            className="w-full p-2 border rounded bg-gray-100"
                            type="text" 
                            value={valor}
                            onChange={handleValorChange} 
                            placeholder="Digite o valor"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-1 sm:mb-2">Unix Time</label>
                        <input
                            className="w-full p-2 border rounded bg-gray-100"
                            type="text"
                            value={unix_time}
                            onChange={(e) => setUnixTime(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                        <button className="bg-blue-600 text-white p-2 rounded w-full sm:w-auto" type="submit">
                            Salvar
                        </button>
                        <button
                            className="border border-red-500 p-2 rounded w-full sm:w-auto"
                            type="button"
                            onClick={() => navigate('/medidas')}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
