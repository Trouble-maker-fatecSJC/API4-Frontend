import { useState } from "react";
import Estacao from "../../model/Estacao";
import { useNavigate } from "react-router";
import { fetchWithAuth } from "../../services/api";

interface DetalheEstacaoProps {
  estacao: Estacao;
  onClose: () => void; // Função de fechamento
  onDeleteEstacao: (id: number) => void;
  onEditEstacao: (id: number) => void;
}

export default function DetalheEstacao({
  estacao,
  onClose,
  onDeleteEstacao,
}: DetalheEstacaoProps) {
  console.log('estacao em detalhe: ',estacao.id_estacao);
  
  const navigate = useNavigate();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleDeleteEstacao = async () => {
    try {
      await fetchWithAuth(`http://localhost:3000/api/estacoes/${estacao.id_estacao}`, {
        method: "DELETE",
      });
      onDeleteEstacao(estacao.id_estacao);
    } catch (error) {
      console.error("Erro ao deletar estação:", error);
    }
    setDeleteModalOpen(false);
  };

  const handleEditar = () => {
    navigate(`/editarestacao/${estacao.id_estacao}`, { state: { estacao } });
  };

  return (
    <div
      className="overflow-y-auto overflow-x-hidden  top-0 right-0 left-0 z-50 
    items-center justify-center flex-col max-w-md mx-5 md:mx-auto mt-16 bg-white rounded-lg overflow-hidden shadow-2xl "
    >
      <div className="relative text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase ">
        <button
          onClick={onClose}
          className="absolute top-0 right-1 btn-close p-1"
        >
          {/* Ícone de fechar */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
        Detalhes da Estação
      </div>

      <div className="py-4 px-6">
        {/* Informações da Estação */}
        <div className="mb-4">
          <h2 className="text-gray-700 font-bold mb-2">Nome:</h2>
          <p>{estacao.nome}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-gray-700 font-bold mb-2">Endereço:</h2>
          <p>{estacao.endereco}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-gray-700 font-bold mb-2">Latitude:</h2>
          <p>{estacao.latitude}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-gray-700 font-bold mb-2">Longitude:</h2>
          <p>{estacao.longitude}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-gray-700 font-bold mb-2">Data de Instalação:</h2>
          <p>{new Date(estacao.data_instalacao).toLocaleDateString()}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-gray-700 font-bold mb-2">Indicativo Ativa:</h2>
          <p>{estacao.status ? "Ativa" : "Inativa"}</p>
        </div>

        <div className="mb-4 flex justify-center gap-4">
          <button
            className="btn-editar"
            onClick={handleEditar}
          >
            Editar
          </button>

          <button className="btn-delete" onClick={handleDeleteClick}>
            Deletar
          </button>
        </div>
      </div>

      {/* Modal de Confirmação de Deleção */}
      {isDeleteModalOpen && (
        <div className="fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4">
          <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md">
            <div className="flex justify-end p-2">
              <button
                onClick={handleCloseDeleteModal}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="p-6 pt-0 text-center">
              <svg
                className="w-20 h-20 text-red-600 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">
                Tem certeza de que deseja deletar esta estação?
              </h3>
              <button
                onClick={handleDeleteEstacao}
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2"
              >
                Sim, tenho certeza
              </button>
              <button
                onClick={handleCloseDeleteModal}
                className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
              >
                Não, cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
