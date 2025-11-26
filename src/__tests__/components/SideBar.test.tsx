import { render, screen, fireEvent, act } from "@testing-library/react";
import SideBar from "@/app/components/SideBar";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("SideBar", () => {
  const onClickMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockedAxios.get.mockResolvedValue({ data: [] });
  });

  it("renderiza o botão de voltar e a lista de trajetos", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        {
          idTrajeto: 1,
          comandosEnviados: "a0010",
          comandosExecutados: null,
          status: null,
          tempo: null,
        },
        {
          idTrajeto: 2,
          comandosEnviados: "a0020",
          comandosExecutados: null,
          status: null,
          tempo: null,
        },
      ],
    });

    await act(async () => {
      render(<SideBar onClick={onClickMock} />);
    });

    const backButton = screen.getAllByRole("button")[0];
    expect(backButton).toBeInTheDocument();

    expect(await screen.findByText("PERCURSO 1")).toBeInTheDocument();
    expect(await screen.findByText("PERCURSO 2")).toBeInTheDocument();
  });

  it("chama onClick ao clicar no botão de voltar", async () => {
    await act(async () => {
      render(<SideBar onClick={onClickMock} />);
    });
    const backButton = screen.getAllByRole("button")[0];
    fireEvent.click(backButton);
    expect(onClickMock).toHaveBeenCalled();
  });

  it("renderiza botão de instrução quando instruction=true", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });
    render(<SideBar onClick={onClickMock} instruction />);
    expect(await screen.findByText("INSTRUÇÃO")).toBeInTheDocument();
  });

  it("não renderiza botão de instrução quando instruction=false", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });
    await act(async () => {
      render(<SideBar onClick={onClickMock} />);
    });
    expect(screen.queryByText("INSTRUÇÃO")).not.toBeInTheDocument();
  });
});
