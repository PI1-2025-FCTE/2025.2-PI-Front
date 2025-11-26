import { render, screen } from "@testing-library/react";
import Details from "@/app/components/Details";
import { Comando } from "@/app/types/comando";

describe("<Details />", () => {
  it("renderiza corretamente um comando de andar", () => {
    const comandos: Comando[] = [{ tipo: "a", valor: 50 }];

    render(<Details comandos={comandos} />);

    expect(screen.getByText("1.")).toBeInTheDocument();
    expect(screen.getByText(/Andar 50 cm para frente/i)).toBeInTheDocument();
  });

  it("renderiza corretamente comandos de virar direita e esquerda", () => {
    const comandos: Comando[] = [{ tipo: "d" }, { tipo: "e" }];

    render(<Details comandos={comandos} />);

    expect(screen.getByText("1.")).toBeInTheDocument();
    expect(screen.getByText(/Virar 90° para a direita/i)).toBeInTheDocument();

    expect(screen.getByText("2.")).toBeInTheDocument();
    expect(screen.getByText(/Virar 90° para a esquerda/i)).toBeInTheDocument();
  });

  it("renderiza corretamente um comando de pausa", () => {
    const comandos: Comando[] = [{ tipo: "t", valor: 300 }];

    render(<Details comandos={comandos} />);

    expect(screen.getByText("1.")).toBeInTheDocument();
    expect(screen.getByText(/Pausar 300 ms/i)).toBeInTheDocument();
  });

  it("renderiza todos os comandos na ordem correta", () => {
    const comandos: Comando[] = [
      { tipo: "a", valor: 10 },
      { tipo: "d" },
      { tipo: "e" },
      { tipo: "t", valor: 500 },
    ];

    render(<Details comandos={comandos} />);

    expect(screen.getByText(/1\./)).toBeInTheDocument();
    expect(screen.getByText(/Andar 10 cm/i)).toBeInTheDocument();

    expect(screen.getByText(/2\./)).toBeInTheDocument();
    expect(screen.getByText(/direita/i)).toBeInTheDocument();

    expect(screen.getByText(/3\./)).toBeInTheDocument();
    expect(screen.getByText(/esquerda/i)).toBeInTheDocument();

    expect(screen.getByText(/4\./)).toBeInTheDocument();
    expect(screen.getByText(/Pausar 500 ms/i)).toBeInTheDocument();
  });

  it("não quebra quando comandos está vazio", () => {
    render(<Details comandos={[]} />);

    expect(screen.queryByText("1.")).not.toBeInTheDocument();
  });
});
