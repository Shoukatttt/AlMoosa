class Login {
    loginWithMRN(mrn,password){
        cy.get('.language-switcher').click()
        cy.contains('Login').click()
        cy.get('.custom-select').select('Proceed with MRN')
        cy.get('[placeholder="Enter the ID Number"]').click()
        cy.get('[placeholder="Enter the ID Number"]').type(mrn)
        cy.get('[placeholder="Enter Password"]').click()
        cy.get('[placeholder="Enter Password"]').type(password)
        cy.contains('button','Login').click()
        cy.url().should('eq','https://stage-patientportal.almoosahospital.com.sa/dashboard')
    }

    loginWithSaudiId(id) {
        cy.get('.language-switcher').click()
        cy.contains('Login').click()
        cy.get('[placeholder="Enter the ID Number"]').click()
        cy.get('[placeholder="Enter the ID Number"]').type(id)
        cy.contains('button','Login').click()
        cy.contains('Enter Verification Code').should('be.visible')
        cy.contains('button','Verify').click()


    }

    loginWithIqamaId(id) {
        cy.get('.language-switcher').click()
        cy.contains('Login').click()
        cy.get('.custom-select').select('Proceed with Iqama ID')
        cy.get('[placeholder="Enter the ID Number"]').click()
        cy.get('[placeholder="Enter the ID Number"]').type(id)
        cy.contains('button','Login').click()
        cy.contains('Enter Verification Code').should('be.visible')
        cy.contains('button','Verify').click()


    }

}

const login = new Login();
export default login;