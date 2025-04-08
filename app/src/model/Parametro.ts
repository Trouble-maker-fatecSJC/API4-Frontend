export default interface Parametro {
    id_parametro?: number;
    
    // Relacionamentos com chaves estrangeiras
    tipo_parametro: number;  // Referência ao tipo de parâmetro
    id_da_estacao: number;  // Referência à estação
}

