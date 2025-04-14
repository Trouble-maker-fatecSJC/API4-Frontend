import { useState, useEffect } from 'react';
import { fetchWithAuth } from '../services/api';
import Medidas from '../model/Medidas';
import TipoParametro from '../model/TipoParametros';


export function useExibirMedidas() {
  const [medidas, setMedidas] = useState<Medidas[]>([]);
  const [tipoParametros, setTipoParametros] = useState<Map<number, TipoParametro>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMedidasData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Buscar medidas
      const medidasData: Medidas[] = await fetchWithAuth("http://localhost:3000/api/medidas");
      
      // Buscar informações de todos os parâmetros únicos
      const parametrosIds = medidasData
        .map(m => m.parametro?.id_parametro)
        .filter((id): id is number => id !== undefined);

      const uniqueParametrosIds = [...new Set(parametrosIds)];
      const paramMap = new Map<number, TipoParametro>();
      
      await Promise.all(uniqueParametrosIds.map(async (id) => {
        try {
          const paramInfo = await fetchWithAuth(`http://localhost:3000/api/parametro/${id}`);
          if (paramInfo?.tipoParametro) {
            paramMap.set(id, paramInfo.tipoParametro);
          }
        } catch (err) {
          console.error(`Erro ao buscar parâmetro ${id}:`, err);
        }
      }));

      setTipoParametros(paramMap);
      setMedidas(medidasData);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao carregar medidas';
      setError(errorMessage);
      console.error("Erro ao buscar medidas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDateTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        throw new Error('Data inválida');
      }
      
      return date.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Data inválida';
    }
  };

  const getParametroInfo = (idParametro?: number) => {
    if (!idParametro) return null;
    return tipoParametros.get(idParametro);
  };

  useEffect(() => {
    fetchMedidasData();
  }, []);

  const recarregarMedidas = () => {
    fetchMedidasData();
  };

  return {
    medidas,
    isLoading,
    error,
    tipoParametros,
    formatDateTime,
    getParametroInfo,
    recarregarMedidas
  };
}