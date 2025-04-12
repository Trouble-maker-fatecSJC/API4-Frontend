import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { fetchWithAuth } from "../../services/api";
import Aside from "../shared/aside/Aside";
import Alarme from "../../model/Alarme";


export default function AlarmeList() {
  const [alarmes, setAlarmes] = useState<Alarme[]>([]);
  const [expandido, setExpandido] = useState<number | null>(null);

  useEffect(() => {
    const fetchAlarmes = async () => {
      try {
        const data: Alarme[] = await fetchWithAuth("http://localhost:3000/api/alarme");
        setAlarmes(data);
      } catch (error) {
        console.error("Erro ao buscar alarmes:", error);
      }
    };

    fetchAlarmes();
  }, []);

  return (
    <>
      <Aside />
      <div style={{ maxWidth: "600px", margin: "20px auto", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h2>Lista de Alarmes</h2>
        {alarmes.map((alarme) => (
          <div key={alarme.id_alarme} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ddd", borderRadius: "6px" }}>
            <div
              style={{ display: "flex", justifyContent: "space-between", cursor: "pointer" }}
              onClick={() => setExpandido(expandido === alarme.id_alarme ? null : alarme.id_alarme)}
            >
              <h3>ID Alarme: {alarme.id_alarme} | ID Alerta: {alarme.alerta.id_alerta}</h3>
              {expandido === alarme.id_alarme ? <ChevronUp /> : <ChevronDown />}
            </div>
            {expandido === alarme.id_alarme && (
              <div style={{ marginTop: "10px", paddingLeft: "10px" }}>
                <p><strong>Data do Alarme:</strong> {new Date(alarme.data_alarme).toLocaleString()}</p>
                <p><strong>ID da Medida:</strong> {alarme.medida?.id_medida || "Não disponivel"}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}



