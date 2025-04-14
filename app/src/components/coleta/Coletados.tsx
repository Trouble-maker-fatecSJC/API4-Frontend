import { Medida } from '../../model/Medidas';
import { Estacao } from '../../model/Estacao';
import { Parametro } from '../../model/Parametro ';

interface Coleta {
  id: number;
  data_coleta: string;
  estacao: Estacao;
  medida: {
    id_medida: number;
    valor: number;
    parametro: {
      id_parametro: number;
      nome: string;
      unidade: string;
    };
  };
}

interface ColetadosProps {
  coletas: Coleta[];
  onClose: () => void;
}

export default function Coletados({ coletas, onClose }: ColetadosProps) {
  console.log('Coletas recebidas:', coletas);
  
return (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
      <h2 className="text-2xl font-bold mb-4">Coletas {coletas[0]?.estacao?.nome}</h2>
      
      {coletas.map((coleta) => (
        <div key={coleta.id} className="box-coleta flex-col gap-2 w-full">
          <div className="w-full flex-col py-2 align-middle">
            <div className="ml-1 flex">Data: {new Date(coleta.data_coleta).toLocaleString()}</div>
            <div className="">
              {coleta?.medida?.valor !== 0 && (
                <div className="mb-4">
                  <h2 className="text-gray-700 font-bold mb-2">
                    {coleta.medida?.parametro?.nome}: {coleta.medida?.valor} {coleta.medida?.parametro?.unidade}
                  </h2>
                </div>
              )}
            </div>
          </div>
          <h3 className="flex items-center w-full">
            <span className="flex-grow bg-gray-200 rounded h-1"></span>
            <span className="flex-grow bg-gray-200 rounded h-1"></span>
          </h3>
        </div>
      ))}

      <button onClick={onClose} className="btn-cancelar mt-4">
        Fechar
      </button>
    </div>
  </div>
);
}