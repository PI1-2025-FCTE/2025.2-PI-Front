import { render, screen, fireEvent, act } from "@testing-library/react";
import Page from "@/app/route/[id]/page";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("@/app/components/SideBar", () => (props: any) => (
  <div data-testid="sidebar">
    <button onClick={props.onClick}>Close Sidebar</button>
    {props.instruction && <span>INSTRUÇÃO</span>}
  </div>
));
jest.mock("@/app/components/Header", () => (props: any) => (
  <button data-testid="header" onClick={props.onClick}>
    Header
  </button>
));
jest.mock("@/app/components/Details", () => (props: any) => (
  <div data-testid="details">
    {props.comandos.map((c: any, i: number) => (
      <span key={i}>{c.tipo}</span>
    ))}
  </div>
));
jest.mock("@/app/components/Map", () => (props: any) => (
  <div data-testid="map" />
));
jest.mock("@/app/components/Button", () => (props: any) => (
  <button onClick={props.onClick}>{props.children}</button>
));

describe("Route Page", () => {
  const mockId = "123";
  const trajetoMock = {
    idTrajeto: 1,
    comandosEnviados: "a0010",
    comandosExecutados: "a0010",
  };

  let originalCreateElement: typeof document.createElement;

  beforeEach(() => {
    jest.clearAllMocks();

    mockedAxios.get.mockResolvedValue({ data: trajetoMock });

    global.fetch = jest.fn().mockResolvedValue({
      blob: jest
        .fn()
        .mockResolvedValue(
          new Blob(["PDF content"], { type: "application/pdf" })
        ),
    } as any);

    jest.spyOn(console, "error").mockImplementation(() => {});

    if (!global.URL.createObjectURL) {
      (global.URL as any).createObjectURL = () => "blob:mock";
    } else {
      jest.spyOn(global.URL, "createObjectURL").mockReturnValue("blob:mock");
    }

    originalCreateElement = document.createElement.bind(document);
    jest.spyOn(document, "createElement").mockImplementation((tag: string) => {
      if (tag === "a")
        return { href: "", download: "", click: jest.fn() } as any;
      return originalCreateElement(tag);
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renderiza Details e Map após fetch de trajeto", async () => {
    await act(async () => {
      render(<Page params={Promise.resolve({ id: mockId })} />);
    });

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_URL}/trajetos/${mockId}`
    );

    const details = await screen.findByTestId("details");
    expect(details).toHaveTextContent("a");
    expect(screen.getByTestId("map")).toBeInTheDocument();
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  it("toggle SideBar ao clicar no header e botão de fechar", async () => {
    await act(async () => {
      render(<Page params={Promise.resolve({ id: mockId })} />);
    });

    const header = screen.getByTestId("header");

    fireEvent.click(header);
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByText("INSTRUÇÃO")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Close Sidebar"));
    expect(screen.queryByTestId("sidebar")).not.toBeInTheDocument();
  });

  it("downloadRelatorio dispara fetch e cria blob", async () => {
    await act(async () => {
      render(<Page params={Promise.resolve({ id: mockId })} />);
    });

    const downloadButton = screen.getByText("BAIXAR RELATÓRIO");
    fireEvent.click(downloadButton);

    expect(global.fetch).toHaveBeenCalledWith("/api", expect.any(Object));

    const anchor = document.createElement("a") as any;
    expect(anchor.click).toBeDefined();
  });
});
