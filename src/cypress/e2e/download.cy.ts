describe("Fluxo completo de visualização de trajetos", () => {

    //aguardando implementação do gráfico
    it("Deve abrir a sidebar, selecionar um percurso e exibir os detalhes", () => {
      cy.visit("/");

      cy.get("header button").first().click();

      cy.contains(/^PERCURSO \d+$/).should("be.visible");

      // clica no primeiro percurso encontrado
      cy.contains(/^PERCURSO \d+$/).last().click();

      cy.contains("BAIXAR RELATÓRIO").should("be.visible").and("not.be.disabled").click()
    });

});
