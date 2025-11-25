describe("US5 - Envio de comandos", () => {
  beforeEach(() => {
    cy.intercept("POST", "http://localhost:8000/trajetos/*", {
      statusCode: 200,
      body: { idTrajeto: "123" }
    }).as("postTrajeto");

    cy.visit("/");
    cy.contains("Selecionar").click(); // conecta
  });

  it("Deve enviar a rota com sucesso", () => {
    cy.contains("Avançar").click();
    cy.get("input[type=number]").clear().type("1250");
    cy.contains("Virar à direita").click();

    cy.contains("Enviar").click();

    cy.wait("@postTrajeto");

    cy.contains("Trajeto criado com sucesso").should("be.visible");
    cy.contains("Ver trajeto").should("have.attr", "href", "/route/123");
  });
});
