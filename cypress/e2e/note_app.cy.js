// describe('template spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })

describe('Note app', function() {

  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
  })

  it('user can login', function() {
    cy.contains('Login').click()
    cy.get('#username').type('junaid')
    cy.get('#password').type('hehe')
    cy.get('#login-button').click()

    cy.contains('Junaid Ansari logged in')
  })

  describe('when logged in', function() {

    beforeEach(function() {
      cy.contains('Login').click()
      cy.get('#username').type('junaid')
      cy.get('#password').type('hehe')
      cy.get('#login-button').click()
    })

    it('a new note can be created', function() {
      cy.contains('New Note').click()
      cy.get('#note-input').type('a note created by cypress')
      cy.contains('Save').click()
      cy.contains('a note created by cypress')
    })

  })

})
