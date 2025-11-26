import { RouteBox } from "@/app/components/RouteBox";
import { render, screen } from "@testing-library/react";

describe("RouteBox", () => {
  it("renderiza o texto com o índice correto", () => {
    render(<RouteBox index={3} />);
    expect(screen.getByRole("button", { name: "PERCURSO 3" })).toBeInTheDocument();
  });

  it("possui o link com o href correto", () => {
    render(<RouteBox index={7} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/route/7");
  });

  it("renderiza o botão dentro do link", () => {
    render(<RouteBox index={2} />);
    const link = screen.getByRole("link");
    const button = screen.getByRole("button", { name: "PERCURSO 2" });

    expect(link).toContainElement(button);
  });
});
