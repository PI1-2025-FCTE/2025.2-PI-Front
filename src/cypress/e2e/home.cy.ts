describe("Conexão e envio de rota", () => {
  it("Deve conectar, digitar o comando e enviar a rota", () => {
    // Intercepta a requisição para verificar o envio do comando
    cy.intercept("POST", "http://localhost:8000/trajetos").as("postTrajeto");

    // 1️⃣ Acessa a home
    cy.visit("/");

  
    cy.contains("CONECTAR").should("be.visible").click();


    cy.contains("CONEXÃO")
      .parent()
      .find(".bg-green-500")
      .should("exist");


    cy.contains("DISPONIBILIDADE")
      .parent()
      .find(".bg-green-500")
      .should("exist");

    cy.get("textarea").type("a300");


    cy.contains("Enviar").should("be.visible").click();

    cy.wait("@postTrajeto").its("request.body").should((body) => {
      expect(body).to.have.property("comandosEnviados", "a300");
    });
  });
});
