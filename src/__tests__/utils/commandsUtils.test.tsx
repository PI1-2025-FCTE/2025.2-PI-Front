import { Comando } from "@/app/types/comando";
import {
  comandosToMarkdown,
  parseComandos,
  validateCommandString,
} from "@/app/utils/commandsUtils";

describe("validateCommandString", () => {
  test("retorna false para string vazia", () => {
    expect(validateCommandString("")).toBe(false);
    expect(validateCommandString("   ")).toBe(false);
  });

  test("valida comandos corretos", () => {
    expect(validateCommandString("a0001d")).toBe(true);
    expect(validateCommandString("a1234e")).toBe(true);
    expect(validateCommandString("da0001e")).toBe(true);
    expect(validateCommandString("a9999dda0000e")).toBe(true);
  });

  test("falha se o avançar não tiver 4 dígitos", () => {
    expect(validateCommandString("a1d")).toBe(false);
    expect(validateCommandString("a12d")).toBe(false);
    expect(validateCommandString("a123d")).toBe(false);
    expect(validateCommandString("a12345d")).toBe(false);
  });

  test("falha se houver caracteres inválidos", () => {
    expect(validateCommandString("x0001")).toBe(false);
    expect(validateCommandString("a0001x")).toBe(false);
    expect(validateCommandString("dxae0001")).toBe(false);
  });

  test("falha se avançar estiver incompleto no final", () => {
    expect(validateCommandString("a00")).toBe(false);
    expect(validateCommandString("a000")).toBe(false);
    expect(validateCommandString("a0001a00")).toBe(false);
  });
});

describe("parseComandos", () => {
  test("retorna array vazio se string não é válida", () => {
    expect(parseComandos("")).toEqual([]);
    expect(parseComandos("aaa")).toEqual([]);
    expect(parseComandos("a12d")).toEqual([]);
    expect(parseComandos("x0000")).toEqual([]);
  });

  test("parseia comando simples de avançar", () => {
    expect(parseComandos("a0001")).toEqual([{ tipo: "a", valor: 1 }]);
  });

  test("parseia virar à direita e esquerda", () => {
    expect(parseComandos("deed")).toEqual([
      { tipo: "d" },
      { tipo: "e" },
      { tipo: "e" },
      { tipo: "d" },
    ]);
  });

  test("parseia sequência completa com avançar + giros", () => {
    expect(parseComandos("a0123dea9999e")).toEqual([
      { tipo: "a", valor: 123 },
      { tipo: "d" },
      { tipo: "e" },
      { tipo: "a", valor: 9999 },
      { tipo: "e" },
    ]);
  });

  test("parseia múltiplos comandos de avançar", () => {
    expect(parseComandos("a0000a0001a0100")).toEqual([
      { tipo: "a", valor: 0 },
      { tipo: "a", valor: 1 },
      { tipo: "a", valor: 100 },
    ]);
  });

  test("parseia comando 't' mesmo sem uso atual", () => {
    expect(parseComandos("t0005")).toEqual([{ tipo: "t", valor: 5 }]);
  });

  test("parseia mistura com 't' + outros comandos", () => {
    expect(parseComandos("t0001da0003e")).toEqual([
      { tipo: "t", valor: 1 },
      { tipo: "d" },
      { tipo: "a", valor: 3 },
      { tipo: "e" },
    ]);
  });
});

describe("comandosToMarkdown", () => {
  test("retorna string vazia para array vazio ou undefined", () => {
    expect(comandosToMarkdown([])).toBe("");
    expect(comandosToMarkdown(undefined as any)).toBe("");
  });

  test("gera markdown para cada tipo de comando", () => {
    const comandos: Comando[] = [
      { tipo: "a", valor: 100 },
      { tipo: "d" },
      { tipo: "e" },
      { tipo: "t", valor: 500 },
    ];
    const expected =
      "1. Andar 100 cm para frente\n" +
      "2. Virar 90° para a direita\n" +
      "3. Virar 90° para a esquerda\n" +
      "4. Pausar 500 ms";

    expect(comandosToMarkdown(comandos)).toEqual(expected);
  });

  test("gera markdown corretamente para apenas comandos de avançar", () => {
    const comandos: Comando[] = [
      { tipo: "a", valor: 1 },
      { tipo: "a", valor: 50 },
    ];
    expect(comandosToMarkdown(comandos)).toBe(
      "1. Andar 1 cm para frente\n2. Andar 50 cm para frente"
    );
  });

  test("gera markdown corretamente para apenas comandos de giros", () => {
    const comandos: Comando[] = [{ tipo: "d" }, { tipo: "e" }, { tipo: "d" }];
    expect(comandosToMarkdown(comandos)).toBe(
      "1. Virar 90° para a direita\n2. Virar 90° para a esquerda\n3. Virar 90° para a direita"
    );
  });

  test("gera markdown corretamente para apenas comando 't'", () => {
    const comandos: Comando[] = [{ tipo: "t", valor: 200 }];
    expect(comandosToMarkdown(comandos)).toBe("1. Pausar 200 ms");
  });
});
