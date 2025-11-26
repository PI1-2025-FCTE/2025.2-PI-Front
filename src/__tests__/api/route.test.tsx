/**
 * @jest-environment node
 */

import { POST } from "@/app/api/route";
import { NextRequest } from "next/server";
import { PDFDocument } from "pdf-lib";

jest.mock("pdf-lib", () => {
  return {
    PDFDocument: {
      create: jest.fn(),
    },
    rgb: jest.fn(),
    StandardFonts: {
      Helvetica: "Helvetica",
      HelveticaBold: "Helvetica-Bold",
    },
    BlendMode: {
      Normal: "Normal",
    },
  };
});

describe("POST /api", () => {
  let mockPdfDoc: any;
  let mockPage: any;
  let mockImage: any;

  beforeEach(() => {
    jest.clearAllMocks();

    mockPage = {
      drawText: jest.fn(),
      drawImage: jest.fn(),
      drawRectangle: jest.fn(),
      getWidth: jest.fn().mockReturnValue(595),
    };

    mockImage = {
      scale: jest.fn().mockReturnValue({ width: 100, height: 100 }),
    };

    mockPdfDoc = {
      addPage: jest.fn().mockReturnValue(mockPage),
      embedFont: jest.fn(),
      embedPng: jest.fn().mockResolvedValue(mockImage),
      embedJpg: jest.fn().mockResolvedValue(mockImage),
      save: jest.fn().mockResolvedValue(new Uint8Array([1, 2, 3])),
    };

    (PDFDocument.create as jest.Mock).mockResolvedValue(mockPdfDoc);
  });

  const createRequest = (body: any) => {
    return new NextRequest(`${process.env.NEXT_PUBLIC_API_URL}/api`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  };

  it("deve retornar 400 se não houver markdown nem imagem", async () => {
    const req = createRequest({ markdown: "", mapImage: null });
    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error).toBe("Markdown or image required");
  });

  it("deve gerar PDF com sucesso apenas com markdown", async () => {
    const req = createRequest({ markdown: "Olá Mundo", mapImage: null });
    const res = await POST(req);

    // Verifica status e headers
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("application/pdf");
    expect(res.headers.get("Content-Disposition")).toContain(
      "filename=relatorio.pdf"
    );

    // Verifica se o texto foi desenhado
    expect(mockPage.drawText).toHaveBeenCalledWith(
      expect.stringContaining("Instruções do Carrinho"),
      expect.any(Object)
    );
    expect(mockPage.drawText).toHaveBeenCalledWith(
      "Olá Mundo",
      expect.any(Object)
    );
  });

  it("deve processar imagem PNG corretamente", async () => {
    const base64Png =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
    const req = createRequest({ markdown: "", mapImage: base64Png });

    await POST(req);

    // Deve chamar embedPng e NÃO embedJpg
    expect(mockPdfDoc.embedPng).toHaveBeenCalled();
    expect(mockPdfDoc.embedJpg).not.toHaveBeenCalled();

    // Deve desenhar retângulo de fundo e a imagem
    expect(mockPage.drawRectangle).toHaveBeenCalled();
    expect(mockPage.drawImage).toHaveBeenCalledWith(
      mockImage,
      expect.any(Object)
    );
  });

  it("deve processar imagem JPEG corretamente", async () => {
    const base64Jpg = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/";
    const req = createRequest({ markdown: "", mapImage: base64Jpg });

    await POST(req);

    // Deve chamar embedJpg e NÃO embedPng
    expect(mockPdfDoc.embedJpg).toHaveBeenCalled();
    expect(mockPdfDoc.embedPng).not.toHaveBeenCalled();
    expect(mockPage.drawImage).toHaveBeenCalled();
  });

  it("deve criar nova página (paginação) se o texto for muito longo", async () => {
    // Cria um texto com muitas linhas para estourar o limite Y
    const longMarkdown = Array(60).fill("Linha de teste").join("\n");

    const req = createRequest({ markdown: longMarkdown, mapImage: null });
    await POST(req);

    // addPage é chamado 1 vez na inicialização + X vezes para paginação
    // Como temos 60 linhas e o cursor desce rápido, deve criar pelo menos mais uma página
    expect(mockPdfDoc.addPage).toHaveBeenCalledTimes(2);

    // O mockPage é reutilizado no mock, então verificamos se drawText foi chamado muitas vezes
    expect(mockPage.drawText).toHaveBeenCalledTimes(60 + 1); // 60 linhas + 1 título
  });

  it("deve retornar 500 se ocorrer um erro na geração do PDF", async () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    mockPdfDoc.save.mockRejectedValue(new Error("Erro interno do PDF"));

    const req = createRequest({ markdown: "teste", mapImage: null });
    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.error).toBe("Failed to generate PDF");

    consoleErrorSpy.mockRestore();
  });
});
