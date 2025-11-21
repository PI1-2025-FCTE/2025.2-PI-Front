describe("US3-Conectar (caso tenha uma esp disponível)", () => {
  it("Deve conectar, digitar o comando e enviar a rota", () => {
    // Acessa a home
    cy.visit("/");



    cy.contains("Selecionar").should("be.visible").click();
    cy.contains("Selecionado").should("be.visible")

    cy.contains("Selecionado")
      .parent()
      .contains("Online")
      .should("exist");
  });
});
