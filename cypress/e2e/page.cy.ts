describe('Home page', () => {
  it('should visit link', () => {
    cy.visit('http://localhost:3000')
    cy.get(".text-3xl").contains("Todo App")
    cy.get("input[placeholder=\"Add a task title\"]").should("have.length", 1)
    cy.get("button").should("have.text", "Add Task")
  })
});