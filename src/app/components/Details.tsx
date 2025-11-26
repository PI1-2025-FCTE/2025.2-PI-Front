import { Comando } from "../types/comando";

interface DetailsProps {
  comandos: Comando[];
}

export default function Details({ comandos }: DetailsProps) {
  return (
    <div className="mt-2.5 bg-[#434343] rounded-xl h-[195px] w-[280px] lg:h-[480px] lg:w-[350px] xl:w-[610px]  2xl:h-[570px] 2xl:w-[880px] overflow-y-auto">
      <div className="text-white p-5 text-justify whitespace-pre-wrap">
        {comandos.map((cmd, i) => {
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
          }
        })}
      </div>
    </div>
  );
}
