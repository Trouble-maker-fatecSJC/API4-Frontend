export default function Login() {
    return (
        
        <div className="min-h-screen bg-gradient-to-tr from-sky-300 via-sky-400 to-blue-500
         flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Login
            </h2>
            
        </div>
    
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form className="space-y-6" action="#" method="POST">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <div className="mt-1">
                            <input id="email" name="email" type="email" autoComplete="email" required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Entre com seu email" />
                        </div>
                    </div>
    
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Senha
                        </label>
                        <div className="mt-1">
                            <input id="password" name="password" type="password" autoComplete="current-password" required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Entre com sua senha" />
                        </div>
                    </div>
    
                    <div className="flex items-center justify-between">
                        
    
                        <div className="text-sm mx-auto">
                            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                Esqueceu sua senha?
                            </a>
                        </div>
                    </div>
    
                    <div>
                        <button type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
    
                            Entrar
                        </button>
                    </div>
                </form>
               
            </div>
        </div>
    </div>

    
    );
  }