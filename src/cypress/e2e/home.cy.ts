describe("Conexão e envio de rota", () => {
  it("Deve conectar, digitar o comando e enviar a rota", () => {
    // Intercepta a requisição para verificar o envio do comando
    cy.intercept("POST", "http://localhost:8000/trajetos").as("postTrajeto");

    // 1️⃣ Acessa a home
    cy.visit("/");

    // 2️⃣ Clica no botão 'CONECTAR'
    cy.contains("CONECTAR").should("be.visible").click();

    // 3️⃣ Verifica se o status de conexão ficou verde
    cy.contains("CONEXÃO")
      .parent()
      .find(".bg-green-500")
      .should("exist");

    // 4️⃣ Verifica se a disponibilidade também ficou verde
    cy.contains("DISPONIBILIDADE")
      .parent()
      .find(".bg-green-500")
      .should("exist");

    // 5️⃣ Digita o comando no textarea
    cy.get("textarea").type("a300");

    // 6️⃣ Clica no botão "Enviar"
    cy.contains("Enviar").should("be.visible").click();

    // 7️⃣ Aguarda a requisição e verifica se o corpo está correto
    cy.wait("@postTrajeto").its("request.body").should((body) => {
      expect(body).to.have.property("comandosEnviados", "a300");
    });
  });
});
