describe("Fluxo completo de visualização de trajetos", () => {
  beforeEach(() => {
    // Intercepta e simula a resposta da lista de trajetos
    cy.intercept("GET", "http://localhost:8000/trajetos/", {
      statusCode: 200,
      body: [
        {
          idTrajeto: 1,
          comandosEnviados: "andar para frente",
          comandosExecutados: "andar para frente",
          status: "concluído",
          tempo: "00:01:20",
        },
        {
          idTrajeto: 2,
          comandosEnviados: "virar à direita",
          comandosExecutados: "virar à direita",
          status: "concluído",
          tempo: "00:02:05",
        },
      ],
    }).as("getTrajetos");

    // Intercepta e simula a resposta de um trajeto específico
    cy.intercept("GET", "http://localhost:8000/trajetos/1", {
      statusCode: 200,
      body: {
        idTrajeto: 1,
        comandosEnviados: "andar para frente",
        comandosExecutados: "andar para frente",
        status: "concluído",
        tempo: "00:01:20",
      },
    }).as("getTrajetoDetalhes");
  });

    //aguardando implementação do gráfico
  it.skip("Deve abrir a sidebar, selecionar um percurso e exibir os detalhes", () => {
    cy.visit("/");

    // Abre a sidebar 
    cy.get("header button").first().click();

    // Espera o carregamento 
    cy.wait("@getTrajetos");

    //  Verifica se a sidebar ficou visível e contém os botões de percurso
    cy.contains("PERCURSO 1").should("be.visible");
    cy.contains("PERCURSO 2").should("be.visible");

    // Clica no primeiro percurso
    cy.contains("PERCURSO 1").click();

    cy.wait("@getTrajetoDetalhes");

    cy.contains("DETALHES DA TRAJETÓRIA").should("be.visible");
    cy.contains("GRÁFICO DE DESEMPENHO").should("be.visible");

    // 8️⃣ Valida se o trajeto mostrado tem os dados esperados
    cy.contains("andar para frente").should("exist");
    cy.contains("concluído").should("exist");
    cy.contains("00:01:20").should("exist");
  });
});
