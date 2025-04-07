import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redirecionamento após o login

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate(); // Hook para navegação

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const usuario = { email, senha };

        console.log("Enviando dados para o servidor:", usuario); // Log para ver os dados que estão sendo enviados

        try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(usuario),
            });

            // Verificar se a resposta foi recebida corretamente
            console.log("Resposta da API recebida:", response);

            const data = await response.json();

            console.log("Dados retornados da API:", data); // Log para verificar os dados retornados da API

            if (response.ok) {
                console.log("Token recebido:", data.token); // Verificar se o token está sendo retornado
                localStorage.setItem("token", data.token); // Salvar token no localStorage
                alert("Login realizado com sucesso!");

                // Converte o tipo para número, caso esteja vindo como string
                const userType = Number(data.tipo);

                // Verifica o tipo do usuário e redireciona para a página apropriada
                if (userType === 2) {
                    navigate("/pagina-teste"); // Redireciona para a página 'teste'
                } else if (userType === 1) {
                    navigate("/pagina-principal"); // Redireciona para a página principal
                } else {
                    console.error("Tipo de usuário desconhecido:", userType);
                    alert("Erro: Tipo de usuário desconhecido.");
                }
            } else {
                console.log("Erro ao fazer login:", data.error); // Log para erro de login
                alert(data.error || "Erro ao fazer login");
            }
        } catch (error) {
            console.error("Erro ao conectar com o servidor:", error);
            alert("Erro ao conectar com o servidor");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-tr from-sky-300 via-sky-400 to-blue-500 flex flex-col justify-center py-12 px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Login
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <div className="mt-1">
                                <input 
                                    id="email" 
                                    name="email" 
                                    type="email" 
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Entre com seu email" 
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Senha
                            </label>
                            <div className="mt-1">
                                <input 
                                    id="password" 
                                    name="password" 
                                    type="password" 
                                    required
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Entre com sua senha" 
                                />
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
