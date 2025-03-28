import { useState } from "react";

export default function Aside() {
  const [isSideOpen, setIsSideOpen] = useState(false); // Estado para controlar a visibilidade do menu
  const [dropDownEstacao, setDropDownEstacao] = useState(false);
  const [dropDownUsuario, setDropDownUsuario] = useState(false); 
  const [dropDownMedida, setDropDownMedida] = useState(false);
  const [dropDownTp, setDropDownTp] = useState(false);
  const [dropDownP, setDropDownP] = useState(false);

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

  return (
    <>
      {/* Botão para abrir o menu em dispositivos pequenos */}
      <button
        onClick={toggleMenu} // Alternar entre abrir e fechar
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 
        rounded-lg sm:hidden  focus:outline-none focus:ring-2   hover:bg-gray-700 focus:ring-gray-600"
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

      {/* Sidebar - Responsiva */}
      <aside
        id="sidebar-multi-level-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform transform ${
          isSideOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`} // Sidebar visível sempre em telas grandes
        aria-label="Sidebar"
      >
        {/* Botão de fechar dentro da sidebar - Visível somente em telas pequenas */}
        <button
          onClick={closeMenu} // Fechar o menu
          type="button"
          className="absolute top-4 right-4 text-gray-500 hover:bg-gray-700  sm:hidden"
        >
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
              d="M6.293 4.293a1 1 0 0 1 1.414 0L10 6.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 8l2.293 2.293a1 1 0 0 1-1.414 1.414L10 9.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 8 6.293 5.707a1 1 0 0 1 0-1.414z"
            ></path>
          </svg>
        </button>

        <div className="h-full px-3 py-4 overflow-y-auto  bg-gray-800 b-shadow">
          <ul className="space-y-2 font-medium">
            <li>
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
                  <a href="/cadastroparametro" onClick={closeMenu}
                    className="flex items-center w-full p-2 text-base  transition duration-75 rounded-lg group text-white hover:bg-gray-700"
                  >
                    Cadastrar
                  </a>
                </li>
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
                className="flex items-center w-full p-2 text-base  transition duration-75 rounded-lg group text-white hover:bg-gray-700"
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
                    className="flex items-center w-full p-2 text-base  transition duration-75 rounded-lg group text-white hover:bg-gray-700"
                  >
                    Cadastrar
                  </a>
                </li>
                <li>
                  <a href="/tipoparametro" onClick={closeMenu}
                    className="flex items-center w-full p-2 text-base  transition duration-75 rounded-lg group text-white hover:bg-gray-700"
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








{/* <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Sign In</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                                    <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                                    <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Sign Up</span>
                            </a>
                        </li>
                    </ul> */}