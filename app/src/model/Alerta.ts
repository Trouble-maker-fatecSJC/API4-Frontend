export default interface Alerta {
    id_alerta: number;
    nome: string;
    conteudo: string;
    // Relacionamentos com chaves estrangeiras

    id_parametro: number;  // Referência ao parâmetro
     
}