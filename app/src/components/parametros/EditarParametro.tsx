import React, { useState, useEffect } from "react";
import Aside from "../shared/aside/Aside";
import Estacao from "../../model/Estacao";
import Medida from "../../model/Medidas";
import Parametro from "../../model/Parametro";
import TipoParametro from "../../model/TipoParametros";
import Usuario from "../../model/usuario";
import { useParams, useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../../services/api";

export default function EditarParametro() {
  const [velocidadeVento, setVelocidadeVento] = useState<number>(0);
  const [direcaoVento, setDirecaoVento] = useState<number>(0);
  const [temperatura, setTemperatura] = useState<number>(0);
  const [umidade, setUmidade] = useState<number>(0);
  const [chuva, setChuva] = useState<number>(0);

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [tipoParametros, setTipoParametros] = useState<TipoParametro[]>([]);
  const [estacoes, setEstacoes] = useState<Estacao[]>([]);
  const [medidas, setMedidas] = useState<Medida[]>([]);

  const [cpfUsuario, setCpfUsuario] = useState<string>("");
  const [tipoParametro, setTipoParametro] = useState<number | string>(""); // Tipo como número ou string vazia
  const [idEstacao, setIdEstacao] = useState<string>(""); // Tipo como número ou string vazia
  const [idMedida, setIdMedida] = useState<number | string>(""); // Tipo como número ou string vazia

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataUsuarios = await fetchWithAuth("http://localhost:3000/api/usuarios");
        const dataTipoParametros = await fetchWithAuth("http://localhost:3000/api/tipoparametro");
        const dataEstacoes = await fetchWithAuth("http://localhost:3000/api/estacoes");
        const dataMedidas = await fetchWithAuth("http://localhost:3000/api/medidas");

        setUsuarios(dataUsuarios);
        setTipoParametros(dataTipoParametros);
        setEstacoes(dataEstacoes);
        setMedidas(dataMedidas);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchParametro = async () => {
      if (!id) return; // Verifica se o id_parametro está disponível
  
      try {
        const data = await fetchWithAuth(`http://localhost:3000/api/parametro/${id}`);
  
        // Atualiza os estados com os dados do parâmetro
        setVelocidadeVento(data.velocidade_vento || 0);
        setDirecaoVento(data.direcao_vento || 0);
        setTemperatura(data.temperatura || 0);
        setUmidade(data.umidade || 0);
        setChuva(data.chuva || 0);
        setCpfUsuario(data.cpf_usuario || "");
        setTipoParametro(data.id_tipo_parametro || "");
        setIdEstacao(data.id_estacao?.toString() || "");
        setIdMedida(data.id_medida?.toString() || "");
      } catch (error) {
        console.error("Erro ao buscar o parâmetro:", error);
      }
    };
  
    fetchParametro();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const idParametro = Number(id); // Converte o id para número
    const idEstacaoNumber = Number(idEstacao);
    console.log("ID do parâmetro:", id);
    

    const novoParametro: Parametro = {
        velocidade_vento: velocidadeVento,
        direcao_vento: direcaoVento,
        temperatura: temperatura,
        umidade: umidade,
        chuva: chuva,
        cpf_usuario: cpfUsuario,
        tipo_parametro: Number(tipoParametro), // Altere para "tipo_parametro"
        id_da_estacao: idEstacaoNumber, // Altere para "id_da_estacao"
        id_de_medida: Number(idMedida), // Altere para "id_de_medida"
      };

    console.log("Enviando dados:", novoParametro);

    try {
      const response = await fetchWithAuth(
        `http://localhost:3000/api/parametro/${idParametro}`,
        {
          method: "PUT", // Mudando para PUT
          body: JSON.stringify(novoParametro),
        }
      );

      if (response.ok) {
        alert("Parâmetro atualizado com sucesso!");
        // Resetando os campos após o envio
        setVelocidadeVento(0);
        setDirecaoVento(0);
        setTemperatura(0);
        setUmidade(0);
        setChuva(0);
        setCpfUsuario("");
        setTipoParametro("");
        setIdEstacao("");
        setIdMedida("");
      } else {
        alert("Erro ao atualizar parâmetro");
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor");
      console.error(error);
    }
  };

  const handleCancel = () => {
    navigate("/parametros"); // Navegar para /parametros
  };

  return (
    <>
      <Aside />
      <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
          Edição de Parâmetro
        </div>
        <form className="py-4 px-6" onSubmit={handleSubmit}>
          {/* Campo Velocidade do Vento */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="velocidadeVento"
            >
              Velocidade do Vento
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="velocidadeVento"
              type="number"
              step="0.01"
              placeholder="Digite a velocidade do vento"
              value={velocidadeVento}
              onChange={(e) => setVelocidadeVento(Number(e.target.value))}
            />
          </div>

          {/* Campo Direção do Vento */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="direcaoVento"
            >
              Direção do Vento
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="direcaoVento"
              type="number"
              step="0.01"
              placeholder="Digite a direção do vento"
              value={direcaoVento}
              onChange={(e) => setDirecaoVento(Number(e.target.value))}
            />
          </div>

          {/* Campo Temperatura */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="temperatura"
            >
              Temperatura
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="temperatura"
              type="number"
              step="0.01"
              placeholder="Digite a temperatura"
              value={temperatura}
              onChange={(e) => setTemperatura(Number(e.target.value))}
            />
          </div>

          {/* Campo Umidade */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="umidade"
            >
              Umidade
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="umidade"
              type="number"
              step="0.01"
              placeholder="Digite a umidade"
              value={umidade}
              onChange={(e) => setUmidade(Number(e.target.value))}
            />
          </div>

          {/* Campo Chuva */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="chuva"
            >
              Chuva
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="chuva"
              type="number"
              step="0.01"
              placeholder="Digite a quantidade de chuva"
              value={chuva}
              onChange={(e) => setChuva(Number(e.target.value))}
            />
          </div>

          {/* Campo CPF do Usuário */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="cpf">
              CPF do Usuário
            </label>
            <select
              id="cpf"
              value={cpfUsuario}
              onChange={(e) => setCpfUsuario(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Selecione o CPF</option>
              {usuarios.length === 0 ? (
                <option disabled>
                  Nenhum cliente cadastrado, para prosseguir crie um cliente.
                </option>
              ) : (
                usuarios.map((usuario) => (
                  <option key={usuario.cpf} value={usuario.cpf}>
                    {usuario.cpf}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Campo Estação */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="idEstacao"
            >
              Estação
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="idEstacao"
              value={idEstacao}
              onChange={(e) => {
                console.log("Estação selecionada:", e.target.value); // Aqui você verá o valor selecionado
                setIdEstacao(e.target.value);
              }}
            >
              <option value="">Selecione a Estação</option>
              {estacoes.length > 0 ? (
                estacoes.map((estacao) => (
                  <option key={estacao.id_estacao} value={estacao.id_estacao}>
                    {estacao.id_estacao}
                  </option>
                ))
              ) : (
                <option value="">Nenhuma estação cadastrada</option>
              )}
            </select>
          </div>

          {/* Campo Medida */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="idMedida"
            >
              Medida
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="idMedida"
              value={idMedida}
              onChange={(e) => setIdMedida(e.target.value)}
            >
              <option value="">Selecione a Medida</option>
              {medidas.length > 0 ? (
                medidas.map((medida) => (
                  <option key={medida.id_medida} value={medida.id_medida}>
                    {medida.id_medida}
                  </option>
                ))
              ) : (
                <option value="">Nenhuma medida cadastrada</option>
              )}
            </select>
          </div>

          {/* Campo Tipo de Parâmetro */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="idTipoParametro"
            >
              Tipo de Parâmetro
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="idTipoParametro"
              value={tipoParametro}
              onChange={(e) => setTipoParametro(e.target.value)}
            >
              <option value="">Selecione o Tipo de Parâmetro</option>
              {tipoParametros.length > 0 ? (
                tipoParametros.map((tipo) => (
                  <option key={tipo.id_tipo_param} value={tipo.id_tipo_param}>
                    {tipo.nome}
                  </option>
                ))
              ) : (
                <option value="">Nenhum tipo de parâmetro cadastrado</option>
              )}
            </select>
          </div>

          <div className="flex items-center justify-center mt-6">
            <button className="btn-cadastrar" type="submit">
              Salvar Alterações
            </button>
            <button
              type="button"
              className="btn-cancelar ml-4" // Classe para o botão cancelar
              onClick={handleCancel} // Chamando a função de cancelar
            >
              Cancelar Alterações
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
