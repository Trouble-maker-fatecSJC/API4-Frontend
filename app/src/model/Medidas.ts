// export default interface Medidas {
// 	id_medida: number;
// 	valor: number;
//   unix_time: number;
//   // Relacionamentos com chaves estrangeiras
//   id_parametro: number;  // Referência ao parâmetro
//   id_da_estacao: number;  // Referência à estação
// }


export default interface Medidas {
  id_medida: number;
  valor: number;
  unix_time: string;
  estacao?: {
    id_estacao: number;
    nome: string;
    // other estacao properties
  };
  parametro?: {
    id_parametro: number;
    // other parametro properties
  };
}