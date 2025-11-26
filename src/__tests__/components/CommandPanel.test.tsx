import CommandPanel from "@/app/components/CommandPanel";
import { useDevices } from "@/app/context/DeviceContext";
import { render, screen, fireEvent, act } from "@testing-library/react";

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

jest.mock(
  "next/link",
  () =>
    ({ children }: any) =>
      children
);
jest.mock("react-icons/hi", () => ({
  HiOutlineArrowNarrowRight: () => <span />,
}));

jest.mock("@/app/context/DeviceContext", () => ({
  useDevices: jest.fn(),
}));

const mockedUseDevices = useDevices as jest.Mock;

describe("CommandPanel", () => {
  beforeEach(() => {
    mockedUseDevices.mockReturnValue({
      selectedDevice: { id: 1, online: true },
    });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ idTrajeto: 123 }),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza os botões de comando", () => {
    render(<CommandPanel />);
    expect(screen.getByText("Avançar")).toBeInTheDocument();
    expect(screen.getByText("Virar à direita")).toBeInTheDocument();
    expect(screen.getByText("Virar à esquerda")).toBeInTheDocument();
  });

  it("adiciona blocos corretamente", () => {
    render(<CommandPanel />);

    // Adiciona os três tipos de bloco
    fireEvent.click(screen.getByText("Avançar"));
    fireEvent.click(screen.getByText("Virar à direita"));
    fireEvent.click(screen.getByText("Virar à esquerda"));

    // Verifica se os blocos foram adicionados corretamente
    expect(screen.getByTestId("command-block-avancar-0")).toBeInTheDocument();
    expect(screen.getByTestId("command-block-direita-1")).toBeInTheDocument();
    expect(screen.getByTestId("command-block-esquerda-2")).toBeInTheDocument();

    // Verifica o input do bloco "Avançar"
    expect(screen.getByDisplayValue("100")).toBeInTheDocument();
  });

  it("remove um bloco ao clicar no ×", () => {
    render(<CommandPanel />);

    // Adiciona um bloco e remove
    fireEvent.click(screen.getByText("Avançar"));
    fireEvent.click(screen.getByTestId("command-block-avancar-0").querySelector("button")!);

    expect(screen.queryByTestId("command-block-avancar-0")).not.toBeInTheDocument();
  });

  it("atualiza valor do bloco avançar respeitando limites", () => {
    render(<CommandPanel />);
    fireEvent.click(screen.getByText("Avançar"));

    const input = screen.getByDisplayValue("100") as HTMLInputElement;

    // Valor negativo → deve ser ajustado para 0
    fireEvent.change(input, { target: { value: "-50" } });
    expect(input.value).toBe("0");

    // Valor acima de 9999 → deve ser ajustado para 9999
    fireEvent.change(input, { target: { value: "20000" } });
    expect(input.value).toBe("9999");

    // Valor válido
    fireEvent.change(input, { target: { value: "500" } });
    expect(input.value).toBe("500");
  });

  it("habilita o botão Enviar se o dispositivo está online e existem blocos", () => {
    render(<CommandPanel />);
    const sendButton = screen.getByText("Enviar") as HTMLButtonElement;

    // Inicialmente desabilitado
    expect(sendButton.disabled).toBe(true);

    // Adiciona um bloco → habilita
    fireEvent.click(screen.getByText("Avançar"));
    expect(sendButton.disabled).toBe(false);
  });

  it("envia comandos corretamente", async () => {
    render(<CommandPanel />);

    // Adiciona blocos de cada tipo
    fireEvent.click(screen.getByText("Avançar"));
    fireEvent.click(screen.getByText("Virar à direita"));
    fireEvent.click(screen.getByText("Virar à esquerda"));

    // Ajusta valor do bloco avançar
    const input = screen.getByDisplayValue("100") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "250" } });

    const sendButton = screen.getByText("Enviar");

    await act(async () => {
      fireEvent.click(sendButton);
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_URL}/trajetos/1`,
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ comandosEnviados: "a0250de" }),
      })
    );
  });
});
