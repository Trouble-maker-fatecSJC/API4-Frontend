// import MedidorVento from "../../assets/medidor-vento.png";
// import Container from "../../components/shared/Container";
// import Header from "../../components/shared/header/Header";


// export default function Home() {
//   return (
//     <>
//     <Container>
//         <Header />
//         <section className="w-full mx-auto py-10 bg-gray-50 dark:bg-gray-900 dark:text-white">
//             {/* <!-- Title --> */}
//             <div
//                 className="w-fit pb-1 px-2 mx-4 rounded-md text-2xl font-semibold border-b-2 border-blue-600 dark:border-b-2 dark:border-yellow-600">
//                 Sensores
//             </div>
//                       {/* ----  Esquerda ---- */}
//             <div className="w-full h-full flex flex-col items-center md:py-4 py-10">
                
//                 <div className="xl:w-[80%] sm:w-[85%] w-[90%] mx-auto flex md:flex-row flex-col lg:gap-4 gap-2 
//                     justify-center lg:items-stretch md:items-center mt-4">
                
//                     <img className="md:w-[50%] w-full md:rounded-t-lg rounded-sm" 
//                         src={MedidorVento} alt="billboard image" />

//                     <div className="md:w-[50%] w-full bg-gray-100 dark:bg-gray-900 dark:text-gray-400 md:p-4 p-0 rounded-md">
//                         <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Lorem ipsum dolor sit amet consectetur</h2>
//                         <p className="text-md mt-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore placeat assumenda nam
//                         veritatis, magni doloremque pariatur quos fugit ipsa id voluptatibus deleniti officiis cum ratione eligendi
//                         sed necessitatibus aliquam error laborum delectus quaerat. Delectus hic error eligendi sed repellat natus fuga
//                         nobis tempora possimus ullam!</p>
//                     </div>

//                 </div>
                
//                 {/* ----  Direita ---- */}
//                 <div className="xl:w-[80%] sm:w-[85%] w-[90%] mx-auto flex md:flex-row flex-col flex-col-reverse 
//                     lg:gap-4 gap-2 justify-center lg:items-stretch md:items-center mt-6">
                
//                     <div className="md:w-[50%] w-full bg-gray-100 dark:bg-gray-900 dark:text-gray-400 md:p-4 p-0 rounded-md">
//                         <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
//                             Lorem ipsum dolor sit amet consectetur
//                         </h2>

//                         <p className="text-md mt-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore placeat assumenda nam
//                         veritatis, magni doloremque pariatur quos fugit ipsa id voluptatibus deleniti officiis cum ratione eligendi
//                         sed necessitatibus aliquam error laborum delectus quaerat. Delectus hic error eligendi sed repellat natus fuga
//                         nobis tempora possimus ullam!
//                         </p>
//                     </div>
                    
//                     <img className="md:w-[50%] w-full md:rounded-t-lg rounded-sm" 
//                     src={MedidorVento} alt="" />

//                 </div>

//                     {/* ----  Esquerda ---- */}
//                 <div className="xl:w-[80%] sm:w-[85%] w-[90%] mx-auto flex md:flex-row flex-col lg:gap-4 gap-2 
//                     justify-center lg:items-stretch md:items-center mt-4">
                
//                     <img className="md:w-[50%] w-full md:rounded-t-lg rounded-sm" 
//                         src={MedidorVento} alt="" />

//                     <div className="md:w-[50%] w-full bg-gray-100 dark:bg-gray-900 dark:text-gray-400 md:p-4 p-0 rounded-md">
//                         <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Lorem ipsum dolor sit amet consectetur</h2>
//                         <p className="text-md mt-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore placeat assumenda nam
//                         veritatis, magni doloremque pariatur quos fugit ipsa id voluptatibus deleniti officiis cum ratione eligendi
//                         sed necessitatibus aliquam error laborum delectus quaerat. Delectus hic error eligendi sed repellat natus fuga
//                         nobis tempora possimus ullam!</p>
//                     </div>

//                 </div>

//                 {/* ----  Direita ---- */}
//                 <div className="xl:w-[80%] sm:w-[85%] w-[90%] mx-auto flex md:flex-row flex-col flex-col-reverse 
//                     lg:gap-4 gap-2 justify-center lg:items-stretch md:items-center mt-6">
                
//                     <div className="md:w-[50%] w-full bg-gray-100 dark:bg-gray-900 dark:text-gray-400 md:p-4 p-0 rounded-md">
//                         <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
//                             Lorem ipsum dolor sit amet consectetur
//                         </h2>

//                         <p className="text-md mt-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore placeat assumenda nam
//                         veritatis, magni doloremque pariatur quos fugit ipsa id voluptatibus deleniti officiis cum ratione eligendi
//                         sed necessitatibus aliquam error laborum delectus quaerat. Delectus hic error eligendi sed repellat natus fuga
//                         nobis tempora possimus ullam!
//                         </p>
//                     </div>
                    
//                     <img className="sm:w-[50%] md:w-[50%] md:rounded-t-lg rounded-sm" 
//                     src={MedidorVento} alt="billboard image" />

//                 </div>

//             </div>
//         </section>
//         </Container>

//         </>
//   );
// }

// New responsive layout
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-6">
        Seja bem-vindo ao sistema de coleta e tratamento de dados criado pela Trouble Maker
      </h1>
      <button
        onClick={() => navigate("/login")}
        className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Login
      </button>
    </div>
  );
}