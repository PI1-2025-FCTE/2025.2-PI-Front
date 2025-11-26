import { Comando } from "../types/comando";

export function parseComandos(comando: string): Comando[] {
  const regex = /^(?:a\d{4}|t\d{4}|[de])+$/;

  if (!regex.test(comando)) return [];

  const result: Comando[] = [];
  let i = 0;

  while (i < comando.length) {
    const char = comando[i];

    if (char === "a" || char === "t") {
      const valor = parseInt(comando.substring(i + 1, i + 5), 10);
      result.push({ tipo: char, valor });
      i += 5;
    } else if (char === "d" || char === "e") {
      result.push({ tipo: char });
      i += 1;
    }
  }

  return result;
}

export function validateCommandString(commandString: string): boolean {
  if (!commandString || commandString.trim().length === 0) return false;
  const trimmed = commandString.trim();
  let i = 0;
  while (i < trimmed.length) {
    const char = trimmed[i];
    if (char === "d" || char === "e") {
      i++;
    } else if (char === "a") {
      if (i + 4 >= trimmed.length) return false;
      const fourDigits = trimmed.substring(i + 1, i + 5);
      if (!/^\d{4}$/.test(fourDigits)) return false;
      i += 5;
    } else return false;
  }
  return true;
}

export function comandosToMarkdown(comandos: Comando[]): string {
  if (!comandos || comandos.length === 0) return "";

  let resultado = "";
  let step = 1;

  comandos.forEach((cmd) => {
    switch (cmd.tipo) {
      case "a":
        resultado += `${step}. Andar ${cmd.valor} cm para frente\n`;
        break;
      case "d":
        resultado += `${step}. Virar 90° para a direita\n`;
        break;
      case "e":
        resultado += `${step}. Virar 90° para a esquerda\n`;
        break;
      case "t":
        resultado += `${step}. Pausar ${cmd.valor} ms\n`;
        break;
      default:
        resultado += `${step}. Comando desconhecido\n`;
    }
    step++;
  });

  return resultado.trim();
}
