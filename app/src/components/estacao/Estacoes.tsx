import { useState, useEffect } from "react";
import DetalheEstacao from "./DetalheEstacao"; // Importando o componente de detalhes
import Estacao from "../../model/Estacao";
import Aside from "../shared/aside/Aside";
import Container from "../shared/Container";
import "./style.css";

export default function Estacoes() {
 
  const [estacoes, setEstacoes] = useState<Estacao[]>([]);
  const [estacaoSelecionada, setEstacaoSelecionada] = useState<Estacao | null>(
    null
  );

  useEffect(() => {
    // Função para buscar as estações da API
    const fetchEstacoes = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/estacoes"); // URL para buscar as estações
        if (response.ok) {
          const data = await response.json();
          setEstacoes(data);
        } else {
          alert("Erro ao carregar as estações");
        }
      } catch (error) {
        console.error("Erro ao buscar as estações:", error);
        alert("Erro ao conectar com o servidor");
      }
    };

    fetchEstacoes();
  }, []); // O array vazio indica que a requisição será feita apenas uma vez, na montagem do componente

  const mostrarDetalhes = (estacao: Estacao) => {
    setEstacaoSelecionada(estacao);
    console.log("pagina estacoes",estacao);
    
  };
  
  // Função para fechar os detalhes
  const fecharDetalhes = () => {
    setEstacaoSelecionada(null);
  };

  // Função para deletar uma estação
  const deletarEstacao = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/estacoes/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setEstacoes(estacoes.filter((estacao) => estacao.id_estacao !== id));
        alert("Estação deletada com sucesso");
      } else {
        alert("Erro ao deletar a estação");
      }
    } catch (error) {
      console.error("Erro ao deletar a estação:", error);
      alert("Erro ao conectar com o servidor");
    }
  };

  return (
    <>
      <Aside />
      <Container className="ajuste-margem">
      <div className="flex sm:flex-row gap-4  items-center flex-col flex-wrap h-full">
        {estacoes.map((estacao) => (
          <div
            key={estacao.id_estacao}
            className="relative bg-gray-900 block py-4 px-6 border border-gray-100 rounded-lg min-w-[340px] min-h-[220px] mt-4"
          >
            <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-green-500 to-green-600"></span>

            <div className="my-4">
           
              <h2 className="text-white text-2xl font-bold pb-2">
                {estacao.nome}
              </h2>
              <p className="text-gray-300 py-1">Latitude: {estacao.latitude}</p>
              <p className="text-gray-300 py-1">
                Longitude: {estacao.longitude}
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => mostrarDetalhes(estacao)}
                className="btn-detalhe"
              >
                Detalhe
              </button>
            </div>
          </div>
        ))}

        {/* Se houver uma estação selecionada, exibe o componente de detalhes */}
        {estacaoSelecionada && (
          <DetalheEstacao
              estacao={estacaoSelecionada}
              onClose={fecharDetalhes}
              onDeleteEstacao={deletarEstacao} // Passando a função de deletar como prop
              onEditEstacao={function (): void {
                throw new Error("Function not implemented.");
              } }          />
        )}
      </div>
      </Container>
      
    </>
  );
}
