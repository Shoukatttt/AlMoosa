class Login {
    loginWithMRN(mrn,password){
        cy.visit('/auth/user/dashboard',{timeout:60000})
        cy.get('.language-switcher').click()
        cy.contains('Login').click();
        // cy.get('#__BVID__22').click()
        // cy.contains('Proceed with MRN').click()
        cy.get('#__BVID__22').select('Proceed with MRN')
        cy.get('[placeholder="Enter the ID Number"]').click()
        cy.get('[placeholder="Enter the ID Number"]').type(mrn)
        cy.get('[placeholder="Enter Password"]').click()
        cy.get('[placeholder="Enter Password"]').type(password)
        cy.contains('button','Login').click()
        cy.url().should('eq','https://patientportal.almoosahospital.com.sa/dashboard')
    }
}

const login = new Login();
export default login;