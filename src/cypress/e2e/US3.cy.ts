describe("US3 - Conexão com dispositivos", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Deve mostrar 'Nenhum dispositivo conectado'", () => {
    cy.contains("Nenhum dispositivo conectado").should("be.visible");
  });

  it("Deve conectar se ouver ESP disponível", () => {
    cy.contains("Selecionar").should("be.visible").click();

    cy.contains("Selecionado").should("be.visible");

    cy.contains("Selecionado")
      .parent()
      .contains("Online")
      .should("exist");
  });
});
