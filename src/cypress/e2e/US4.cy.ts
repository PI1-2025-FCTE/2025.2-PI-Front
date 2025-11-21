describe("US3-Conectar (caso tenha uma esp disponível)", () => {
  it("Deve conectar, digitar o comando e enviar a rota", () => {
    // Acessa a home
    cy.visit("/");


    cy.contains("Avançar").should("be.visible").click();
    cy.contains("Virar à direita").should("be.visible").click();
    cy.contains("Virar à esquerda").should("be.visible").click();

    cypress.getByLabel()
    cy.contains("a3000").should("be.visible")
  });
});


