import React from 'react';
import Aside from "../shared/aside/Aside";
import Estacoes from "../estacao/Estacoes";
import Parametros from "../parametros/Parametro";

const UsuarioPage: React.FC = () => {
  return (
    <div className="flex bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Aside />
      <div className="flex-1 flex flex-col p-6" style={{ marginLeft: "40px" }}>
        <header className="mb-6">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Área do Usuário
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mt-2">
            Bem-vindo! Aqui você pode visualizar as estações e parâmetros cadastrados.
          </p>
        </header>

        <main className="space-y-8">
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Estações Cadastradas
            </h2>
            <Estacoes />
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Parâmetros Cadastrados
            </h2>
            <Parametros />
          </section>
        </main>
      </div>
    </div>
  );
};

export default UsuarioPage;
