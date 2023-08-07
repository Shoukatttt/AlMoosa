import login from '../../support/index';

describe('Login Test Cases', () => {
    beforeEach(() => {
        cy.visit('https://stage-patientportal.almoosahospital.com.sa/auth/user/dashboard',{timeout:60000})
    })
    it('Login with Saudi Id', () => {
        login.loginWithSaudiId('1017191865')
    })
})