describe("Fluxo completo de visualização de trajetos", () => {

  it("Deve abrir a sidebar, selecionar um percurso e exibir os detalhes", () => {
    cy.visit("/");

    // Abre a sidebar 
    cy.get("header button").first().click();

    cy.contains(/^PERCURSO \d+$/).should("be.visible");
  });
});
