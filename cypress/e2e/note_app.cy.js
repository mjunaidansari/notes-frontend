// describe('template spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })

describe('Note app', function() {

  beforeEach(function() {

    // to reset the testing db
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    
    const user = {
      name: 'Junaid Ansari',
      username: 'junaid',
      password: 'hehe'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)

    cy.visit('')
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

  it('login fails with wrong password', function() {
    cy.contains('Login').click()
    cy.get('#username').type('junaid')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    // cy.get('.error').contains('Wrong Credentials')
    cy.get('.error')
      .should('contain', 'Wrong Credentials')
      .should('have.css', 'color', 'rgb(255, 0, 0)')
      .should('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Junaid Ansari logged in')
  })

  describe('when logged in', function() {

    beforeEach(function() {
      cy.login({username: 'junaid', password: 'hehe'})
    })

    it('a new note can be created', function() {
      cy.contains('New Note').click()
      cy.get('#note-input').type('a note created by cypress')
      cy.contains('Save').click()
      cy.contains('a note created by cypress')
    })

    describe('and a note exists', function() {

      beforeEach(function() {
        // cy.createNote({
        //   content: 'another note cypress',
        //   important: true
        // })
        cy.contains('New Note').click()
        cy.get('#note-input').type('another note cypress')
        cy.contains('Save').click()
      })

      it('it can be made not important', function() {
        cy.contains('another note cypress')
          .contains('make not important')
          .click()
        cy.contains('another note cypress')
          .contains('make important')
      })

    })

  })

})
