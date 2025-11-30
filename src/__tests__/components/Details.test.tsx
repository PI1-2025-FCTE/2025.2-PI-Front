import { render, screen } from "@testing-library/react";
import Details from "@/app/components/Details";
import { Trajeto } from "@/app/types/trajeto";

const createMockTrajeto = (comandosEnviados: string, overrides?: Partial<Trajeto>): Trajeto => ({
  idTrajeto: 1,
  comandosEnviados: comandosEnviados,
  comandosExecutados: null,
  status: null,
  tempo: null,
  ...overrides,
});

describe("<Details />", () => {
  
  it("renderiza corretamente um comando de andar (parse de string)", () => {
    const trajeto = createMockTrajeto("a0050");

    render(<Details trajeto={trajeto} />);

    expect(screen.getByText("1.")).toBeInTheDocument();
    expect(screen.getByText(/Andar 50 cm para frente/i)).toBeInTheDocument();
  });

  it("renderiza corretamente comandos de virar direita e esquerda", () => {
    const trajeto = createMockTrajeto("de");

    render(<Details trajeto={trajeto} />);

    expect(screen.getByText("1.")).toBeInTheDocument();
    expect(screen.getByText(/Virar 90° para a direita/i)).toBeInTheDocument();

    expect(screen.getByText("2.")).toBeInTheDocument();
    expect(screen.getByText(/Virar 90° para a esquerda/i)).toBeInTheDocument();
  });

  it("renderiza uma sequência mista de comandos na ordem correta", () => {
    const trajeto = createMockTrajeto("a0010da0020e");

    render(<Details trajeto={trajeto} />);

    const items = screen.getAllByRole("paragraph");
    const commandItems = items.filter(item => /Andar|Virar|Pausar/.test(item.textContent || ""));

    expect(commandItems[0]).toHaveTextContent(/Andar 10 cm/i);
    expect(commandItems[1]).toHaveTextContent(/Virar 90° para a direita/i);
    expect(commandItems[2]).toHaveTextContent(/Andar 20 cm/i);
    expect(commandItems[3]).toHaveTextContent(/Virar 90° para a esquerda/i);
  });

  it("exibe status 'Executando...' e animação quando status é null e sem dados executados", () => {
    const trajeto = createMockTrajeto("a0100", { status: null, comandosExecutados: null });
    render(<Details trajeto={trajeto} />);
    
    expect(screen.getByText(/Executando trajeto.../i)).toBeInTheDocument();
    expect(screen.getByText(/Aguardando dados da trajetória.../i)).toBeInTheDocument();
  });

  it("exibe status 'Concluído' quando status é true", () => {
    const trajeto = createMockTrajeto("a0100", { status: true });
    render(<Details trajeto={trajeto} />);
    
    expect(screen.getByText(/Concluído/i)).toBeInTheDocument();
    expect(screen.queryByText(/Executando trajeto.../i)).not.toBeInTheDocument();
  });

  it("exibe status 'Falha' quando status é false", () => {
    const trajeto = createMockTrajeto("a0100", { status: false });
    render(<Details trajeto={trajeto} />);
    
    expect(screen.getByText(/Falha/i)).toBeInTheDocument();
  });

  it("infere status 'Concluído' (Fallback) quando status é null mas existem dados executados", () => {
    const trajeto = createMockTrajeto("a0100", { 
      status: null, 
      comandosExecutados: "a0100" 
    });
    
    render(<Details trajeto={trajeto} />);
    
    expect(screen.queryByText(/Executando trajeto.../i)).not.toBeInTheDocument();
    expect(screen.getByText(/Concluído/i)).toBeInTheDocument();
  });

  it("calcula e exibe distância percorrida e velocidade média corretamente", () => {
    const trajeto = createMockTrajeto("a0100", { 
      comandosExecutados: "a0100", 
      tempo: 2000,
      status: true
    });

    render(<Details trajeto={trajeto} />);

    expect(screen.getByText(/Distância percorrida: 100 cm/i)).toBeInTheDocument();
    expect(screen.getByText(/Tempo total: 2.00 s/i)).toBeInTheDocument();
    expect(screen.getByText(/Velocidade média: 50.00 cm\/s/i)).toBeInTheDocument();
  });
});