import { useState } from "react";

export default function Aside() {
  const [isSideOpen, setIsSideOpen] = useState(false); // Estado para controlar a visibilidade do menu
  const [dropDownEstacao, setDropDownEstacao] = useState(false);
  const [dropDownUsuario, setDropDownUsuario] = useState(false); 
  const [dropDownMedida, setDropDownMedida] = useState(false);
  const [dropDownTp, setDropDownTp] = useState(false);
  const [dropDownP, setDropDownP] = useState(false);
  const [dropDownAlerta, setDropDownAlerta] = useState(false); // Novo estado para Alerta
  const [dropDownAlarme, setdropDownAlarme] = useState(false); // Novo estado para Tipo de Alerta

  // Função para alternar o menu (abrir/fechar)
  const toggleMenu = () => setIsSideOpen(!isSideOpen);

  // Função para fechar o menu
  const closeMenu = () => setIsSideOpen(false);

  // Função para alternar a visibilidade do dropdown
  const toggleDropdown = () => setDropDownEstacao(!dropDownEstacao);
  const toggleDropdownU = () => setDropDownUsuario(!dropDownUsuario);
  const toggleDropdownM = () => setDropDownMedida(!dropDownMedida);
  const toggleDropdownTp = () => setDropDownTp(!dropDownTp);
  const toggleDropdownP = () => setDropDownP(!dropDownP);
  const toggleDropdownAlerta = () => setDropDownAlerta(!dropDownAlerta); // Função para Alerta
  const toggledropDownAlarme = () => setdropDownAlarme(!dropDownAlarme); // Função para Tipo de Alerta

  return (
    <>
      {/* Botão para abrir o menu */}
      {!isSideOpen && (
        <button
          onClick={toggleMenu}
          type="button"
          className="fixed top-4 left-4 z-50 inline-flex items-center p-2 text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-2 hover:bg-gray-700 focus:ring-gray-600"
          aria-controls="sidebar-multi-level-sidebar"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>
      )}

      {/* Sidebar - Responsiva */}
      <aside
        id="sidebar-multi-level-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform transform ${
          isSideOpen ? "translate-x-0" : "-translate-x-full"
        } bg-blue-900 bg-opacity-30`} // Aumentada a transparência para 30%
        aria-label="Sidebar"
      >
        {/* Botão de fechar dentro da sidebar */}
        {isSideOpen && (
          <button
            onClick={closeMenu}
            type="button"
            className="absolute top-4 left-4 text-gray-500 hover:text-gray-300 focus:outline-none"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              ></path>
            </svg>
          </button>
        )}

        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li className="mt-6"> {/* Adicionada margem superior de 2px */}
              <a
                href="/adm"
                onClick={closeMenu} // Fechar o menu ao clicar no link
                className="flex items-center w-full p-2 text-base  transition duration-75 rounded-lg group text-white hover:bg-gray-700"
              >
                
                <span className="ms-3">Coletas</span>
              </a>
            </li>
            <li>
              {/* Botão para alternar o dropdown */}
              <button
                onClick={toggleDropdown} // Alternar a visibilidade do dropdown
                type="button"
                className="flex items-center w-full p-2 text-base  transition duration-75 rounded-lg group text-white hover:bg-gray-700"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Estação
                </span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {/* Exibir o dropdown se o estado `dropDownEstacao` for verdadeiro */}
              <ul
                id="dropdown-example"
                className={`${
                  dropDownEstacao ? "block" : "hidden"
                } py-2 space-y-2`}
              >
                <li>
                  <a
                    href="/cadastroestacao"
                    onClick={closeMenu} // Fechar o menu ao clicar no link
                    className="flex items-center w-full p-2 text-base  transition duration-75 rounded-lg group text-white hover:bg-gray-700"
                  >
                    Cadastrar
                  </a>
                </li>
                <li>
                  <a
                    href="/estacoes"
                    onClick={closeMenu} // Fechar o menu ao clicar no link
                    className="flex items-center w-full p-2 text-base  transition duration-75 rounded-lg group text-white hover:bg-gray-700"
                  >
                    Listar
                  </a>
                </li> 
              </ul>
            </li>
            {/* -------------usuario----------------- */}
            <li>
              <button onClick={toggleDropdownU} type="button"
                className="flex items-center w-full p-2 text-base  transition duration-75 rounded-lg group text-white hover:bg-gray-700"
                aria-controls="dropdown-example" data-collapse-toggle="dropdown-example"
              >
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Usuario
                </span>
                <svg className="w-3 h-3" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none" viewBox="0 0 10 6"
                >
                  <path stroke="currentColor"
                    strokeLinecap="round" strokeLinejoin="round"
                    strokeWidth="2" d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <ul className={`${dropDownUsuario ? "block" : "hidden"} py-2 space-y-2`}>
                <li>
                  <a href="/cadastrousuario" onClick={closeMenu}
                    className="flex items-center w-full p-2 text-base  transition duration-75 rounded-lg group text-white hover:bg-gray-700"
                  >
                    Cadastrar
                  </a>
                </li>
                <li>
                  <a href="/usuarios" onClick={closeMenu}
                    className="flex items-center w-full p-2 text-base  transition duration-75 rounded-lg group text-white hover:bg-gray-700"
                  >
                    Listar
                  </a>
                </li> 
              </ul>
            </li>
            {/* -------------medidas----------------- */}
            <li>
              <button onClick={toggleDropdownM} type="button"
                className="flex items-center w-full p-2 text-base  transition duration-75 rounded-lg group text-white hover:bg-gray-700"
                aria-controls="dropdown-example" data-collapse-toggle="dropdown-example"
              >
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Medidas
                </span>
                <svg className="w-3 h-3" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none" viewBox="0 0 10 6"
                >
                  <path stroke="currentColor"
                    strokeLinecap="round" strokeLinejoin="round"
                    strokeWidth="2" d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <ul className={`${dropDownMedida ? "block" : "hidden"} py-2 space-y-2`}>
                <li>
                  <a href="/cadastromedidas" onClick={closeMenu}
                    className="flex items-center w-full p-2 text-base  transition duration-75 rounded-lg group text-white hover:bg-gray-700"
                  >
                    Cadastrar
                  </a>
                </li>
                <li>
                  <a href="/medidas" onClick={closeMenu}
                    className="flex items-center w-full p-2 text-base  transition duration-75 rounded-lg group text-white hover:bg-gray-700"
                  >
                    Listar
                  </a>
                </li> 
              </ul>
            </li>
            

            {/* -------------Parametro----------------- */}
            <li>
              <button onClick={toggleDropdownP} type="button"
                className="flex items-center w-full p-2 text-base  transition duration-75 rounded-lg group text-white hover:bg-gray-700"
                aria-controls="dropdown-example" data-collapse-toggle="dropdown-example"
              >
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Parametro
                </span>
                <svg className="w-3 h-3" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none" viewBox="0 0 10 6"
                >
                  <path stroke="currentColor"
                    strokeLinecap="round" strokeLinejoin="round"
                    strokeWidth="2" d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <ul className={`${dropDownP ? "block" : "hidden"} py-2 space-y-2`}>
                <li>
                  <a href="/parametros" onClick={closeMenu}
                    className="flex items-center w-full p-2 text-base  transition duration-75 rounded-lg group text-white hover:bg-gray-700"
                  >
                    Listar
                  </a>
                </li> 
              </ul>
            </li>



            {/* -------------Tipo Parametro----------------- */}
            <li>
              <button onClick={toggleDropdownTp} type="button"
                className="flex items-center w-full p-2 text-base transition duration-75 rounded-lg group text-white hover:bg-gray-700"
                aria-controls="dropdown-example" data-collapse-toggle="dropdown-example"
              >
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Tipo de Parametro
                </span>
                <svg className="w-3 h-3" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none" viewBox="0 0 10 6"
                >
                  <path stroke="currentColor"
                    strokeLinecap="round" strokeLinejoin="round"
                    strokeWidth="2" d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <ul className={`${dropDownTp ? "block" : "hidden"} py-2 space-y-2`}>
                <li>
                  <a href="/cadastrotipoparametro" onClick={closeMenu}
                    className="flex items-center w-full p-2 text-base transition duration-75 rounded-lg group text-white hover:bg-gray-700"
                  >
                    Cadastrar
                  </a>
                </li>
                <li>
                <a
                    href="/tipoparametros"
                    onClick={closeMenu}
                    className="flex items-center w-full p-2 text-base transition duration-75 rounded-lg group text-white hover:bg-gray-700"
                  >
                    Listar
                  </a>
                </li> 
              </ul>
            </li>

            {/* Submenu Alerta */}
            <li>
              <button
                onClick={toggleDropdownAlerta}
                type="button"
                className="flex items-center w-full p-2 text-base transition duration-75 rounded-lg group text-white hover:bg-gray-700"
                aria-controls="dropdown-alerta"
                data-collapse-toggle="dropdown-alerta"
              >
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Alerta
                </span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <ul
                id="dropdown-alerta"
                className={`${dropDownAlerta ? "block" : "hidden"} py-2 space-y-2`}
              >
                <li>
                  <a
                    href="/cadastroalerta"
                    onClick={closeMenu}
                    className="flex items-center w-full p-2 text-base transition duration-75 rounded-lg group text-white hover:bg-gray-700"
                  >
                    Cadastrar
                  </a>
                </li>
                <li>
                  <a
                    href="/alertas"
                    onClick={closeMenu}
                    className="flex items-center w-full p-2 text-base transition duration-75 rounded-lg group text-white hover:bg-gray-700"
                  >
                    Listar
                  </a>
                </li>
              </ul>
            </li>

            {/* Submenu Alarme */}
            <li>
              <button
                onClick={toggledropDownAlarme}
                type="button"
                className="flex items-center w-full p-2 text-base transition duration-75 rounded-lg group text-white hover:bg-gray-700"
                aria-controls="dropdown-alarme"
                data-collapse-toggle="dropdown-alarme"
              >
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Alarme
                </span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <ul
                id="dropdown-alarme"
                className={`${dropDownAlarme ? "block" : "hidden"} py-2 space-y-2`}
              >
                <li>
                  <a
                    href="/alarmes"
                    onClick={closeMenu}
                    className="flex items-center w-full p-2 text-base transition duration-75 rounded-lg group text-white hover:bg-gray-700"
                  >
                    Listar
                  </a>
                </li>
              </ul>
            </li>

          </ul>
        </div>
      </aside>
    </>
  );
}