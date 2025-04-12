export default interface Parametro {
    id_parametro?: number;
    
    // Relacionamentos com chaves estrangeiras
    id_tipo_parametro: number;  // Referência ao tipo de parâmetro
}

