describe("Fluxo completo de visualização de trajetos", () => {

    //aguardando implementação do gráfico
  it("Deve abrir a sidebar, selecionar um percurso e exibir os detalhes", () => {
    cy.visit("/");

    // Abre a sidebar 
    cy.get("header button").first().click();

    // Espera o carregamento 
    cy.wait("@getTrajetos");

    //  Verifica se a sidebar ficou visível e contém os botões de percurso
    cy.contains("PERCURSO 1").should("be.visible");
    cy.contains("PERCURSO 2").should("be.visible");
  });
});
