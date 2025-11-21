describe("US3-Conectar (caso tenha uma esp disponível)", () => {
  it("Deve conectar, digitar o comando e enviar a rota", () => {
    // Acessa a home
    cy.visit("/");



    cy.contains("Selecionar").should("be.visible").click();
    cy.contains("Selecionado").should("be.visible")

    cy.contains("Selecionado")
      .parent()
      .contains("Online")
      .should("exist");


    cy.get("textarea").type("a3000");

    cy.contains("Enviar").should("be.visible").click();

    cy.contains("Comando enviado com sucesso para esp32-123").should("be.visible");
  });


  it("Conectar, enviar comando inválido", () => {
    // Acessa a home
    cy.visit("/");



    cy.contains("Selecionar").should("be.visible").click();
    cy.contains("Selecionado").should("be.visible")

    cy.contains("Selecionado")
      .parent()
      .contains("Online")
      .should("exist");


    cy.get("textarea").type("a300");

    cy.contains("Enviar").should("be.visible").click();

    cy.contains("Comando inválido! Use: 'd' (direita), 'e' (esquerda), ou 'a' seguido de 4 dígitos (ex: a1000)").should("be.visible");
  });
});
