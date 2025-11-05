describe("Página inicial", () => {
  it("Deve carregar a página inicial", () => {
    cy.visit("/");
    cy.contains("Conector do Carrinho").should("be.visible");
  });
});
