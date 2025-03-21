import { NavLinks } from "./NavLinks"
import { useState } from "react";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false); // initiate isNavOpen state with false

  const closeMenu = () => setIsNavOpen(false);

  return (
    <div className="flex items-center justify-between py-8 h-16">
      
      <nav>
        <section className="MOBILE-MENU flex lg:hidden">
          <div
            className="HAMBURGER-ICON space-y-2"
            onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click
          >
            <span className="block h-0.5 w-8 animate-pulse bg-blue-800"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-blue-800"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-blue-800"></span>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}> 
            <div
              className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
              onClick={closeMenu} // change isNavOpen state to false to close the menu
            >
              <svg
                className="h-8 w-8 text-blue-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px]">
              <li className="border-b border-blue-400 my-8 uppercase text-blue-900 font-bold">
                <NavLinks href="/adm" onClick={closeMenu}>Home</NavLinks>
              </li>
              <li className="border-b border-blue-400 my-8 uppercase text-blue-900 font-bold">
                <NavLinks href="/estacoes" onClick={closeMenu}>Estacoes</NavLinks>
              </li>
              <li className="border-b border-blue-400 my-8 uppercase text-blue-900 font-bold">
                <NavLinks href="/cadastroestacao" onClick={closeMenu}>Cadastro Estacoes</NavLinks>
              </li>
              <li className="border-b border-blue-400 my-8 uppercase text-blue-900 font-bold">
                <NavLinks href="/hobbies" onClick={closeMenu}>Hobbies</NavLinks>
              </li>
            </ul>
          </div>
        </section>

        <ul className="DESKTOP-MENU hidden space-x-8 lg:flex">
          <li className="border-b border-blue-400 my-8 uppercase text-blue-900 font-bold">
            <NavLinks href="/">Home</NavLinks>
          </li>
          <li className="border-b border-blue-400 my-8 uppercase text-blue-900 font-bold">
            <NavLinks href="/cadastrestacao">Cadastro Estacao</NavLinks>
          </li>
          <li className="border-b border-blue-400 my-8 uppercase text-blue-900 font-bold">
            <NavLinks href="/estacoes">Estacoes</NavLinks>
          </li>
          
        </ul>
      </nav>
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: linear-gradient(to top, 
        rgba(245, 246, 252, 0.8),
        rgba(86, 201, 255, 0.8) );
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>

    </div>
  );
}