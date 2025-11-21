describe("Fluxo completo de visualização de trajetos", () => {

    //aguardando implementação do gráfico
  it("Deve abrir a sidebar, selecionar um percurso e exibir os detalhes", () => {
    cy.visit("/");

    // Abre a sidebar 
    cy.get("header button").first().click();

    //  Verifica se a sidebar ficou visível e contém os botões de percurso
    cy.contains("PERCURSO 1").should("be.visible");
    cy.contains("PERCURSO 2").should("be.visible");

    // Clica no primeiro percurso
    cy.contains("PERCURSO 1").click();


    cy.contains("DETALHES DA TRAJETÓRIA").should("be.visible");
    cy.contains("MAPA DO TRAJETO").should("be.visible");

  });
});
