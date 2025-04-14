import { useState, useEffect } from 'react';
import { fetchWithAuth } from '../services/api';
import Estacao from '../model/Estacao';
import TipoParametro from '../model/TipoParametros';

export function useMedidas() {
  const [valor, setValor] = useState<string>("");
  const [unixTime, setUnixTime] = useState("");
  const [idEstacao, setIdEstacao] = useState<string>("");
  const [idParametro, setIdParametro] = useState<string>("");
  const [estacoes, setEstacoes] = useState<Estacao[]>([]);
  const [tipoParametros, setTipoParametros] = useState<TipoParametro[]>([]);
  const [casasDecimais, setCasasDecimais] = useState<number | null>(null);
  

  const fetchInitialData = async () => {
    try {
      const [dataEstacoes, dataTipoParametros] = await Promise.all([
        fetchWithAuth("http://localhost:3000/api/estacoes"),
        fetchWithAuth("http://localhost:3000/api/tipoparametro")
      ]);
      
      setEstacoes(dataEstacoes);
      setTipoParametros(dataTipoParametros);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  const cadastrarMedida = async () => {
    try {
      if (!valor || isNaN(parseFloat(valor))) {
        throw new Error("Valor inválido");
      }

      // Fixed timestamp conversion
      const timestamp: number = !isNaN(Number(unixTime)) 
        ? Number(unixTime) * (unixTime.length === 10 ? 1000 : 1)
        : Date.parse(unixTime);

      if (isNaN(timestamp)) {
        throw new Error("Data inválida");
      }

      const dateObject = new Date(timestamp);
      
      const estacaoData = await fetchWithAuth(`http://localhost:3000/api/estacoes/${idEstacao}`);
      
      const medida = {
        valor: Number(valor),
        unix_time: dateObject.toISOString(),
        estacao: estacaoData,
        parametro: {
          id_parametro: parseInt(idParametro)
        }
      };

      const response = await fetchWithAuth("http://localhost:3000/api/medidas", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(medida),
      });

      // Removido o response.json() já que fetchWithAuth já retorna os dados processados
      if (response && response.success) {
        return true;
      } else {
        console.error("Erro na resposta:", response);
        return false;
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      return false;
    }
  };

  const limparCampos = () => {
    setValor("");
    setUnixTime("");
    setIdEstacao("");
    setIdParametro("");
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleTipoParametroChange = async (value: string) => {
    setIdParametro(value);
    if (value) {
      const tipoParam = tipoParametros.find(tipo => tipo.id_tipo_param === parseInt(value));
      setCasasDecimais(tipoParam?.qtd_casadesc ? parseInt(tipoParam.qtd_casadesc) : null);
    } else {
      setCasasDecimais(null);
    }
  };

  // Validar e formatar o valor de acordo com as casas decimais
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
  return {
    valor,
    setValor,
    unixTime,
    setUnixTime,
    idEstacao,
    setIdEstacao,
    idParametro,
    setIdParametro,
    estacoes,
    tipoParametros,
    cadastrarMedida,
    limparCampos,
    handleTipoParametroChange,
    handleValorChange,
    casasDecimais
  };
}