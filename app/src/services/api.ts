export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token"); // Obtém o token do localStorage

  const headers = {
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : "", // Adiciona o token ao cabeçalho
    "Content-Type": "application/json", // Define o tipo de conteúdo como JSON
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    console.error("Erro na requisição:", response.status, response.statusText);
    throw new Error(`Erro na requisição: ${response.statusText}`);
  }

  return response.json(); // Retorna o JSON da resposta
}
