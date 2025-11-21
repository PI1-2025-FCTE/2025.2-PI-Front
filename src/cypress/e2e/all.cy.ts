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
    cy.contains("Virar à direita").click();

    cy.contains("Enviar").click();

    cy.wait("@postTrajeto");

    cy.contains("Trajeto criado com sucesso").should("be.visible");
    cy.contains("Ver trajeto").should("have.attr", "href", "/route/123");
  });

    it("Deve mostrar erro ao tentar enviar comando inválido", () => {
    cy.contains("Avançar").click();

    // Atualiza o valor para algo inválido, ex: a003 → 3 dígitos
    cy.get("input[type=number]").clear().type("abc");

    cy.contains("Enviar").click();

    cy.contains("Comando inválido").should("be.visible");
  });

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
