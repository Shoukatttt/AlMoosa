import login from '../../support/login';

describe('Login through Iqama Id', () => {
    beforeEach(() => {
        cy.visit('https://stage-patientportal.almoosahospital.com.sa/auth/user/dashboard',{timeout:60000})
    })

    it('Login with correct Iqama Id', () => {
        login.loginWithIqamaId()
    })
    it('Login with incorrect Iqama Id', () => {
        login.loginWithIncorrectIqamaId()
    })

})