import { useMemo } from "react";
import { Trajeto } from "../types/trajeto";
import { parseComandos } from "../utils/commandsUtils";

interface DetailsProps {
  trajeto: Trajeto;
}

export default function Details({ trajeto }: DetailsProps) {
  const comandosEnviados = useMemo(() => {
    return parseComandos(trajeto.comandosEnviados);
  }, [trajeto.comandosEnviados]);

  const comandosExecutados = useMemo(() => {
    if (!trajeto.comandosExecutados) return null;
    return parseComandos(trajeto.comandosExecutados);
  }, [trajeto.comandosExecutados]);

  const distanciaTotal = useMemo(() => {
    return (
      comandosExecutados?.reduce((acc, cmd) => {
        if (cmd.tipo === "a") return acc + (cmd.valor || 0);
        return acc;
      }, 0) ?? 0
    );
  }, [comandosExecutados]);

  const velocidadeMedia =
    trajeto.tempo && trajeto.tempo > 0
      ? distanciaTotal / trajeto.tempo
      : undefined;

  const hasExecutionData = comandosExecutados && comandosExecutados.length > 0;
  
  const isFinished = trajeto.status !== null || hasExecutionData;

  const displayStatus = trajeto.status ?? (hasExecutionData ? true : null);

  return (
    <div className="mt-2.5 bg-[#434343] rounded-xl h-[195px] w-[280px] lg:h-[480px] lg:w-[350px] xl:w-[610px] 2xl:h-[570px] 2xl:w-[880px] overflow-y-auto">
      <div className="text-white p-5 text-justify whitespace-pre-wrap">
        
        {comandosEnviados.map((cmd, i) => {
          const step = i + 1;
          switch (cmd.tipo) {
            case "a":
              return (
                <p key={i}>
                  <span className="text-green-400 font-mono">{step}.</span>{" "}
                  Andar {cmd.valor} cm para frente
                </p>
              );
            case "d":
              return (
                <p key={i}>
                  <span className="text-yellow-400 font-mono">{step}.</span>{" "}
                  Virar 90° para a direita
                </p>
              );
            case "e":
              return (
                <p key={i}>
                  <span className="text-purple-400 font-mono">{step}.</span>{" "}
                  Virar 90° para a esquerda
                </p>
              );
            case "t":
              return (
                <p key={i}>
                  <span className="text-blue-400 font-mono">{step}.</span>{" "}
                  Pausar {cmd.valor} ms
                </p>
              );
            default:
              return null;
          }
        })}

        <div className="mt-4 border-t border-gray-600 pt-3">
          <h3 className="text-white font-semibold mb-2">Análise do Trajeto</h3>

          {!isFinished && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-yellow-400 text-sm animate-pulse font-medium">
                <span className="h-2.5 w-2.5 bg-yellow-400 rounded-full shadow-[0_0_8px_rgba(250,204,21,0.6)]"></span>
                Executando trajeto...
              </div>
              <p className="text-gray-400 text-sm italic">
                Aguardando dados da trajetória...
              </p>
            </div>
          )}

          {isFinished && (
            <div className="animate-in fade-in duration-500">
              <p className="mb-1">
                Status:{" "}
                <span
                  className={`font-bold ${
                    displayStatus ? "text-green-400" : "text-red-500"
                  }`}
                >
                  {displayStatus ? "Concluído" : "Falha"}
                </span>
              </p>

              <p>Distância percorrida: {distanciaTotal} cm</p>

              {trajeto.tempo !== null && trajeto.tempo !== undefined && (
                <p>Tempo total: {trajeto.tempo.toFixed(2)} s</p>
              )}

              {velocidadeMedia !== undefined && (
                <p>Velocidade média: {velocidadeMedia.toFixed(2)} cm/s</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}