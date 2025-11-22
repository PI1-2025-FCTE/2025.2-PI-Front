type DownloadButtonProps = {
    text: string;
    comandos: string;
}

export default function DownloadButton({text, comandos}: DownloadButtonProps ) {

    const handleClick = () => {
        const canvas = document.querySelector("canvas") as HTMLCanvasElement;
        const mapImage = canvas ? canvas.toDataURL("image/png") : null;
    async function downloadPDF() 
    {
      
      const markdown = `# Instruções do Carrinho\n\n${parseComandos(comandos)}`;
      const res = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markdown, mapImage }),
      });

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "relatorio.pdf";
      a.click();
    }
    downloadPDF();
  };

    return(
        <button onClick={handleClick} className="h-[50px] w-[300px] lg:h-[100px] lg:w-[400px] bg-[#7398B7] rounded-xl flex items-center justify-center transition hover:scale-[1.02]">
            <h1 className="text-white font-bold lg:text-[25px]">{text}</h1>
        </button>
    );
}

function parseComandos(comando: string): string {
  let resultado = "";
  let i = 0;
  let step = 1;

  const regex = /^(?:a\d{4}|[de])+$/;
  const validate = regex.test(comando);

  if (!validate) {
    return "Comando inválido";
  }

  while (i < comando.length) {
    const char = comando[i];
    
    if (char === "a") {
      const distancia = comando.substring(i + 1, i + 5);
      const dist = parseInt(distancia, 10);
      resultado += `${step}. Andar ${dist} cm para frente\n`;
      i += 5;
      step++;
    } else if (char === "d") {
      resultado += `${step}. Virar 90° para a direita\n`;
      i += 1;
      step++;
    } else if (char === "e") {
      resultado += `${step}. Virar 90° para a esquerda\n`;
      i += 1;
      step++;
    } else if (char === "t") {
      const tempo = comando.substring(i + 1, i + 5);
      resultado += `${step}. Pausar ${parseInt(tempo, 10)} ms\n`;
      i += 5;
      step++;
    } else {
      i++;
    }
  }

  return resultado.trim();
}
