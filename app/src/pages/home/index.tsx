import MedidorVento from "../../assets/medidor-vento.png";


export default function Home() {
  return (
        <section className="w-full mx-auto py-10 bg-gray-50 dark:bg-gray-900 dark:text-white">
            {/* <!-- Title --> */}
            <div
                className="w-fit pb-1 px-2 mx-4 rounded-md text-2xl font-semibold border-b-2 border-blue-600 dark:border-b-2 dark:border-yellow-600">
                Sensores
            </div>
                      {/* ----  Esquerda ---- */}
            <div className="w-full h-full flex flex-col items-center md:py-4 py-10">
                
                <div className="xl:w-[80%] sm:w-[85%] w-[90%] mx-auto flex md:flex-row flex-col lg:gap-4 gap-2 
                    justify-center lg:items-stretch md:items-center mt-4">
                
                    <img className="md:w-[50%] w-full md:rounded-t-lg rounded-sm" 
                        src={MedidorVento} alt="billboard image" />

                    <div className="md:w-[50%] w-full bg-gray-100 dark:bg-gray-900 dark:text-gray-400 md:p-4 p-0 rounded-md">
                        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Lorem ipsum dolor sit amet consectetur</h2>
                        <p className="text-md mt-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore placeat assumenda nam
                        veritatis, magni doloremque pariatur quos fugit ipsa id voluptatibus deleniti officiis cum ratione eligendi
                        sed necessitatibus aliquam error laborum delectus quaerat. Delectus hic error eligendi sed repellat natus fuga
                        nobis tempora possimus ullam!</p>
                    </div>

                </div>
                
                {/* ----  Direita ---- */}
                <div className="xl:w-[80%] sm:w-[85%] w-[90%] mx-auto flex md:flex-row flex-col flex-col-reverse 
                    lg:gap-4 gap-2 justify-center lg:items-stretch md:items-center mt-6">
                
                    <div className="md:w-[50%] w-full bg-gray-100 dark:bg-gray-900 dark:text-gray-400 md:p-4 p-0 rounded-md">
                        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
                            Lorem ipsum dolor sit amet consectetur
                        </h2>

                        <p className="text-md mt-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore placeat assumenda nam
                        veritatis, magni doloremque pariatur quos fugit ipsa id voluptatibus deleniti officiis cum ratione eligendi
                        sed necessitatibus aliquam error laborum delectus quaerat. Delectus hic error eligendi sed repellat natus fuga
                        nobis tempora possimus ullam!
                        </p>
                    </div>
                    
                    <img className="md:w-[50%] w-full md:rounded-t-lg rounded-sm" 
                    src={MedidorVento} alt="" />

                </div>

                    {/* ----  Esquerda ---- */}
                <div className="xl:w-[80%] sm:w-[85%] w-[90%] mx-auto flex md:flex-row flex-col lg:gap-4 gap-2 
                    justify-center lg:items-stretch md:items-center mt-4">
                
                    <img className="md:w-[50%] w-full md:rounded-t-lg rounded-sm" 
                        src={MedidorVento} alt="" />

                    <div className="md:w-[50%] w-full bg-gray-100 dark:bg-gray-900 dark:text-gray-400 md:p-4 p-0 rounded-md">
                        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Lorem ipsum dolor sit amet consectetur</h2>
                        <p className="text-md mt-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore placeat assumenda nam
                        veritatis, magni doloremque pariatur quos fugit ipsa id voluptatibus deleniti officiis cum ratione eligendi
                        sed necessitatibus aliquam error laborum delectus quaerat. Delectus hic error eligendi sed repellat natus fuga
                        nobis tempora possimus ullam!</p>
                    </div>

                </div>

                {/* ----  Direita ---- */}
                <div className="xl:w-[80%] sm:w-[85%] w-[90%] mx-auto flex md:flex-row flex-col flex-col-reverse 
                    lg:gap-4 gap-2 justify-center lg:items-stretch md:items-center mt-6">
                
                    <div className="md:w-[50%] w-full bg-gray-100 dark:bg-gray-900 dark:text-gray-400 md:p-4 p-0 rounded-md">
                        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
                            Lorem ipsum dolor sit amet consectetur
                        </h2>

                        <p className="text-md mt-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore placeat assumenda nam
                        veritatis, magni doloremque pariatur quos fugit ipsa id voluptatibus deleniti officiis cum ratione eligendi
                        sed necessitatibus aliquam error laborum delectus quaerat. Delectus hic error eligendi sed repellat natus fuga
                        nobis tempora possimus ullam!
                        </p>
                    </div>
                    
                    <img className="sm:w-[50%] md:w-[50%] md:rounded-t-lg rounded-sm" 
                    src={MedidorVento} alt="billboard image" />

                </div>

            </div>
        </section>


  );
}