import Aside from "../shared/aside/Aside";
import { useMedidas } from '../../hooks/useMedidas';
import { Select } from '../shared/Select';

export default function CadastroMedidas() {
  const {
    valor,
    unixTime,
    setUnixTime,
    idEstacao,
    setIdEstacao,
    idParametro,
    estacoes,
    tipoParametros,
    cadastrarMedida,
    limparCampos,
    handleTipoParametroChange,
    handleValorChange,
    casasDecimais
  } = useMedidas();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sucesso = await cadastrarMedida();
    
    if (sucesso) {
      alert("Medida cadastrada com sucesso!");
      limparCampos();
    } else {
      alert("Erro ao cadastrar a medida");
    }
  };

  return (
    <>
      <Aside />
      <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
          Cadastro de Medidas
        </div>
        <form className="py-4 px-6" onSubmit={handleSubmit}>
          {/* Campo Valor */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="valor">
              Valor {casasDecimais !== null && `(${casasDecimais} casas decimais)`}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="valor"
              type="number"
              step={casasDecimais !== null ? `0.${'0'.repeat(casasDecimais-1)}1` : 'any'}
              placeholder="Digite o valor da medida"
              value={valor}
              onChange={(e) => handleValorChange(e.target.value)}
            />
          </div>

          {/* Campo Unix Time */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="unixTime">
              Unix Time
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="unixTime"
              type="datetime-local"
              value={unixTime ? new Date(Number(unixTime) * 1000).toISOString().slice(0, 16) : ''}
              onChange={(e) => {
                if (e.target.value) {
                  const date = new Date(e.target.value);
                  setUnixTime((date.getTime() / 1000).toString());
                } else {
                  setUnixTime('');
                }
              }}
            />
          </div>

          <Select
            label="Estação"
            value={idEstacao}
            onChange={(value) => {
              console.log("Estação selecionada:", value);
              setIdEstacao(value);
            }}
            options={estacoes.map(estacao => ({
              id: estacao.id_estacao,
              nome: estacao.nome
            }))}
            placeholder="Selecione a Estação"
          />

<Select
            label="Tipo de Parâmetro"
            value={idParametro}
            onChange={(value) => {
              console.log("Tipo de Parâmetro selecionado:", value);
              handleTipoParametroChange(value);
            }}
            options={tipoParametros.map(tipo => ({
              id: tipo.id_tipo_param,
              nome: tipo.nome
            }))}
            placeholder="Selecione o Tipo de Parâmetro"
          />

          {/* Botão de Cadastro */}
          <div className="flex items-center justify-center mt-6">
            <button className="btn-cadastrar" type="submit">
              Cadastrar Medida
            </button>
          </div>
        </form>
      </div>
    </>
  );
}