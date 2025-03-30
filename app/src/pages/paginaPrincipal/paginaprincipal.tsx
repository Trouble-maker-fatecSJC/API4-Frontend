import Aside from "../../components/shared/aside/Aside";

export default function PaginaPrincipal() {
  return (
    <div className="flex bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Aside />
      <div className="flex-1 flex flex-col p-6" style={{ marginLeft: "40px" }}>
        <header className="mb-6">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Bem-vindo de volta!
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mt-2">
            Aqui você pode monitorar e gerenciar os dados da estação meteorológica.
          </p>
        </header>

        <main className="flex flex-col gap-6">
          <section className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Sobre o Sistema</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Este sistema foi desenvolvido para monitorar e gerenciar os dados coletados por estações meteorológicas.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
