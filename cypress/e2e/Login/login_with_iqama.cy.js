import login from '../../support/login';

describe('Login Test Cases', () => {
    beforeEach(() => {
        cy.visit('https://stage-patientportal.almoosahospital.com.sa/auth/user/dashboard',{timeout:60000})
    })

    it('Login with Iqama Id', () => {
        login.loginWithIqamaId('2521341558')
    })

})