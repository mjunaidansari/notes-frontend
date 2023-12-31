// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', ({username, password}) => {
    cy.request('POST', 'http://localhost:3001/api/login', {
        username, password
    }).then(response => {
      localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
      cy.visit('')
      cy.log(JSON.stringify(window.localStorage.getItem('loggedNoteappUser')).token)
      cy.log(window.localStorage.getItem('loggedNoteappUser'))
    })
})

Cypress.Commands.add('createNote', ({content, important}) => {

    const authorization = `Bearer ${JSON.parse(window.localStorage.getItem('loggedNoteappUser')).token}`
    cy.log(authorization)
    cy.request({
        url: 'http://localhost:3001/api/notes',
        method: 'POST',
        body: {content, important},
        headers: {
            Authorization: authorization
        }
    })
    cy.visit('')

})