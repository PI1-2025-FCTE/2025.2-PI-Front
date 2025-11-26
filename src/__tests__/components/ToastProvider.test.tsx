import { render, screen } from "@testing-library/react";
import ToastProvider from "@/app/components/ToastProvider";

describe("ToastProvider", () => {
  it("renderiza children sem erro", () => {
    render(
      <ToastProvider>
        <div data-testid="child">Olá</div>
      </ToastProvider>
    );

    // Verifica se os children são renderizados
    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByText("Olá")).toBeInTheDocument();
  });
});
