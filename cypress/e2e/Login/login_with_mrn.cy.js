import login from '../../support/login';

describe('Login Test Cases', () => {
    beforeEach(() => {
        cy.visit('https://stage-patientportal.almoosahospital.com.sa/auth/user/dashboard', { timeout: 60000 })
    })
    it('Login with MRN', () => {
        login.LoginWithMRN()

    })
    it('Login with Incorrect MRN', () =>{
        login.LoginWithIncorrectMRN()
    })
    it('Login with Incorrect Password', () =>{
        login.LoginWithIncorrectPassword()
    })
    it('Login with Incorrect MRN and Incorrect Password', () => {
        login.LoginWithIncorrectPasswordAndMRN()
    })
})