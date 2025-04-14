// import React, { useState, useEffect } from 'react';
// import Aside from '../shared/aside/Aside';
// import { useNavigate, useParams } from 'react-router-dom';
// import { fetchWithAuth } from '../../services/api';
// import Medidas from '../../model/Medidas';
// import { Select } from '../shared/Select';
// import { useMedidas } from '../../hooks/useMedidas';

// export default function EditarMedida() {
//     const navigate = useNavigate();
//     const { idEdicao } = useParams();
//     const { estacoes, tipoParametros } = useMedidas();
//     const [medida, setMedida] = useState<Medidas | null>(null);
//     const [valor, setValor] = useState<string>('');
//     const [unixTime, setUnixTime] = useState<string>('');
//     const [idEstacao, setIdEstacao] = useState<string>('');
//     const [idParametro, setIdParametro] = useState<string>('');
//     const [casasDecimais, setCasasDecimais] = useState<number | null>(null);

//     useEffect(() => {
//         async function fetchMedida() {
//             try {
//                 const data: Medidas = await fetchWithAuth(`http://localhost:3000/api/medidas/${idEdicao}`);
//                 console.log("Dados recebidos:", data);
                
//                 if (!data || typeof data !== 'object') {
//                     throw new Error("Dados da medida inválidos ou não encontrados");
//                 }
    
//                 setMedida(data);
//                 setValor(data.valor?.toString() || '0');
//                 setIdEstacao(data.id_da_estacao?.toString() || '');
//                 setIdParametro(data.id_parametro?.toString() || '');
                
//                 // Tratamento da data
//                 const timestamp = data.unix_time 
//                     ? (typeof data.unix_time === 'number' 
//                         ? data.unix_time 
//                         : Date.parse(data.unix_time))
//                     : Date.now();
//                 const date = new Date(timestamp);
//                 setUnixTime(date.toISOString());

//                 // Buscar casas decimais do tipo parâmetro
//                 if (data.id_parametro && tipoParametros.length > 0) {
//                     const tipoParam = tipoParametros.find(
//                         tipo => tipo.id_tipo_param === data.id_parametro
//                     );
//                     if (tipoParam?.qtd_casadesc) {
//                         setCasasDecimais(parseInt(tipoParam.qtd_casadesc));
//                     }
//                 }
//             } catch (error) {
//                 console.error("Erro detalhado:", error);
//                 alert('Erro ao buscar medida: ' + (error as Error).message);
//                 navigate('/medidas');
//             }
//         }

//         if (idEdicao && estacoes.length > 0 && tipoParametros.length > 0) {
//             fetchMedida();
//         }
//     }, [idEdicao, navigate, estacoes, tipoParametros]);
//     useEffect(() => {
//         console.log("Estações:", estacoes);
//         console.log("Tipo Parâmetros:", tipoParametros);
//         console.log("ID Estação:", idEstacao);
//         console.log("ID Parâmetro:", idParametro);
//     }, [estacoes, tipoParametros, idEstacao, idParametro]);

//     const handleValorChange = (value: string) => {
//         if (value === "" || !isNaN(parseFloat(value))) {
//             if (casasDecimais !== null) {
//                 const decimal = value.split('.')[1];
//                 if (decimal && decimal.length > casasDecimais) {
//                     value = parseFloat(value).toFixed(casasDecimais);
//                 }
//             }
//             setValor(value);
//         }
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
        
//         try {
//             if (!medida) return;

//             const medidaAtualizada = {
//                 id_medida: medida.id_medida,
//                 valor: Number(valor),
//                 unix_time: new Date(unixTime).getTime(), // Convert to unix timestamp
//                 id_parametro: parseInt(idParametro),
//                 id_da_estacao: parseInt(idEstacao)
//             };

//             console.log("Dados enviados:", medidaAtualizada);

//             const response = await fetchWithAuth(`http://localhost:3000/api/medidas/${medida.id_medida}`, {
//                 method: 'PUT',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(medidaAtualizada),
//             });

//             if (response && !response.error) {
//                 alert('Medida atualizada com sucesso!');
//                 navigate('/medidas');
//             } else {
//                 alert(`Erro ao atualizar medida: ${response.error || 'Verifique os dados'}`);
//             }
//         } catch (error) {
//             console.error("Erro ao conectar com o servidor:", error);
//             alert('Erro ao conectar com o servidor');
//         }
//     };

//     const formatDateTime = (unixTime: string) => {
//         try {
//             const date = new Date(unixTime);
//             if (isNaN(date.getTime())) {
//                 const timestamp = parseInt(unixTime);
//                 return new Date(timestamp).toISOString().slice(0, 16);
//             }
//             return date.toISOString().slice(0, 16);
//         } catch {
//             return '';
//         }
//     };

//     return (
//         <>
//             <Aside />
//             <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg overflow-hidden">
//                 <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
//                     Editar Medida
//                 </div>
//                 <form className="py-4 px-6" onSubmit={handleSubmit}>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 font-bold mb-2">
//                             Valor {casasDecimais !== null && `(${casasDecimais} casas decimais)`}
//                         </label>
//                         <input
//                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                             type="number"
//                             step={casasDecimais !== null ? `0.${'0'.repeat(casasDecimais-1)}1` : 'any'}
//                             value={valor}
//                             onChange={(e) => handleValorChange(e.target.value)}
//                             placeholder="Digite o valor"
//                         />
//                     </div>

//                     <div className="mb-4">
//                         <label className="block text-gray-700 font-bold mb-2">Data e Hora</label>
//                         <input
//                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                             type="datetime-local"
//                             value={formatDateTime(unixTime)}
//                             onChange={(e) => {
//                                 const date = new Date(e.target.value);
//                                 setUnixTime(date.toISOString());
//                             }}
//                         />
//                     </div>

//                     <Select
//                         label="Estação"
//                         value={idEstacao}
//                         onChange={(value) => setIdEstacao(value)}
//                         options={estacoes.map(estacao => ({
//                             id: estacao.id_estacao,
//                             nome: estacao.nome
//                         }))}
//                         placeholder={estacoes.find(e => e.id_estacao === parseInt(idEstacao))?.nome || "Selecione a Estação"}
//                     />

//                     <Select
//                         label="Tipo de Parâmetro"
//                         value={idParametro}
//                         onChange={(value) => {
//                             setIdParametro(value);
//                             const tipoParam = tipoParametros.find(tipo => tipo.id_tipo_param === parseInt(value));
//                             setCasasDecimais(tipoParam?.qtd_casadesc ? parseInt(tipoParam.qtd_casadesc) : null);
//                         }}
//                         options={tipoParametros.map(tipo => ({
//                             id: tipo.id_tipo_param,
//                             nome: tipo.nome
//                         }))}
//                         placeholder={tipoParametros.find(t => t.id_tipo_param === parseInt(idParametro))?.nome || "Selecione o Tipo de Parâmetro"}
//                     />

//                     <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mt-6">
//                         <button className="btn-cadastrar" type="submit">
//                             Salvar
//                         </button>
//                         <button
//                             className="btn-cancelar"
//                             type="button"
//                             onClick={() => navigate('/medidas')}
//                         >
//                             Cancelar
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </>
//     );
// }






import React, { useState, useEffect } from 'react';
import Aside from '../shared/aside/Aside';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchWithAuth } from '../../services/api';
import Medidas from '../../model/Medidas';
import { Select } from '../shared/Select';
import { useMedidas } from '../../hooks/useMedidas';
import { useMedidasContext } from '../../context/MedidasContext';

export default function EditarMedida() {
    const navigate = useNavigate();
    const { idEdicao } = useParams();
    const { estacoes, tipoParametros } = useMedidas();
    const { medidaAtual } = useMedidasContext();
    const [medida, setMedida] = useState<Medidas | null>(null);
    const [valor, setValor] = useState<string>('');
    const [unixTime, setUnixTime] = useState<string>('');
    const [idEstacao, setIdEstacao] = useState<string>('');
    const [idParametro, setIdParametro] = useState<string>('');
    const [casasDecimais, setCasasDecimais] = useState<number | null>(null);

    useEffect(() => {
        // Se temos uma medida no contexto, usamos ela
        if (medidaAtual) {
            setMedida(medidaAtual);
            setValor(medidaAtual.valor?.toString() || '0');
            setIdEstacao(medidaAtual.estacao?.id_estacao.toString() || '');
            setIdParametro(medidaAtual.parametro?.id_parametro.toString() || '');
            
            const timestamp = medidaAtual.unix_time 
                ? (typeof medidaAtual.unix_time === 'number' 
                    ? medidaAtual.unix_time 
                    : Date.parse(medidaAtual.unix_time))
                : Date.now();
            const date = new Date(timestamp);
            setUnixTime(date.toISOString());

            // Configurar casas decimais
            if (medidaAtual.parametro?.id_parametro && tipoParametros.length > 0) {
                const tipoParam = tipoParametros.find(
                    tipo => tipo.id_tipo_param === medidaAtual.parametro?.id_parametro
                );
                if (tipoParam?.qtd_casadesc) {
                    setCasasDecimais(parseInt(tipoParam.qtd_casadesc));
                }
            }
        } else if (idEdicao) {
            // Se não temos medida no contexto, buscamos da API
            fetchMedida();
        }
    }, [medidaAtual, idEdicao, tipoParametros]);

    const fetchMedida = async () => {
        try {
            const data: Medidas = await fetchWithAuth(`http://localhost:3000/api/medidas/${idEdicao}`);
            if (!data || typeof data !== 'object') {
                throw new Error("Dados da medida inválidos ou não encontrados");
            }

            setMedida(data);
            setValor(data.valor?.toString() || '0');
            setIdEstacao(data.estacao?.id_estacao.toString() || '');
            setIdParametro(data.parametro?.id_parametro.toString() || '');
            
            const timestamp = data.unix_time 
                ? (typeof data.unix_time === 'number' 
                    ? data.unix_time 
                    : Date.parse(data.unix_time))
                : Date.now();
            const date = new Date(timestamp);
            setUnixTime(date.toISOString());

            if (data.parametro?.id_parametro && tipoParametros.length > 0) {
                const tipoParam = tipoParametros.find(
                    tipo => tipo.id_tipo_param === data.parametro?.id_parametro
                );
                if (tipoParam?.qtd_casadesc) {
                    setCasasDecimais(parseInt(tipoParam.qtd_casadesc));
                }
            }
        } catch (error) {
            console.error("Erro detalhado:", error);
            alert('Erro ao buscar medida: ' + (error as Error).message);
            navigate('/medidas');
        }
    };

    const handleValorChange = (value: string) => {
        if (value === "" || !isNaN(parseFloat(value))) {
            if (casasDecimais !== null) {
                const decimal = value.split('.')[1];
                if (decimal && decimal.length > casasDecimais) {
                    value = parseFloat(value).toFixed(casasDecimais);
                }
            }
            setValor(value);
        }
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            if (!medida) return;

            const medidaAtualizada = {
                id_medida: medida.id_medida,
                valor: Number(valor),
                unix_time: new Date(unixTime).getTime(), // Convert to unix timestamp
                id_parametro: parseInt(idParametro),
                id_da_estacao: parseInt(idEstacao)
            };

            console.log("Dados enviados:", medidaAtualizada);

            const response = await fetchWithAuth(`http://localhost:3000/api/medidas/${medida.id_medida}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(medidaAtualizada),
            });

            if (response && !response.error) {
                alert('Medida atualizada com sucesso!');
                navigate('/medidas');
            } else {
                alert(`Erro ao atualizar medida: ${response.error || 'Verifique os dados'}`);
            }
        } catch (error) {
            console.error("Erro ao conectar com o servidor:", error);
            alert('Erro ao conectar com o servidor');
        }
    };

    const formatDateTime = (unixTime: string) => {
        try {
            const date = new Date(unixTime);
            if (isNaN(date.getTime())) {
                const timestamp = parseInt(unixTime);
                return new Date(timestamp).toISOString().slice(0, 16);
            }
            return date.toISOString().slice(0, 16);
        } catch {
            return '';
        }
    };

    return (
        <>
            <Aside />
            <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
                    Editar Medida
                </div>
                <form className="py-4 px-6" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            Valor {casasDecimais !== null && `(${casasDecimais} casas decimais)`}
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="number"
                            step={casasDecimais !== null ? `0.${'0'.repeat(casasDecimais-1)}1` : 'any'}
                            value={valor}
                            onChange={(e) => handleValorChange(e.target.value)}
                            placeholder="Digite o valor"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Data e Hora</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="datetime-local"
                            value={formatDateTime(unixTime)}
                            onChange={(e) => {
                                const date = new Date(e.target.value);
                                setUnixTime(date.toISOString());
                            }}
                        />
                    </div>

                    

                    <Select
                        label="Estação"
                        value={idEstacao}
                        onChange={(value) => setIdEstacao(value)}
                        options={estacoes.map(estacao => ({
                            id: estacao.id_estacao,
                            nome: estacao.nome
                        }))}
                        placeholder={"Selecione a Estação"}
                        // placeholder={estacoes.find(e => e.id_estacao === parseInt(idEstacao))?.nome || "Selecione a Estação"}
                    />

                    <Select
                        label="Tipo de Parâmetro"
                        value={idParametro}
                        onChange={(value) => {
                            setIdParametro(value);
                            const tipoParam = tipoParametros.find(tipo => tipo.id_tipo_param === parseInt(value));
                            setCasasDecimais(tipoParam?.qtd_casadesc ? parseInt(tipoParam.qtd_casadesc) : null);
                        }}
                        options={tipoParametros.map(tipo => ({
                            id: tipo.id_tipo_param,
                            nome: tipo.nome
                        }))}
                        placeholder={"Selecione o Tipo de Parâmetro"}
                    />

                    <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mt-6">
                        <button className="btn-cadastrar" type="submit">
                            Salvar
                        </button>
                        <button
                            className="btn-cancelar"
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