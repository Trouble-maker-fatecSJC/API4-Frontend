import React from 'react';

interface Estacao {
  nome: string;
  latitude: number;
  longitude: number;
  endereco: string;
  parametros: string[];
}

export default function DetalheEstacao({ estacao }: { estacao: Estacao }) {
  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
      
      
      
      <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
      <div className="w-20 mx-auto">
          <button  className="rounded-lg text-gray-700 transition-all hover:bg-gray-100 bg-gray-200 p-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div>
        Detalhes da Estação
        
      </div>

      <div className="py-4 px-6">
        <div className="mb-4">
          <h2 className="text-gray-700 font-bold mb-2">Nome:</h2>
          <p>{estacao.nome}</p>
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
          <h2 className="text-gray-700 font-bold mb-2">Endereço:</h2>
          <p>{estacao.endereco}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-gray-700 font-bold mb-2">Parâmetros:</h2>
          <ul>
            {estacao.parametros.map((parametro, index) => (
              <li key={index}>{parametro}</li>
            ))}
          </ul>
        </div>
        <div className="mb-4 flex justify-center gap-4">
          <button className="btn-editar">
            Editar
          </button>
          <button className="btn-delete">
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
}
