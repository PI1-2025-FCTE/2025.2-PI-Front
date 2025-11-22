describe("US3 - Conexão com dispositivos", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Deve mostrar 'Nenhum dispositivo conectado'", () => {
    cy.contains("Nenhum dispositivo conectado").should("be.visible");
  });

  it("Deve impedir o envio de rota caso não haja ESP'", () => {
    cy.contains("Avançar").click();
    cy.get("input[type=number]").clear().type("1250");
    cy.contains("Virar à direita").click();

    cy.contains("Enviar").should("be.disabled")

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
