import { DevicesProvider, useDevices } from "@/app/context/DeviceContext";
import { render, screen, fireEvent, act } from "@testing-library/react";

jest.mock("react-toastify", () => ({
  toast: {
    warning: jest.fn(),
    error: jest.fn(),
  },
}));

const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

const TestConsumer = () => {
  const { devices, selectedDevice, fetchDevices, setSelectedDevice } =
    useDevices();

  return (
    <div>
      <p data-testid="devices">{JSON.stringify(devices)}</p>
      <p data-testid="selected">{selectedDevice?.id || "null"}</p>
      <button onClick={fetchDevices}>fetch</button>
      <button onClick={() => setSelectedDevice(devices[0])}>select0</button>
    </div>
  );
};

const renderWithProvider = () =>
  render(
    <DevicesProvider>
      <TestConsumer />
    </DevicesProvider>
  );

describe("DevicesProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock) = jest.fn();
    jest.useFakeTimers();
    consoleErrorMock.mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("carrega devices corretamente via fetchDevices", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({
        d1: { online: true, battery: 90, timestamp: "t1" },
        d2: { online: false, battery: null, timestamp: "t2" },
      }),
    });

    renderWithProvider();

    await act(async () => {
      fireEvent.click(screen.getByText("fetch"));
    });

    const devices = JSON.parse(
      screen.getByTestId("devices").textContent || "[]"
    );

    expect(devices).toHaveLength(2);
    expect(devices[0].id).toBe("d1");
    expect(devices[1].id).toBe("d2");
  });

  test("limpa selectedDevice quando o dispositivo fica offline", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({
        d1: { online: true, battery: 50, timestamp: "t" },
      }),
    });

    renderWithProvider();

    await act(async () => {
      fireEvent.click(screen.getByText("fetch"));
    });

    await act(async () => {
      fireEvent.click(screen.getByText("select0"));
    });

    expect(screen.getByTestId("selected").textContent).toBe("d1");

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({
        d1: { online: false, battery: 50, timestamp: "t" },
      }),
    });

    await act(async () => {
      fireEvent.click(screen.getByText("fetch"));
    });

    expect(screen.getByTestId("selected").textContent).toBe("null");
  });

  

  test("mostra toast.error quando o fetch falha", async () => {
    const { toast } = require("react-toastify");

    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("erro X"));

    renderWithProvider();

    await act(async () => {
      fireEvent.click(screen.getByText("fetch"));
    });

    expect(toast.error).toHaveBeenCalledWith(
      "Erro ao buscar dispositivos: erro X"
    );
  });
});
