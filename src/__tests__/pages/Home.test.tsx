import { render, screen, fireEvent } from "@testing-library/react";
import Home from "@/app/page";
import { useDevices } from "@/app/context/DeviceContext";

jest.mock("@/app/context/DeviceContext");

jest.mock("@/app/components/SideBar", () => (props: any) => (
  <div data-testid="sidebar">
    <button onClick={props.onClick}>Close Sidebar</button>
  </div>
));
jest.mock("@/app/components/Header", () => (props: any) => (
  <button data-testid="header" onClick={props.onClick}>Header</button>
));
jest.mock("@/app/components/DeviceList", () => (props: any) => (
  <div data-testid="device-list">
    {props.devices?.map((d: any) => <span key={d.id}>{d.id}</span>)}
    <button onClick={props.onRefresh}>Refresh</button>
  </div>
));
jest.mock("@/app/components/CommandPanel", () => () => (
  <div data-testid="command-panel" />
));

describe("Home Page", () => {
  const fetchDevicesMock = jest.fn();
  const devicesMock = [
    { id: "d1", online: true },
    { id: "d2", online: false },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useDevices as jest.Mock).mockReturnValue({
      devices: devicesMock,
      fetchDevices: fetchDevicesMock,
    });
  });

  it("renderiza Header, DeviceList e CommandPanel inicialmente", () => {
    render(<Home />);

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("device-list")).toBeInTheDocument();
    expect(screen.getByTestId("command-panel")).toBeInTheDocument();

    // Verifica dispositivos
    expect(screen.getByText("d1")).toBeInTheDocument();
    expect(screen.getByText("d2")).toBeInTheDocument();
  });

  it("toggle SideBar ao clicar no Header e fecha ao clicar no botão do SideBar", () => {
    render(<Home />);

    // Sidebar não está visível inicialmente
    expect(screen.queryByTestId("sidebar")).not.toBeInTheDocument();

    // Abre a Sidebar
    fireEvent.click(screen.getByTestId("header"));
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();

    // Fecha a Sidebar
    fireEvent.click(screen.getByText("Close Sidebar"));
    expect(screen.queryByTestId("sidebar")).not.toBeInTheDocument();
  });

  it("chama fetchDevices ao clicar no botão Refresh do DeviceList", () => {
    render(<Home />);

    fireEvent.click(screen.getByText("Refresh"));
    expect(fetchDevicesMock).toHaveBeenCalled();
  });
});
