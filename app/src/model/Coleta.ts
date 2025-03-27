import Estacao from "./Estacao";
import Parametro from "./Parametro";

export default interface Coleta {
    id: number;
    data_coleta: string;
    estacao: Estacao;
    parametro: Parametro;
  }