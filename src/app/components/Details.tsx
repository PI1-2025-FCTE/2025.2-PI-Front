type DetailsProps = {
    comandos: string;
}

export default function Details({comandos}: DetailsProps) {
    return(
        <div className="mt-2.5 bg-[#434343] rounded-xl h-[195px] w-[280px] lg:h-[480px] lg:w-[350px] xl:w-[610px]  2xl:h-[570px] 2xl:w-[880px] overflow-y-auto">
            <p className="text-white p-5 text-justify whitespace-pre-wrap">{parseComandos(comandos)}</p>
        </div>
    );
}


function parseComandos(comando: string): React.JSX.Element[] {
  const elementos: React.JSX.Element[] = [];
  let i = 0;
  let step = 1;
  const regex = /^(?:a\d{4}|[de])+$/;
  const validate = regex.test(comando);

    if (!validate) {
        return [
            <p className="text-red-600">Comando inválido</p>
        ];
    }

  while (i < comando.length) {
    const char = comando[i];
    
    if (char === 'a') {
      const distancia = comando.substring(i + 1, i + 5);
      const dist = parseInt(distancia, 10);
      elementos.push(
        <p key={step}>
          <span className="text-green-400 font-mono">{step}.</span> Andar {dist} cm para frente
        </p>
      );
      i += 5;
      step++;
    } else if (char === 'd') {
      elementos.push(
        <p key={step}>
          <span className="text-yellow-400 font-mono">{step}.</span> Virar 90° para a direita
        </p>
      );
      i += 1;
      step++;
    } else if (char === 'e') {
      elementos.push(
        <p key={step}>
          <span className="text-purple-400 font-mono">{step}.</span> Virar 90° para a esquerda
        </p>
      );
      i += 1;
      step++;
    } else if (char === 't') {
      const tempo = comando.substring(i + 1, i + 5);
      elementos.push(
        <p key={step}>
          <span className="text-blue-400 font-mono">{step}.</span> Pausar {parseInt(tempo, 10)} ms
        </p>
      );
      i += 5;
      step++;
    } else {
      i++;
    }
  }

  return elementos;
}
