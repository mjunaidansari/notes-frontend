// describe('template spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })

describe('Note app', function() {

  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Notes')
  })

  it('front page contains random test', function() {
    cy.visit('http://localhost:3000')
    cy.contains('hehe not there')
  })

})