import { render, screen, fireEvent } from "@testing-library/react";
import DeviceList from "@/app/components/DeviceList";
import { useDevices } from "@/app/context/DeviceContext";

jest.mock("@/app/context/DeviceContext", () => ({
  useDevices: jest.fn(),
}));

const mockedUseDevices = useDevices as jest.Mock;

function mockDevice(id: string, online = true) {
  return {
    id,
    online,
    battery: 80,
    timestamp: "2025-11-24T23:04:41Z",
  };
}

describe("DeviceList", () => {
  beforeEach(() => {
    mockedUseDevices.mockReturnValue({
      selectedDevice: null,
      setSelectedDevice: jest.fn(),
    });
  });

  it("mostra mensagem ao não haver dispositivos", () => {
    render(<DeviceList devices={[]} onRefresh={jest.fn()} />);
    expect(
      screen.getByText("Nenhum dispositivo cadastrado")
    ).toBeInTheDocument();
  });

  it("ordena dispositivos online antes dos offline", () => {
    const devices = [mockDevice("esp-1", false), mockDevice("esp-2", true)];

    render(<DeviceList devices={devices} onRefresh={jest.fn()} />);

    const rendered = screen
      .getAllByText(/Status/)
      .map((el) => el.parentElement?.textContent);

    expect(rendered[0]).toContain("esp-2");
    expect(rendered[1]).toContain("esp-1");
  });

  it("não seleciona dispositivo offline ao clicar", () => {
    const setSelectedDevice = jest.fn();

    mockedUseDevices.mockReturnValue({
      selectedDevice: null,
      setSelectedDevice,
    });

    const devices = [mockDevice("esp-1", false)];

    render(<DeviceList devices={devices} onRefresh={jest.fn()} />);

    fireEvent.click(screen.getAllByText("Offline")[1]);

    expect(setSelectedDevice).not.toHaveBeenCalled();
  });

  it("seleciona dispositivo online ao clicar", () => {
    const setSelectedDevice = jest.fn();

    mockedUseDevices.mockReturnValue({
      selectedDevice: null,
      setSelectedDevice,
    });

    const devices = [mockDevice("esp-1", true)];

    render(<DeviceList devices={devices} onRefresh={jest.fn()} />);

    fireEvent.click(screen.getByText("Selecionar"));

    expect(setSelectedDevice).toHaveBeenCalledWith(devices[0]);
  });

  it("desseleciona dispositivo se ele já estava selecionado", () => {
    const devices = [mockDevice("esp-1", true)];
    const setSelectedDevice = jest.fn();

    mockedUseDevices.mockReturnValue({
      selectedDevice: devices[0],
      setSelectedDevice,
    });

    render(<DeviceList devices={devices} onRefresh={jest.fn()} />);

    fireEvent.click(screen.getByText("Selecionado"));

    expect(setSelectedDevice).toHaveBeenCalledWith(null);
  });

  it("chama onRefresh ao clicar no botão de refresh", () => {
    const onRefresh = jest.fn();

    render(<DeviceList devices={[]} onRefresh={onRefresh} />);

    fireEvent.click(screen.getByRole("button"));

    expect(onRefresh).toHaveBeenCalled();
  });

  it("renderiza dados como ID, bateria e status", () => {
    const device = mockDevice("esp-10", true);

    render(<DeviceList devices={[device]} onRefresh={jest.fn()} />);

    expect(screen.getByText("esp-10")).toBeInTheDocument();
    expect(screen.getByText(/Bateria/)).toHaveTextContent(`${device.battery}%`);

    expect(
      screen.getByText(
        (content, element) =>
          element?.textContent?.replace(/\s+/g, " ").trim() === "Status: Online"
      )
    ).toBeInTheDocument();
  });
});
