export default interface Parametro {
    id_parametro?: number;
    velocidade_vento: number;
    direcao_vento: number;
    temperatura: number;
    umidade: number;
    chuva: number;
  
    // Relacionamentos com chaves estrangeiras
    cpf_usuario: string;  // Referência ao usuário
    id_tipo_parametro: number;  // Referência ao tipo de parâmetro
    id_estacao: number;  // Referência à estação
    id_medida: number;  // Referência às medidas
}
