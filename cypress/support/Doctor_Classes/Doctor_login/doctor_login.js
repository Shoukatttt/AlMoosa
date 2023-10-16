import GetUsers from '../../get_users'
let toast_message
class Login {

    users = new GetUsers()
    doctorLogin() {

        cy.get('.language-switcher').click()
        cy.contains('button', 'Continue as a Doctor').click()
        this.users.getDoctor().then(userData => {
            cy.xpath('//input[@placeholder="Enter ID"]').type(userData.id)
            cy.xpath('//input[@placeholder="Enter Password"]').type(userData.password)
            cy.get('.custom-control-label').click()
            cy.contains('button', 'Login').click()
            cy.wait(5000)

        })
    }

    doctorloginFailed() {
        cy.get('.language-switcher').click()
        cy.contains('button', 'Continue as a Doctor').click()
            .then(() => {
                cy.xpath('//input[@placeholder="Enter ID"]').type('903')
                cy.xpath('//input[@placeholder="Enter Password"]').type('abc')
                cy.contains('button', 'Login').click()
                cy.wait(10000)
                cy.get('.toasted-container.top-right')
                    .invoke('text')
                    .then((text) => {
                        cy.contains('Remember Me').should('be.visible')
                        expect(text).to.eq('Invalid UserName or Password')
                    })
                cy.xpath('//input[@placeholder="Enter ID"]').clear()
                cy.wait(5000)
                cy.contains('button', 'Login').click()
                cy.get('.toasted-container.top-right')
                    .invoke('text')
                    .then((text) => {
                        cy.contains('Remember Me').should('be.visible')
                        expect(text).to.eq('Physician ID is required')
                    })
                cy.xpath('//input[@placeholder="Enter ID"]').type('903')
                cy.xpath('//input[@placeholder="Enter Password"]').clear()
                cy.wait(5000)
                cy.contains('button', 'Login').click()
                cy.get('.toasted-container.top-right')
                    .invoke('text')
                    .then((text) => {
                        cy.contains('Remember Me').should('be.visible')
                        expect(text).to.eq('Password is required')
                    })

                cy.xpath('//input[@placeholder="Enter ID"]').clear()
                cy.xpath('//input[@placeholder="Enter Password"]').clear()
                cy.wait(5000)
                cy.contains('button', 'Login').click()
                cy.get('.toasted-container.top-right')
                    .invoke('text')
                    .then((text) => {
                        cy.contains('Remember Me').should('be.visible')
                        expect(text).to.eq('Physician ID is required')
                    })

            })

    }


}

const login = new Login();
export default login;