import { useState, useEffect } from "react";
import Parametro from "../../model/Parametro";
import TipoParametro from "../../model/TipoParametros"; // Import TipoParametro model
import { ChevronDown, ChevronUp } from "lucide-react";
import { fetchWithAuth } from "../../services/api";
import Aside from "../shared/aside/Aside";

export default function Parametros() {
  const [parametros, setParametros] = useState<Parametro[]>([]);
  const [tipoParametros, setTipoParametros] = useState<TipoParametro[]>([]); // State for TipoParametros
  const [expandido, setExpandido] = useState<number | null>(null);

  useEffect(() => {
    const fetchParametros = async () => {
      try {
        const data: Parametro[] = await fetchWithAuth("http://localhost:3000/api/parametro");
        setParametros(data);
      } catch (error) {
        console.error("Erro ao buscar parâmetros:", error);
      }
    };

    const fetchTipoParametros = async () => {
      try {
        const data: TipoParametro[] = await fetchWithAuth("http://localhost:3000/api/tipoparametro");
        setTipoParametros(data);
      } catch (error) {
        console.error("Erro ao buscar tipos de parâmetros:", error);
      }
    };

    fetchParametros();
    fetchTipoParametros();
  }, []);



  const getTipoParametroById = (id: number) => {
    return tipoParametros.find((tipo) => tipo.id_tipo_param === id);
  };

  return (
    <>
      <Aside />
      <div style={{ maxWidth: "600px", margin: "20px auto", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h2>Lista de Parâmetros</h2>
        {parametros.map((parametro) => {
          const tipoParametro = getTipoParametroById(parametro.tipoParametro.id_tipo_param);
          return (
            <div key={parametro.id_parametro} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ddd", borderRadius: "6px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", cursor: "pointer" }} 
                   onClick={() => setExpandido(expandido === parametro.id_parametro! ? null : parametro.id_parametro!)}>
                <h3>ID Parâmetro: {parametro.id_parametro}</h3>
                <h3>ID Tipo Parâmetro: {parametro.tipoParametro.id_tipo_param}</h3>
                {expandido === parametro.id_parametro! ? <ChevronUp /> : <ChevronDown />}
              </div>
              {expandido === parametro.id_parametro! && tipoParametro?.id_tipo_param && (
                <div style={{ marginTop: "10px", paddingLeft: "10px" }}>
                  <p><strong>Json Param:</strong> {tipoParametro.json_param}</p>
                  <p><strong>Nome:</strong> {tipoParametro.nome}</p>
                  <p><strong>Unidade:</strong> {tipoParametro.unidade}</p>
                  <p><strong>Offset:</strong> {tipoParametro.offset}</p>
                  <p><strong>Quantidade de Casas Decimais:</strong> {tipoParametro.qtd_casadesc}</p>
                  <p><strong>Fator:</strong> {tipoParametro.fator}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
