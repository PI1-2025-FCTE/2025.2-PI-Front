describe("Fluxo completo de visualização de trajetos", () => {
  beforeEach(() => {
    // Mock da lista de trajetos
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
  });

  it("Deve abrir a sidebar, selecionar um percurso e exibir os detalhes", () => {
    // 1️⃣ Visita a home
    cy.visit("/");

    // 2️⃣ Abre a sidebar
    cy.get("header button").first().click();

    // 3️⃣ Espera os trajetos mockados carregarem
    cy.wait("@getTrajetos");

    // 4️⃣ Verifica os botões de percurso
    cy.contains("PERCURSO 1").should("be.visible");
    cy.contains("PERCURSO 2").should("be.visible");

    // 5️⃣ Clica no percurso 1
    cy.contains("PERCURSO 1").click();

    // ❌ Remove o wait da rota de detalhes (porque ainda não existe requisição)
    // cy.wait("@getTrajetoDetalhes");

    // 6️⃣ Verifica se a nova tela renderizou corretamente
    cy.contains("DETALHES DA TRAJETÓRIA").should("be.visible");

    // 7️⃣ Valida se o gráfico aparece
    cy.get("svg").should("exist"); // gráfico Recharts renderiza como SVG
  });
});
