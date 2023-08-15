import login from '../../support/login';

describe('Login through MRN', () => {
    beforeEach(() => {
        cy.visit('https://stage-patientportal.almoosahospital.com.sa/auth/user/dashboard', { timeout: 60000 })
    })
    it('Login with correct MRN and correct Password', () => {
        login.LoginWithMRN()

    })
    it('Login with Incorrect MRN and correct Password', () =>{
        login.LoginWithIncorrectMRN()
    })
    it('Login with correct MRN and incorrect Password', () =>{
        login.LoginWithIncorrectPassword()
    })
    it('Login with Incorrect MRN and Incorrect Password', () => {
        login.LoginWithIncorrectPasswordAndMRN()
    })
})