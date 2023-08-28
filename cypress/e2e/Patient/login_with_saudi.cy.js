import login from '../../support/Patient_Classes/Patient_Login/patient_login';

describe('Login through Saudi Id', () => {
    beforeEach(() => {
        cy.visit('https://stage-patientportal.almoosahospital.com.sa/auth/user/dashboard', { timeout: 60000 })
    })
    it('Login with correct Saudi Id', () => {
        login.loginWithSaudiId()
        cy.wait(10000)
        cy.url().then((url) => {
            if (url.includes('terms-and-condition')) {
                cy.get('.custom-control-label').click();
                cy.contains('button', 'Continue').click();
                cy.contains('With Our Specialist Today').should('be.visible');
            }
            else {
                cy.contains('With Our Specialist Today').should('be.visible');
            }
        })

    })

    it('Login with incorrect Saudi Id', () => {
        login.loginWithIncorrectSaudiId()
    })
})