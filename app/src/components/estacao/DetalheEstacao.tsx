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
      </div>
    </div>
  );
}
