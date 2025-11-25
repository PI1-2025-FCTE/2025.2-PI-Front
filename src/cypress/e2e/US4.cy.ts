describe("US4 - Montar comandos pelo painel", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("Selecionar").click(); // conectar
    cy.contains("Selecionado").should("be.visible");
  });

  it("montar os blocos", () => {
    cy.contains("Avançar").click();
    cy.contains("Virar à direita").click();
    cy.contains("Virar à esquerda").click();

    // Blocos aparecem dentro do painel
    cy.contains("Avançar").should("exist");
    cy.contains("Virar à direita").should("exist");
    cy.contains("Virar à esquerda").should("exist");

    // O bloco avançar deve vir com valor padrão 100 → 'a0100'
    cy.get("input[type=number]").should("have.value", "100");
  });
});
