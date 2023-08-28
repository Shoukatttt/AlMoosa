import GetUsers from '../../get_users'
class Logout {

    users = new GetUsers();
    PatientLogout() {

        cy.get('.language-switcher').click()
        cy.contains('Login').click()
        cy.get('.custom-select').select('Proceed with MRN')
        this.users.getUserWithMRN().then(userData => {
            cy.get('[placeholder="Enter the ID Number"]').click()
            cy.get('[placeholder="Enter the ID Number"]').type(userData.mrn)
            cy.get('[placeholder="Enter Password"]').click()
            cy.get('[placeholder="Enter Password"]').type(userData.password)
            cy.contains('button', 'Login').click()
            cy.wait(10000)
            cy.contains('With Our Specialist Today').should('be.visible')
            cy.get('.media-body').click()
            cy.contains('Logout').click()
            cy.contains('button','Login').should('be.visible')
        })
    }
}

const logout = new Logout();
export default logout;