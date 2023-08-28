import GetUsers from '../../get_users'
class Logout {

    users = new GetUsers();
    doctorLogout() {

        cy.get('.language-switcher').click()
        cy.contains('button', 'Continue as a Doctor').click()
        this.users.getDoctor().then(userData => {
            cy.xpath('//input[@placeholder="Enter ID"]').type(userData.id)
            cy.xpath('//input[@placeholder="Enter Password"]').type(userData.password)
            cy.get('.custom-control-label').click()
            cy.contains('button', 'Login').click()
            cy.wait(5000)
            cy.contains('Critical Results').should('be.visible')
            cy.get('.media-body').click()
            cy.contains('Logout').click()
            cy.contains('button','Login').should('be.visible')
        })
    }
}

const logout = new Logout();
export default logout;