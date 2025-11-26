import { render } from "@testing-library/react";
import Map from "@/app/components/Map";

describe("Map component", () => {
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setup = (props?: { comandosEnviados?: string; comandosExecutados?: string }) => {
    const { container } = render(<Map {...props} />);
    canvas = container.querySelector("canvas")!;
    ctx = canvas.getContext("2d")!;
    return { canvas, ctx };
  };

  it("mostra 'Nenhum trajeto registrado' quando não há comandos", () => {
    setup();
    expect(ctx.fillText).toHaveBeenCalledWith(
      "Nenhum trajeto registrado",
      expect.any(Number),
      expect.any(Number)
    );
  });

  it("mostra 'Nenhum movimento detectado' quando comando andar 0cm", () => {
    setup({ comandosEnviados: "a0000", comandosExecutados: "a0000"});
    expect(ctx.fillText).toHaveBeenCalledWith(
      "Nenhum movimento detectado",
      expect.any(Number),
      expect.any(Number)
    );
  });

  it("desenha caminho enviado corretamente", () => {
    setup({ comandosEnviados: "a0010d" });
    expect(ctx.strokeStyle).toEqual("#4caf50");
    expect(ctx.lineWidth).toBe(3);
    expect(ctx.beginPath).toHaveBeenCalled();
    expect(ctx.moveTo).toHaveBeenCalled();
    expect(ctx.lineTo).toHaveBeenCalled();
  });

  it("desenha caminho executado corretamente", () => {
    setup({ comandosExecutados: "a0020e" });
    expect(ctx.strokeStyle).toEqual("#ff6b6b");
    expect(ctx.lineWidth).toBe(2);
    expect(ctx.setLineDash).toHaveBeenCalledWith([5, 5]);
    expect(ctx.beginPath).toHaveBeenCalled();
    expect(ctx.moveTo).toHaveBeenCalled();
    expect(ctx.lineTo).toHaveBeenCalled();
  });

  it("desenha pontos de início e destino", () => {
    setup({ comandosEnviados: "a0010", comandosExecutados: "a0010" });
    expect(ctx.arc).toHaveBeenCalled();
    expect(ctx.fill).toHaveBeenCalled();
  });

  it("desenha legenda corretamente", () => {
    setup({ comandosEnviados: "a0010", comandosExecutados: "a0010" });
    expect(ctx.fillText).toHaveBeenCalledWith("Início", expect.any(Number), expect.any(Number));
    expect(ctx.fillText).toHaveBeenCalledWith("Destino", expect.any(Number), expect.any(Number));
    expect(ctx.fillText).toHaveBeenCalledWith("Enviado", expect.any(Number), expect.any(Number));
    expect(ctx.fillText).toHaveBeenCalledWith("Executado", expect.any(Number), expect.any(Number));
  });
});
