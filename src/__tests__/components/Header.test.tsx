import { render, screen, fireEvent } from "@testing-library/react";
import Header from "@/app/components/Header";
import { useDevices } from "@/app/context/DeviceContext";

jest.mock("@/app/context/DeviceContext", () => ({
  useDevices: jest.fn(),
}));

const mockedUseDevices = useDevices as jest.Mock;

function mockDevice({
  id = "esp-01",
  online = true,
  battery = 80,
} = {}) {
  return { id, online, battery };
}

describe("Header Component", () => {
  beforeEach(() => {
    mockedUseDevices.mockReturnValue({
      selectedDevice: null,
    });
  });

  it("renderiza o header corretamente", () => {
    render(<Header onClick={jest.fn()} />);
    expect(screen.getByText("Conector do Carrinho")).toBeInTheDocument();
  });

  it("chama onClick ao clicar no menu", () => {
    const onClick = jest.fn();
    render(<Header onClick={onClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalled();
  });

  it("mostra mensagem quando não há dispositivo", () => {
    render(<Header onClick={jest.fn()} />);
    expect(screen.getByText("Nenhum dispositivo conectado")).toBeInTheDocument();
  });

  it("exibe dados do dispositivo online", () => {
    mockedUseDevices.mockReturnValue({
      selectedDevice: mockDevice({ id: "esp-99", online: true, battery: 50 }),
    });

    render(<Header onClick={jest.fn()} />);

    expect(screen.getByText("esp-99")).toBeInTheDocument();
    expect(screen.getByTestId("status-online")).toBeInTheDocument();
    expect(screen.getByText("Online")).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();
  });

  it("renderiza BatteryIcon corretamente", () => {
    mockedUseDevices.mockReturnValue({
      selectedDevice: mockDevice({ battery: 90 }),
    });

    render(<Header onClick={jest.fn()} />);

    const fill = screen.getByTestId("battery-fill");
    expect(fill.getAttribute("style")).toContain("width: 90%");
  });

  it("limita bateria para no máximo 100%", () => {
    mockedUseDevices.mockReturnValue({
      selectedDevice: mockDevice({ battery: 200 }),
    });

    render(<Header onClick={jest.fn()} />);

    const fill = screen.getByTestId("battery-fill");
    expect(fill.getAttribute("style")).toContain("width: 100%");
  });
});
